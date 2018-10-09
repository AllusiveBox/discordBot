/** 

    cxBot.js Mr. Prog Purge Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 10/07/18
    Date Last Updated: 10/09/18
    Last Updated By: Th3_M4j0r
**/

import * as Discord from 'discord.js';
import { createWriteStream } from 'fs';
const config = require('../files/config.json');
const channels = require('../files/channels.json');
const userids = require('../files/userids.json');
import { debug, error as errorLog } from './log.js';

/**
 * 
 * @param {Discord.Collection<Discord.Snowflake,Discord.Message>} messages
 */
function recordMessages(messages: Discord.Collection<Discord.Snowflake,Discord.Message>) {
    let stream = createWriteStream("purgedMessages.txt");

    messages.forEach(function (message) {
        // Build the Message Content
        //@ts-ignore
        let content = `{\tMessage Posted in: ${message.channel.name}\n`;
        content = `${content}\tMessage Author: ${message.author.username}\n`;
        content = `${content}\tMessage Author ID: ${message.author.id}\n`;
        content = `${content}\tMessage Content: ${message.content}\n`;
        content = `${content}\tMessage ID: ${message.id}\n`;
        if (message.attachments) { // If Attachments
            message.attachments.forEach(function (attachment) {
                content = `${content}\tAttachment: ${attachment}\n`
            });
        }
        content = `${content}\tMessage Sent: ${new Date(message.createdTimestamp)}\n`;
        content = `${content}},\n`;
        stream.write(content.substring(0, content.length));
    });
    stream.end();
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {number} amount
 * @param {?Discord.GuildMember} [user=null]
 */

export async function run(bot: Discord.Client, message: Discord.Message, amount: number, user: Discord.GuildMember | null = null) {
    // Debug to Console
    debug(`I am inside the Purge System.`);

    message.channel.fetchMessages({ limit: amount }).then((messages) => {

        let messageList = messages.filter(message => !message.deleted);

        if (user) {
            const filterBy = user ? user.id : bot.user.id;
            messageList = messages.filter(message => message.author.id === filterBy).array().slice(0, amount);
        }

        recordMessages(messages);

        message.channel.bulkDelete(messages).catch(error => {
            errorLog(error);
            return message.channel.send(error);
        });

        // Load in Log Channel ID
        let logID = channels.log;

        if (!logID) { // If no Log ID...
            debug(`Unable to find log ID in channels.json. Looking for another log channel.`);

            // Look for Log Channel in Server
            let logChannel = message.member.guild.channels.find(val => val.name === "log");
            if (!logChannel) { // If Unable to Find Log Channel...
                debug(`Unable to find any kind of log channel.`);
            } else {
                logID = logChannel.id;
            }
        }

        // Get the Log Channel Color
        let logChannelColor = config.logChannelColors.messagesPurged;
    
        // Build the Embed
        let purgeEmbed = new Discord.RichEmbed()
            .attachFile({ attachment: "purgedMessages.txt", name: "purgedMessages.txt" })
            .setDescription("Messages Purged!")
            .setColor(logChannelColor)
            .addField("Targeted Purge", user === null ? "N/A" : user)
            .addField("Number of Messages Deleted", amount)
            .addField("Purged On", new Date());

        // Check if there is an ID Now...
        if (!logID) { // If no Log ID...
            bot.users.get(userids.ownerID).send(purgeEmbed);
        } else {
            let Channel = <Discord.TextChannel>bot.channels.get(logID);
            Channel.send(purgeEmbed).catch(error => {
                errorLog(error);
            });
        }
    });
}