/**

    cxBot.js Mr. Prog Member Joining Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 10/07/18
    Last Update By: Th3_M4j0r

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const channels = require(`../files/channels.json`);
const config = require(`../files/config.json`);
const userids = require(`../files/userids.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: welcomeMessage } = require(`../functions/welcomeMessage.js`);


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Member} member
 */
module.exports.run = async (bot, member) => {
    // Debug to Console
    debug(`I am inside the memberLeave Function.`);

    // Get Log Channel Color
    let logchannelColor = config.logChannelColors.memberJoin;

    // Load in the Log Channel ID
    let logID = channels.log;

    // Check if there was an ID Provided
    if (!logID) { // If no Log ID...
        debug(`Unable to find the log ID in channels.json.`
            + `Looking for another log channel.`);
        // Look for Log Channel in the Server
        logChannel = member.guild.channels.find(val => val.name === 'log'); //changed to function, since other way is deprecated
        if (!logChannel) {
            debug(`Unable to find any kind of log channel.`);
        } else {
            logID = logChannel.id;
        }
    }

    // Generate the Welcome Message
    let message = welcomeMessage(member);
    // Boolean to Find out if Message Was Sent Successfully or not
    var sentDM = true;
    await member.send(message).catch(error => {
        errorLog(error);
        sentDM = false;
        debug(`Unable to DM user, setting sentDM to ${sentDM}.`);
    });

    // Get the Member's Avatar
    let avatar = member.user.avatarURL;

    // Build the Embed
    let joinEmbed = new Discord.RichEmbed()
        .setDescription(`Member Joined!`)
        .setColor(logchannelColor)
        .setThumbnail(avatar)
        .addField("Member Name", member.user.username)
        .addField("Member ID", member.user.id)
        .addField("Joined On", member.joinedAt)
        .addField("Account Created", member.user.createdAt)
        .addField("DM Successfully Sent", sentDM);

    // Check if there is an ID Now
    if (!logID) { // If no Log ID...
        bot.users.get(userids.ownerID).send(joinEmbed);
    } else {
        bot.channels.get(logID).send(joinEmbed);
    }
}
