/**

    cxBot.js Mr. Prog Disabled Command Script
    Version: 1
    Author: AllusiveBox
    Date Created: 08/09/18
    Date Last Updated: 10/09/18
    Last Update By: Th3_M4j0r

**/

// Load in required Libraries and Files
import * as Discord from 'discord.js';
const config = require('../files/config.json');
import { run as disabledDMs } from './disabledDMs';
import { debug, error as errorLog } from './log.js';

/**
 * 
 * @param {string} commandName
 * @param {Discord.Message} message
 * @returns {Promise<void>}
 */
export async function run(commandName: string, message: Discord.Message): Promise<void> {
    // Debug to Console
    debug(`I am in the disabledMessage function.`);

    debug(`The ${commandName} command is currently disabled.\n`);

    message.author.send(config.disabledMessage).catch(error => {
        disabledDMs(message, config.disabledMessage);
    });
}
