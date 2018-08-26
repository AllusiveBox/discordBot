/**

    cxBot.js Mr. Prog Score Script
    Version: 3
    Author: AllusiveBox
    Date Started: 08/11/18
    Date Last Updated: 08/11/18

**/

// Load in required Libraries and Files
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const changeRole = require(`../functions/changeRole.js`);

// Score Throttling
const talkedRecently = new Set();

module.exports.run = (bot, message, sql) => {
  // Debug to Console
  debug.log(`I am inside the Score System`);

  if (!enabled.score) return debug.log(`Score System Disabled.`);

  if (talkedRecently.has(message.author.id)) return debug.log(`Throttled `
    + `${message.author.username}.`);

  talkedRecently.add(message.author.id)
  setTimeout(() => {
    // Remove User from Set after 30 Seconds
    talkedRecently.delete(message.author.id);
  }, 30000);

  // Begin Score System
  sql.get(`SELECT * FROM userinfo WHERE userId = "${message.author.id}"`)
    .then(row => {
      if (!row) { // If Row Not Found...
        debug.log(`Row was not found for ${message.author.username}. `
          + `Generating data now...`);
        sql.run("INSERT INTO userinfo (userID, userName, battlecode, favechip, "
          + "navi, clearance, points, level, optOut) VALUES (?, ?, ?, ?, ?, ?, "
          + "?, ?, ?)", [message.author.id, message.author.username,
          "0000-0000-0000", null, "megaman", "none", 0, 0, 0])
          .catch(error => {
            errorLog.log(error);
          });
      } else { // If Row Was Found...
        if (row.optOut === 1) {
          return debug.log(`User does not want data collected.`);
        }

        debug.log(`Row found for ${message.author.username}.`);
        let name = message.author.username;
        try {
          name = message.guild.members.get(message.author.id).nickname;
          if (!name) name = message.author.username;
          debug.log(`Name set to: ${name}`);
        }
        catch(error) {
          name = message.author.username;
          debug.log(`Unable to get Nickname. Name set to: ${name}`);
        }

        // Increase Points by 1
        let curLevel = Math.floor(0.142 * Math.sqrt(row.points + 1));
        debug.log(`Checking if Leveled Up.`);
        if (curLevel > row.level) { // If Current Level > Actual Level...
          row.level = curLevel;
          debug.log(`${message.author.username} has leveled up. Generating `
            + `level up message.`);
          message.channel.send(`Congratulations, ${name}, you've just reached `
            + `level **${curLevel}**!`);
          // TODO When finished, Enable changeRole call here
          changeRole.run(bot, message, curLevel);
        }

        debug.log(`Updating userinfo file.`);
        sql.run(`UPDATE userinfo SET points = ${row.points+1}, level = `
          + `${row.level}, userName = "${name}" WHERE userId = `
          + `"${message.author.id}"`);
      }
    }).catch((error) => {
      sql.run("CREATE TABLE IF NOT EXISTS userinfo (userId TEXT NOT NULL, "
        + "userName TEXT, battlecode TEXT, favechip TEXT, navi TEXT, "
        + "clearance TEXT, points INTEGER, level INTEGER, optOut INTEGER, "
        + "PRIMARY KEY (userId))").then(() => {
          message.channel.send(`ERROR CAUSED BY: ${message.author}.`);
          return errorLog.log(error);
        });
    });
}
