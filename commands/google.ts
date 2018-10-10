/*
    Command Name: google.js
    Function: Just google it, Lan...
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/15/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { check as dmCheck } from '../functions/dmCheck.js';


const config = require('../files/config.json');

// Command Variables
const command = {
    bigDescription: ("Just google it, Lan...\n"
        + "Returns:\n\t" + config.returnsChannel),
    description: "Google it",
    enabled: true,
    fullName: "Google",
    name: "google",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(bot: Discord.Client, message: Discord.Message, args: string[]) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    // DM Check
    if (await (!dmCheck(message, command.name))) {
        message.delete().catch(error => {
            errorLog(`Unable to purge command by ${message.author.username}.`);
        });
    } 

    return message.channel.send({ file: "./img/google.png" });
}

export const help = command;