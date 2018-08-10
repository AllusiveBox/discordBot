/**

    cxBot.js Mr. Prog Member Leaving Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 08/09/18
    Date Last Updated: 08/09/18

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const userID = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const channels = require(`../files/channels.json`);

module.exports.run = async (bot, member) => {
  // Debug to Console
  debug.log(`I am inside the memberLeave Function.`);
  let logchannelColor = config.logChannelColors.memberLeave;
  // Load in the Log Channel ID
  let logID = channels.log;
  // Check if there was an ID Provided
  if (!logID) { // If no Log ID...
    debug.log(`Unable to find the log ID in channels.json.`
    + `Looking for another log channel.`);
    // Look for Log Channel in the Server
    logID = member.guild.channels.find(`name`, `log`).id;
  }

  // Build the Embed
  let leaveEmbed = new Discord.RichEmbed()
  .setDescription(`Member Left`)
  .setColor(logchannelColor)
  .addField("Member Name", member.user.username)
  .addField("Member ID", member.user.id)
  .addField("Joined On", member.joinedAt)
  .addField("Account Created", member.user.createdAt)
  .addField("Left On", new Date());

  // Check if there is an ID Now
  if (!logID) { // If no Log ID...
    bot.users.get(userids.ownerID).send(leaveEmbed);
  } else {
    bot.channels.get(logID).send(leaveEmbed);
  }

  // TODO: When adding SQL Database Systems, Delete User Data on Leaving Server
  // deleteMemberInfo(bot, member, sql);
}
