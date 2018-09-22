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
    let debug = new Logger("DebugLogger", "log.txt");

    debug.log(string, config.debug, "a");
}

/**
 * 
 * @param {string} string
 */

async function errorLogger(string) {
    let errorLogger = new Logger("ErrorLogger", "error.txt");

    errorLogger.log(string, config.debug, "a");
}

/**
 * @param {Discord.User} user
 * @param {string} string
 * @param {string[]} args
 */

async function commandLogger(user, command, args) {
    let commandLogger = new Logger("CommandLogger");

    // Build the Log Message
    let logMessage = `Command recieved from ${user} to perform ${command}.\n\t\t\t\t   `;

    if (!args[0]) { // If No Arguments Passed...
        logMessage = `${logMessage}No arguments were included.`;
    } else {
        logMessage = `${logMessage}The following arguments were included: ${args}`;
    }

    commandLogger.log(logMessage);
}

module.exports.debug = debugLogger;
module.exports.error = errorLogger;
module.exports.command = commandLogger;