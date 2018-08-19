/*
    Command Name: deleteme.js
    Function: Deletes a User's Data from the SQL database
    Clearance: none
  	Default Enabled: Cannot be Disabled
    Date Created: 05/22/18
    Last Updated: 06/02/18
*/

// Load in Required Files
const config = require(`../files/config.json`);
const userids = require(`../files/userids.json`);
const dmCheck = require(`../functions/dmCheck.js`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const deleteMemberInfo = require(`../functions/deleteMemberInfo`);

// Command Variables
const commandUsed = new Set();

// Misc Variables
const name = "Delete Me";

module.exports.run = async (bot, message, args, sql) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // DM Check
  if (await dmCheck.run(message, name)) return; // Return on DM channel)

  //SQL Stuff
  sql.get(`SELECT * FROM userinfo WHERE userId = "${message.author.id}"`)
  .then(row => {
    if (!row) { // If Row Not Found...
      debug.log(`Unable to locate any data for ${message.author.username}.`);
      let reply = (`I am unable to locate any data on you.\n`
        + `Please either try again, or alert <@${userids.ownerID}>.`);
      return message.author.send(reply)
        .catch(error => {
          disabledDMs.run(message, reply)
        });
    } else { // If Row Found...
      if (!commandUsed.has(message.author.id)) { // If User Hasn't Used Command
        let reply = (`**__WARNING!!!__**\n\n`
          + `Using the ${config.prefix}deleteMe command deletes ***all*** of `
          + `your non-public data stored in the user information database.\n\n`
          + `**__This action cannot be undone.__**\n\n`
          + `If you are sure you want to delete this data, use this command `
          + `again.`);
        message.author.send(reply).catch(error => {
          disabledDMs.run(message, reply);
        });
        commandUsed.add(message.author.id);
        setTimeout(() => {
          // Remove User form the set after 60000 Seconds (1 Minute)
          commandUsed.delete(message.author.id);
        }, 60000);
        return;
      }

      if (row.optOut === 1) { // If User Opted Out...
        debug.log(`${message.author.username} does not wish for data to be `
          + `collected on them. Preserving this preference.`);
          sql.run(`UPDATE userinfo SET userName = null, battlecode = null, `
            + `favechip = null, navi = null, clearance = null, points = null, `
            + `level = null WHERE userId = "${message.author.id}"`);
          let reply = (`Data on you has been deleted, ${message.author}. Your `
            + `preference to have your data collection prevented has been `
            + `preserved, however.`);
          return message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
          });
      } else {
        deleteMemberInfo.run(bot, message.member, sql);
        let reply = (`Data on you has been deleted, ${message.author}.`);
        return message.author.send(reply).catch(error => {
          return disabledDMs.run(message, reply);
        });
      }
    }
  });
}

module.exports.help = {
  name        : "deleteme",
  description : ("Deletes user's data from the user database")
}
