/**

    cxBot.js Mr. Prog Debug Script
    Version: 3
    Author: AllusiveBox
    Date Created: 08/08/18
    Date Last Updated: 08/08/18

**/

// Load in required Libraries and Files
const fs = require(`fs`);
const enabled = require(`../files/enabled.json`);
const spiffyDate = require(`../functions/getSpiffyDate.js`);

module.exports.log = async (str) => {
  // Declare Necessary Variables
  var stream = fs.createWriteStream("log.txt", {flags: 'a'});
  // Get Spiffy Date
  let date = await spiffyDate.run().toString();

  // Combine the String
  str = `${date}> ${str}\n`;

  // Write to Log File
  stream.write(`${str}`);
  stream.end();

  if (enabled.debug) console.log(str);
  return;
}
