/**

    cxBot.js Mr. Prog Disabled Command Script
    Version: 1
    Author: AllusiveBox
    Date Created: 08/09/18
    Date Last Updated: 08/09/18

**/

// Load in required Libraries and Files
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);
const disabledDMs = require(`../functions/disabledDMs`);

module.exports.run = async (commandName, message) => {
  // Debug to Console
  debug.log(`I am in the disabledMessage function.`);

  // Read in Disabled Command Message
  const disabledMessage = config.disabledMessage;

  debug.log(`The ${commandName} command is currently disabled.\n`);

  return message.author.send(disabledMessage).catch(error => {
    disabledDMs.run(message, disabledMessage);
  })
}
