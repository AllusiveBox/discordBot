/**

    cxBot.js Mr. Prog Disabled Command Script
    Version: 1
    Author: AllusiveBox
    Date Created: 08/09/18
    Date Last Updated: 09/22/18
    Last Update By: AllusiveBox

**/

// Load in required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const disabledDMs = require(`../functions/disabledDMs`);
const log = require(`../functions/log.js`);

/**
 * 
 * @param {string} commandName
 * @param {Discord.Message} message
 * @returns {Promise<void>}
 */
module.exports.run = async (commandName, message) => {
    // Debug to Console
    log.debug(`I am in the disabledMessage function.`);

    // Read in Disabled Command Message
    const disabledMessage = config.disabledMessage;

    log.debug(`The ${commandName} command is currently disabled.\n`);

    message.author.send(disabledMessage).catch(error => {
        disabledDMs.run(message, disabledMessage);
    });
}
