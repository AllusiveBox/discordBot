/*
    Command Name: progsmash.js
    Function: Returns Prog Smash
    Clearance: none
	Default Enabled: Yes
    Date Created: 04/01/18
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';


import config = require('../files/config.json');

// Command Variables
const command : commandHelp = {
    bigDescription: ("Sends the Prog Smash gif.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "PROG ANGRY. PROG SMASH!",
    enabled: true,
    fullName: "Prog Smash",
    name: "progsmash",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
export async function run(bot: Discord.Client, message: Discord.Message) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        disabledCommand(command.name, message);
    }

    return message.channel.send({ file: "./img/magicslam.gif" }).catch(error => {
        errorLog(error);
        message.channel.send(`Unexpected error caused by ${message.author} when using the ${command.fullName} command.`);
    });
}

export const help = command;