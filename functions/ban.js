/**

    cxBot.js Mr. Prog Ban Scripts
    Version: 3
    Author: AllusiveBox
    Date Started: 02/28/18
    Date Last Updated: 10/20/18
    Last Update By: AllusiveBox

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const channels = require(`../files/channels.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {Discord.GuildMember} member
 * @param {string} reason
 */
module.exports.run = async (bot, message, member, reason) => {
    // Debug to Console
    debug(`I am inside the ban function.`);

    let logchannelColor = config.logChannelColors.memberBan;

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

    debug(`Banning ${member.user.username} from ${message.member.guild.name} `
        + `for ${reason}.`);
    try {
        await member.ban(reason);
    } catch (error) {
        errorLog(error);
        await message.react(config.fail);
        return message.channel.send(`Sorry, ${message.author}, I could not ban `
            + `${member.user.username} because of ${error}.`);
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
        .addField("Banned On", new Date())
        .addField("Reason", reason);

    // Check if there is an ID Now
    if (!logID) { // If no Log ID...
        bot.users.get(userids.ownerID).send(bannedEmbed);
    } else {
        bot.channels.get(logID).send(bannedEmbed);
    }

    await message.react(config.success);

    return debug(`Ban Successful.`);
}
