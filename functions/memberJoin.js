/**

    cxBot.js Mr. Prog Member Joining Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 08/08/18

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

module.exports.run (bot, member) => {
  // Debug to Console
  debug.log(`I am inside the memberJoin function`);
  let foundLogchannel = true;
  let logChannel = member.guild.channels.find(`name`, `log`).catch(error => {
    errorLog.log(error);
    foundLogchannel = false;
  });
}
