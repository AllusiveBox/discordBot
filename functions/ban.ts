/**

    cxBot.js Mr. Prog Ban Scripts
    Version: 3
    Author: AllusiveBox
    Date Started: 02/28/18
    Date Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

**/

// Load in Required Libraries and Files
import * as Discord from 'discord.js';
import { debug, error as errorLog } from './log.js';


import config = require('../files/config.json');
import userids = require('../files/userids.json');
import channels = require('../files/channels.json');


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {Discord.GuildMember} member
 * @param {string} reason
 */
export async function run(bot: Discord.Client, message: Discord.Message, member: Discord.GuildMember, reason: string) {
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
        let logChannel = message.member.guild.channels.find(val => val.name === "log");
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
        let Channel = <Discord.TextChannel>bot.channels.get(logID);
        Channel.send(bannedEmbed);
    }

    return debug(`Ban Successful.`);
}
