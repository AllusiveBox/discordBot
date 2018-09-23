/** 
 *  
 *  Mr. Prog Logging Script
 *  Version: 1
 *  Date Created: 09/21/18
 *  Last Updated: 09/21/18
 *  Last Updated By: AllusiveBox
 *
 */

// Load in Required Libraries and Files
const Logger = require(`../classes/Logger.js`);
const config = require(`../files/config.json`);

/**
 * 
 * @param {string} string
 */

async function debugLogger(string) {
    let debug = new Logger("DebugLogger");

    debug.log(string, config.debug);
}

/**
 * 
 * @param {string} string
 */

async function errorLogger(error) {
    let errorLogger = new Logger("ErrorLogger");

    errorLogger.log(error);
    errorLogger.log(error.stack);
}

/**
 * @param {Discord.User} user
 * @param {string} string
 * @param {string[]} args
 */

async function commandLogger(user, command, args) {
    let commandLogger = new Logger("CommandLogger");

    // Build the Log Message
    let logMessage = `Command recieved from ${user} to perform ${command}.`;

    commandLogger.log(logMessage);

    if (!args[0]) { // If No Arguments Passed...
        logMessage = `No arguments were included.`;
    } else {
        logMessage = `The following arguments were included: ${args}`;
    }

    commandLogger.log(`${logMessage}`);
}

module.exports.debug = debugLogger;
module.exports.error = errorLogger;
module.exports.command = commandLogger;