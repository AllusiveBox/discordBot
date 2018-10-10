/*
    Command Name: debug.js
    Function: Sets Debug Flag for Testing
    Clearance: Owner Only
	Default Enabled: Cannot be Disabled
    Date Created: 10/15/17
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, commandHelp } from '../functions/log.js';

const userids = require('../files/userids.json');
const config = require('../files/config.json');


// Command Variables
const command: commandHelp = {
    bigDescription: ("This command toggles the config.debug flag which determins if stuff are logged to the command prompt or not.\n"
        + "Returns:\n\t"
        + "This command returns nothing."),
    description: "Toggle the config.debug flag.",
    enabled: null,
    fullName: "Debug",
    name: "debug",
    permissionLevel: "owner"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @returns {Promise<void>}
 */
export async function run(bot: Discord.Client, message: Discord.Message): Promise<void> {
    //Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Owner ID Check
    if (message.author.id !== userids.ownerID) { // If Not Owner ID...
        return debug(`Attempted use of ${command.fullName} by ${message.author.username}.`);
    }

    // Switch the Debug Value
    config.debug = !config.debug;
    return debug(`Setting debug value to: ${config.debug}.`);
}

export const help = command;
