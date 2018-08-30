/**

    cxBot.js Mr. Prog Error Logging Script
    Version: 2
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 08/30/18
    Last Update By: Th3_M4j0r

**/

// Load in Required Libraries and Files
const fs = require(`fs`);
const util = require(`util`);
const config = require(`../files/config.json`);
const spiffyDate = require(`../functions/getSpiffyDate.js`);

/**
 * 
 * @param {Error} error
 */
module.exports.log = (error) => {
  // Declare Necessary Variables
  var stream = fs.createWriteStream("error.txt", {flags: 'a'});
  // Get Spiffy Date
  let date = spiffyDate.run();

  // Combine the String
  error = `${date}> ERROR: ${error}\n`;

  // Write to Log File
  stream.write(`${error}`);
  stream.end();

  return console.log(error);
}

/**
 * 
 * @param {Promise<any>} promise
 */
module.exports.logPromise = (promise) => {
  // Declare Necessary Variables
  var stream = fs.createWriteStream("error.txt", {flags: 'a'});

  // Write to Log File

  promise.then(function(result) {
    console.log(result);
  }, function(error) {
    console.log(error);
  });

  //console.log(promise);
}
