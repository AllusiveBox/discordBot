/*
    Command Name: disable.js
    Function: To disable a command
    Clearance: Admin+
	  Default Enabled: Cannot be Disabled
    Date Created: 10/17/17
    Last Updated: 08/24/18
*/

// Load in Require Files
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const errorLog = require(`../functions/errorLog.js`);

// Command Variables
const invalidPermission = config.invalidPermission;

// Misc. Variables
const name = "Enable";

module.exports.run = async (bot, message, args, sql) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // SQL Stuff
  sql.get(`SELECT * FROM userinfo WHERE userID = "${message.author.id}"`).then(
    row => {
      if (!row) { // If Row Not Found...
        return debug.log(`${message.author.username} does not exist in the `
          + `database.`);
      } else { // If Row Was Found...
        if (row.clearance !== "admin") { // Admin Check
          debug.log(`${message.author.username} does not have the correct `
            + `permissions to use this command.`);
          return message.channel.send(invalidPermission).catch(error => {
            disabledDMs.run(message, invalidPermission);
          });
        } else {
          // Begin Enabling Command Switch
          var toEnable = args[0].toLowerCase();
          if (!toEnable) { // If No Arguments Passed...
            return debug.log(`No arguments passed.`);
          } else {
            let isDefined = eval("enabled." + toEnable);
            if (isDefined === undefined) { // IF Variable Does Not Exist...
              return debug.log(`${toEnable} either does not exist, or cannot `
                + `be disabled.`);
            } else {
              debug.log(`Setting ${toEnable} to false.`);
              return eval("enabled." + toEnable + "= true");
            }
          }
        }
      }
    }
  )
}

module.exports.help = {
  name        : "enable",
  description : ("Enables a command.")
}
