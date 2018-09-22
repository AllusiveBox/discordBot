/**

    cxBot.js Mr. Prog Member Leaving Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 08/09/18
    Date Last Updated: 08/30/18
    Last Update By: Th3_M4j0r

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const channels = require(`../files/channels.json`);
const config = require(`../files/config.json`);
const userids = require(`../files/userids.json`);
const deleteMemberInfo = require(`../functions/deleteMemberInfo.js`);
const log = require(`../functions/log.js`);


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Member} member
 * @param {sqlite} sql
 */
module.exports.run = async (bot, member, sql) => {
    // Debug to Console
    log.debug(`I am inside the memberLeave Function.`);

    // Get Log Channel Color
    let logchannelColor = config.logChannelColors.memberLeave;

    // Load in the Log Channel ID
    let logID = channels.log;

    // Check if there was an ID Provided
    if (!logID) { // If no Log ID...
        log.debug(`Unable to find the log ID in channels.json.`
            + `Looking for another log channel.`);
        // Look for Log Channel in the Server
        logChannel = member.guild.channels.find(val => val.name === 'log'); //changed to function, since other way is deprecated
        if (!logChannel) {
            log.debug(`Unable to find any kind of log channel.`);
        } else {
            logID = logChannel.id;
        }
    }

    // Get the Member's Avatar
    let avatar = member.user.avatarURL;

    // Build the Embed
    let leaveEmbed = new Discord.RichEmbed()
        .setDescription(`Member Left`)
        .setColor(logchannelColor)
        .setThumbnail(avatar)
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

    deleteMemberInfo.run(bot, member, sql);
}
