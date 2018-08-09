/**

    cxBot.js Mr. Prog Log Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 02/28/18
    Date Last Updated: 03/02/18

**/

// Load in Required Libraries and Files
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

module.exports.log = async (bot, message, command, args) => {
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

  // Declare Date Variable
  var date = new Date();
  // Figure out the Time
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();

  // Figure out the Date
  var D = date.getDate();
  var M = date.getMonth() + 1;
  var Y = date.getFullYear();

  // Format Time
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  // Format Date
  D = D < 10 ? '0' + D : D;
  M = M < 10 ? '0' + M : M;

  // Log Commands
  console.log(`${M}/${D}/${Y}: ${h}:${m}:${s}> Command received from `
    + `${message.author.username} to perform ${command}.`);

  if (noArgs) { // If No Arguments were Included...
      return console.log(`No arguments were included.\n`);
  } else { // Arguments were Included...
      return console.log(`The following arguments were included: ${args}\n`);
  }
}
