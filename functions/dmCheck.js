/**

    cxBot.js Mr. Prog DM Checker
    Version: 1
    Author: AllusiveBox
    Date Created: 08/10/18
    Date Last Updated: 09/22/18
    Last Update By: AllusiveBox

**/

// Load in required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const log = require(`../functions/log.js`);

/**
 * 
 * Checks if they are in a DM channel
 * If it was a DM, tells the user it was an invalid channel
 * @param {Discord.Message} message
 * @param {string} name
 * @return {boolean} Returns True if In a DM
 */
module.exports.run = (message, name) => {
    if (message.channel.type === "dm") { // If Sent in DM...
        log.debug(`${name} command was used by ${message.author.username} in a DM.`);
        // Get Invalid Channel Message
        let invalidChannel = config.invalidChannel;
        message.author.send(invalidChannel).catch(error => {
            disabledDMs.run(message, invalidChannel);
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
module.exports.check = (message, name) => {
    if (message.channel.type === "dm") { // If Sent in DM...
        log.debug(`${name} command was used by ${message.author.username} in a DM.`);
        return true;
    } else {
        return false;
    }
}