/**

    cxBot.js Mr. Prog Startup Script
    Version: 2
    Author: AllusiveBox
    Date Started: 08/09/18
    Date Last Updated: 10/07/18
    Last Update By: Th3_M4j0r

**/

const Discord = require(`discord.js`);
const userids = require(`../files/userids.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);

/**
 * 
 * @param {Discord.Client} bot
 * @param {string[]} [args]
 */
module.exports.run = async (bot, args) => {
    // Read in Passed Along Arguments
    passedArgs = await args[2];
    try {
        if ((passedArgs != 0) && (passedArgs != undefined)) {
            bot.users.get(userids.ownerID).send(`Starting up...\n`
                + `Previous iteration terminated with error code: ${passedArgs}.`);
            if (args[3]) {
                additionalArgs = args.slice(2).join(" ");
                bot.users.get(userids.ownerID).send(`The following arguments were also `
                    + `included: ${additionalArgs}`);
            }
        }
    }
    catch (error) {
        errorLog(error);
    }
}
