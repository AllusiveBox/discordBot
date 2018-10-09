/**

    cxBot.js Mr. Prog DM Checker
    Version: 1
    Author: AllusiveBox
    Date Created: 08/10/18
    Date Last Updated: 10/09/18
    Last Update By: Th3_M4j0r

**/

// Load in required Libraries and Files
import * as Discord from 'discord.js';
const config = require(`../files/config.json`);
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { debug, error as errorLog } from '../functions/log.js';

/**
 * 
 * Checks if they are in a DM channel
 * If it was a DM, tells the user it was an invalid channel
 * @param {Discord.Message} message
 * @param {string} name
 * @return {boolean} Returns True if In a DM
 */
export function run(message: Discord.Message, name: string): boolean {
    if (message.channel.type === "dm") { // If Sent in DM...
        debug(`${name} command was used by ${message.author.username} in a DM.`);
        // Get Invalid Channel Message
        let invalidChannel = config.invalidChannel;
        message.author.send(invalidChannel).catch(error => {
            disabledDMs(message, invalidChannel);
        });
        return true;
    }
    return false;
}

/**
 * 
 * Quiet verson of run
 * @param {Discord.Message} message
 * @param {string} name
 * @return {boolean} Returns True if In a DM
 */
export function check(message: Discord.Message, name: string): boolean {
    if (message.channel.type === "dm") { // If Sent in DM...
        debug(`${name} command was used by ${message.author.username} in a DM.`);
        return true;
    } else {
        return false;
    }
}