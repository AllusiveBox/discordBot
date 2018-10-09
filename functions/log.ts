/** 
 *  
 *  Mr. Prog Logging Script
 *  Version: 1
 *  Date Created: 09/21/18
 *  Last Updated: 10/09/18
 *  Last Updated By: Th3_M4j0r
 *
 */

// Load in Required Libraries and Files
import * as Discord from 'discord.js';
import Logger from '../classes/Logger.js';
const config =  require('../files/config.json');

/**
 * 
 * @param {string} string
 */
async function debugLogger(string: string) {
    let debug = new Logger("DebugLogger");

    debug.log(string, config.debug);
}

/**
 * 
 * @param {Error} error
 */
async function errorLogger(error: Error) {
    let errorLogger = new Logger("ErrorLogger");

    errorLogger.log(error.toString());
    errorLogger.log(error.stack);
}

/**
 * @param {Discord.User} user
 * @param {string} command
 * @param {string[]} args
 */

async function commandLogger(user: Discord.User, command: string, args: string[]) {
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

export const debug = debugLogger;
export const error = errorLogger;
export const command = commandLogger;