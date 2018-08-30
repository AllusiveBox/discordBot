/**

    cxBot.js Mr. Prog Command Log Script
    Version: 4
    Author: AllusiveBox
    Date Started: 02/28/18
    Date Last Updated: 08/30/18
    Last Update By: Th3_M4j0r
**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const spiffyDate = require(`../functions/getSpiffyDate.js`);

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string} command
 * @param {string[]} [args]
 */
module.exports.log = (bot, message, command, args) => {
  // No Arguments expected by Default. Change to False if Detected
  let noArgs = true;

  // check for Null values
  if (!command) { // If no Command (Should Never Trigger)...
    errorLog.log(`In command logging system but no commands present...`);
    errorLog.log(`Event triggered by ${message.author}`);
    return errorLog.log(message.content);
  }
  if (args[0]) { // If Command With Arguments...
    noArgs = false;
  }

  // Get Spiffy Date
  let date = spiffyDate.run();

  // Log Commands
  console.log(`${date}> Command received from `
    + `${message.author.username} to perform ${command}.`);

  if (noArgs) { // If No Arguments were Included...
      return console.log(`No arguments were included.\n`);
  } else { // Arguments were Included...
      return console.log(`The following arguments were included: ${args}\n`);
  }
}
