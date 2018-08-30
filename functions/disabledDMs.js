/**

    cxBot.js Mr. Prog Disabled DMs Script
    Version: 1
    Author: AllusiveBox
    Date Created: 08/09/18
    Date Last Updated: 08/30/18
    Last Update By: Th3_M4j0r

**/

// Load in required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);

/**
 * 
 * @param {Discord.Message} message
 * @param {string} reply
 */
module.exports.run = async (message, reply) => {
  // Debug to Console
  debug.log(`${message.author.username} has DMs disabled.`);
  if (!reply) { // If No Reply Provided...
    return debug.log(`No Reply Passed to disabledDMs function...`);
  } else { // If Reply Provided...
    return message.channel.send(reply);
  }
}
