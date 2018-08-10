/**

    cxBot.js Mr. Prog Disabled DMs Script
    Version: 1
    Author: AllusiveBox
    Date Created: 08/09/18
    Date Last Updated: 08/09/18

**/

// Load in required Libraries and Files
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);

module.exports.run = async (message, reply) => {
  // Debug to Console
  debug.log(`${message.author.username} has DMs disabled.`);
  if (!reply) { // If No Reply Provided...
    return message.channel.send(`I am sorry, ${message.author}, this command `
      + `is currently disabled.`);
  } else { // If Reply Provided...
    return message.channel.send(reply);
  }
}
