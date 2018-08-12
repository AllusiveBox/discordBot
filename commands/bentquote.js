/*
    Command Name: bentquote.js
    Function: Returns a Random Bent Quote from Array
    Clearance: none
	  Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 08/18/18
*/

// Load in Required Files
const fs = require(`fs`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables
var lastNum;
var rando;

// Misc. Variables
const name = "BentQuote";

function randomIntFrom(min, max) {
  while (rando === lastNum) { // Loop Until New Number...
    rando = Math.floor(Math.random() * (max - min + 1) + min);
  }
  debug.log(`Setting rando to: ${rando}`);
  return rando;
}

function isInt(value) {
  if (isNaN(value)) return false;
  return true;
}

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // Enabled Command Test
  if (!enabled.bentquote) {
    return disabledCommand.run(name, message);
  }

  // Create the BentQuote Array
  try {
    var text = fs.readFileSync(`./files/bentcomments.txt`, `utf8`);
  }
  catch (error) {
    errorLog.log(error);
    return message.channel.send(`No BentQuotes can be found...`);
  }

  let bentComments = text.split(`\n`);
  // var text = fs.readFileSync(`./files/bentcomments.txt`, `utf8`);
  // if (!text) {
  //   debug.log(`No BentQuotes have been loaded in...`);
  //   return message.channel.send(`No BentQuotes can be found...`);
  // } else {
  //   let bentComments = text.split(`\n`);
  // }

  // Determine if Arguments were Passed With the Command...
  if ((args[0] && (isInt(args[0])))) { // If BentQuote Number Provided...
    if ((args[0] > bentComments.length) || (args[0] <= 0)) { // If Out of Range
      debug.log(`Number was out of range. Generating Random Number.`);

      // Assign Random Num Value
      rando = randomIntFrom(0, bentComments.length - 1);
    } else { // If Number In Range...
      rando = args[0] - 1;
      debug.log(`Setting rando to: ${rando}`);
    }
  } else { // If BentQuote Number Not Provided...
    // Assign Random Number Value
    rando = randomIntFrom(0, bentComments.length - 1);
  }

  // Return the BentQuote
  debug.log(`Generating BentQuote for ${message.author.username}.`);
  message.channel.send(`BentQuote #${rando+1}: bentComments[rando]`);
}

module.exports.help = {
  name        : "bentquote",
  description : ("Returns a random quote")
}
