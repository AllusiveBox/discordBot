/**

    cxBot.js Mr. Prog Kick Scripts
    Version: 4
    Author: AllusiveBox
    Date Created: 08/08/18
    Date Last Updated: 10/07/18
    Last Update By: AllusiveBox

**/

const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const roles = require(`../files/roles.json`);
const betterSql = require(`../classes/betterSql.js`);
const channels = require(`../files/channels.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {Discord.GuildMember} member
 * @param {string} reason
 * @param {betterSql} sql
 */
module.exports.run = async (bot, message, member, reason, sql) => {
    // Debug to Console
    debug(`I am inside the kick function.`);

    let logchannelColor = config.logChannelColors.memberKick;

    // Load in the Log Channel ID
    let logID = channels.log;
    // Check if there was an ID Provided
    if (!logID) { // If no Log ID...
        debug(`Unable to find the log ID in channels.json.`
            + `Looking for another log channel.`);

        // Look for Log Channel in Server
        logChannel = message.member.guild.channels.find(val => val.name === "log");
        if (!logChannel) { // If Unable to Find Log Channel...
            debug(`Unable to find any kind of log channel.`);
        } else {
            logID = logChannel.id;
        }
    }

    // Get Avatar
    let avatar = member.user.avatarURL;

    // Build the Embed
    let kickedEmbed = new Discord.RichEmbed()
        .setDescription(`Member Kicked!`)
        .setColor(logchannelColor)
        .setThumbnail(avatar)
        .addField("Member Name", member.user.username)
        .addField("Member ID", member.user.id)
        .addField("Kicked On", new Date())
        .addField("Reason", reason);

    // Check if there is an ID Now
    if (!logID) { // If no Log ID...
        bot.users.get(userids.ownerID).send(kickedEmbed);
    } else {
        bot.channels.get(logID).send(kickedEmbed);
    }

    debug(`Kicking ${member.user.username} from ${message.member.guild.name} `
        + `for ${reason}.`);
    member.kick(reason).catch(error => {
        errorLog(error);
        return message.channel.send(`Sorry, ${message.author}, I could not kick `
            + `${member.user.username} because of ${error}.`);
    });
    return debug(`Kick Successful.`);
}

