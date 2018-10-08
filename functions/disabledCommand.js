/**

    cxBot.js Mr. Prog Disabled Command Script
    Version: 1
    Author: AllusiveBox
    Date Created: 08/09/18
    Date Last Updated: 10/06/18
    Last Update By: Th3_M4j0r

**/

// Load in required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { run: disabledDMs } = require(`../functions/disabledDMs`);
const { debug, error: errorLog } = require(`../functions/log.js`);

/**
 * 
 * @param {string} commandName
 * @param {Discord.Message} message
 * @returns {Promise<void>}
 */
module.exports.run = async (commandName, message) => {
    // Debug to Console
    debug(`I am in the disabledMessage function.`);

    // Read in Disabled Command Message
    const disabledMessage = config.disabledMessage;

    debug(`The ${commandName} command is currently disabled.\n`);

    message.author.send(disabledMessage).catch(error => {
        disabledDMs(message, disabledMessage);
    });
}
