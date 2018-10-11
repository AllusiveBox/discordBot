/**

    cxBot.js Mr. Prog Disabled DMs Script
    Version: 1
    Author: AllusiveBox
    Date Created: 08/09/18
    Date Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

**/

// Load in required Libraries and Files
import * as Discord from 'discord.js';
import { debug } from './log.js';


/**
 * 
 * @param {Discord.Message} message
 * @param {string} reply
 */
export async function run(message: Discord.Message, reply: string) {
    // Debug to Console
    debug(`${message.author.username} has DMs disabled.`);
    if (!reply) { // If No Reply Provided...
        return debug(`No Reply Passed to disabledDMs function...`);
    } else { // If Reply Provided...
        return message.channel.send(reply);
    }
}
