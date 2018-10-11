/*
    Command Name: oof.js
    Function: Returns an oof
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/15/18
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';


import config = require('../files/config.json');

// Command Stuff
const command : commandHelp = {
    bigDescription: ("Sends the Oof! picture\n"
        + "Returns:\n\t" + config.returnsChannel),
    description: "Returns an oof",
    enabled: true,
    fullName: "Oof!",
    name: "oof",
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
        return disabledCommand(command.name, message);
    }

    return message.channel.send({ file: "./img/oof.png" }).catch(error => {
        errorLog(error);
        message.channel.send(`Unexpected error caused by ${message.author} when using the ${command.name} command.`);
    });
}

export const help = command;