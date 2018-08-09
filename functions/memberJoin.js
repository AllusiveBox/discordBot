/**

    cxBot.js Mr. Prog Member Joining Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 08/08/18

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const welcomeMessage = require(`../functions/welcomeMessage`);
const channels = require(`../files/channels.json`);

module.exports.run = async (bot, member) => {
  // Debug to Console
  debug.log(`I am inside the memberJoin function`);
  let logchannelColor = config.logChannelColors.memberJoin;
  // Load in the Log Channel ID
  let logID = channels.log;
  // Check if there was an ID Provided
  if (!logID) { // If no Log ID...
    debug.log(`Unable to find the log ID in channels.json.`
    + `Looking for another log channel.`);
    // Look for Log Channel in the Server
    logID = member.guild.channels.find(`name`, `log`).id;
  }
  // Generate the Welcome Message
  let message = welcomeMessage.run(member);
  // Boolean to Find out if Message Was Sent Successfully or not
  let sentDM = true;
  member.send(message).catch(error => {
    errorLog.log(error);
    sentDM = false;
  });
  // Build the Embed
  let joinEmbed = new Discord.RichEmbed()
  .setDescription(`Member Joined!`)
  .setColor(logchannelColor)
  .addField("Member Name", member.user.username)
  .addField("Member ID", member.user.id)
  .addField("Joined On", member.joinedAt)
  .addField("Account Created", member.user.createdAt)
  .addField("DM Successfully Sent", sentDM);
  // Check if there is an ID Now
  if (!logID) { // If no Log ID...
    bot.users.get(config.ownerID).send(joinEmbed);
  } else {
    bot.channels.get(logID).send(joinEmbed);
  }
}
