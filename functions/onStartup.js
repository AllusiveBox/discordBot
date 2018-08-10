/**

    cxBot.js Mr. Prog Startup Script
    Version: 2
    Author: AllusiveBox
    Date Started: 08/09/18
    Date Last Updated: 08/09/18

**/

const errorLog = require(`../functions/errorLog.js`);
const userids = require(`../files/userids.json`);

module.exports.run = async (bot, args) => {
  // Read in Passed Along Arguments
  passedArgs = args[2];
  try {
    if (passedArgs > 0) {
      bot.users.get(userids.ownerID).send(`Starting up...\n`
      + `Previous iteration terminated with error code: ${passedArgs}.`);
    }
  }
  catch (error) {
    errorLog.log(error);
  }
}
