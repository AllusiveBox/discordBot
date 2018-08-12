/**

    cxBot.js Mr. Prog Ban Scripts
    Version: 3
    Author: AllusiveBox
    Date Started: 02/28/18
    Date Last Updated: 08/11/18

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const channels = require(`../files/channels.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const deleteMemberInfo = require(`../functions/deleteMemberInfo.js`);

module.exports.run = async (bot, message, member, reason, sql) => {
  // Debug to Console
  debug.log(`I am inside the ban function.`);

  let logchannelColor = config.logChannelColors.memberBan;

  // Load in the Log Channel ID
  let logID = channels.log;
  // Check if there was an ID Provided
  if (!logID) { // If no Log ID...
    debug.log(`Unable to find the log ID in channels.json.`
    + `Looking for another log channel.`);
    // Look for Log Channel in the Server
    logID = member.guild.channels.find(`name`, `log`).id;
  }

  // Get Avatar
  let avatar = member.user.avatarURL;

  // Build the Embed
  let bannedEmbed = new Discord.RichEmbed()
  .setDescription(`Member Banned!`)
  .setColor(logchannelColor)
  .setThumbnail(avatar)
  .addField("Member Name", member.user.username)
  .addField("Member ID", member.user.id)
  .addField("Banned On", new Date());

  // Check if there is an ID Now
  if (!logID) { // If no Log ID...
    bot.users.get(userids.ownerID).send(bannedEmbed);
  } else {
    bot.channels.get(logID).send(bannedEmbed);
  }

  debug.log(`Banning ${member.user.username} from ${message.member.guild.name} `
    + `for ${reason}.`);
  member.ban(reason).catch(error => {
    errorLog.log(error);
    return message.channel.send(`Sorry, ${message.author}, I could not ban `
      + `${member.user.username} because of ${error}.`);
  });
  return debug.log(`Ban Successful.`);
}
