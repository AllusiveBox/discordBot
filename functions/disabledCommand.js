/**

    cxBot.js Mr. Prog Disabled Command Script
    Version: 1
    Author: AllusiveBox
    Date Created: 08/09/18
    Date Last Updated: 09/06/18
    Last Update By: Th3_M4j0r

**/

// Load in required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);
const disabledDMs = require(`../functions/disabledDMs`);

/**
 * 
 * @param {string} commandName
 * @param {Discord.Message} message
 * @returns {Promise<void>}
 */
module.exports.run = async (commandName, message) => {
    // Debug to Console
    debug.log(`I am in the disabledMessage function.`);

    // Read in Disabled Command Message
    const disabledMessage = config.disabledMessage;

    debug.log(`The ${commandName} command is currently disabled.\n`);

    message.author.send(disabledMessage).catch(error => {
        disabledDMs.run(message, disabledMessage);
    });
}
