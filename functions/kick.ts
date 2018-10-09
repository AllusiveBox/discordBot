/**

    cxBot.js Mr. Prog Kick Scripts
    Version: 4
    Author: AllusiveBox
    Date Created: 08/08/18
    Date Last Updated: 10/09/18
    Last Update By: Th3_M4j0r

**/

import * as Discord from 'discord.js';
const config = require(`../files/config.json`);
const channels = require('../files/channels.json');
const userids = require('../files/userids.json');
import betterSql from '../classes/betterSql.js';
import { debug, error as errorLog } from './log.js';

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {Discord.GuildMember} member
 * @param {string} reason
 * @param {betterSql} sql
 */
export async function run(bot: Discord.Client, message: Discord.Message, member: Discord.GuildMember, reason: string, sql: betterSql) {
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
        let logChannel = message.member.guild.channels.find(val => val.name === "log");
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
        .addField("Kicked On", new Date());

    // Check if there is an ID Now
    if (!logID) { // If no Log ID...
        bot.users.get(userids.ownerID).send(kickedEmbed);
    } else {
        let Channel = <Discord.TextChannel>bot.channels.get(logID);
        Channel.send(kickedEmbed);
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

