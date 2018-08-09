/**

    cxBot.js Mr. Prog Error Logging Script
    Version: 2
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 08/08/18

**/

// Load in Required Libraries and Files
const fs = require(`fs`);
const config = require(`../files/config.json`);

module.exports.log = async (error) => {
  // Declare Necessary Variables
  var date = new Date();
  var stream = fs.createWriteStream("error.txt", {flags: 'a'});

  // Figure out the Time
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  // Figure out the Date
  let D = date.getDate();
  var M = date.getMonth() + 1;
  let Y = date.getFullYear();

  // Format Time
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  // Format Date
  D = D < 10 ? '0' + D : D;
  M = M < 10 ? '0' + M : M;

  // Combine the String
  error = `${M}/${D}/${Y}: ${h}:${m}:${s}> ERROR: ${error}\n`;

  // Write to Log File
  stream.write(`${error}`);
  stream.end();

  return console.log(error);
}
