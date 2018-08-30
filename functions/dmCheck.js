/**

    cxBot.js Mr. Prog DM Checker
    Version: 1
    Author: AllusiveBox
    Date Created: 08/10/18
    Date Last Updated: 08/30/18
    Last Update By: Th3_M4j0r

**/

// Load in required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);

/**
 * 
 * @param {Discord.Message} message
 * @param {string} name
 */
module.exports.run = (message, name) => {
  if (message.channel.type === "dm") { // If Sent in DM...
    debug.log(`${name} command was used by ${message.author.username} in a DM.`);
    // Get Invalid Channel Message
    let invalidChannel = config.invalidChannel;
    message.author.send(invalidChannel).catch(error => {
      disabledDMs.run(message, invalidChannel);
    });
    return true;
  }
  return false;
}
