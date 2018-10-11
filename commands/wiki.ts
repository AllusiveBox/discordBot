/*
    Command Name: wiki.js
    Function: Returns a link to the Wiki
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/25/17
    Last Updated: 10/11/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';


import config = require('../files/config.json');

// Command Variables
const command : commandHelp = {
    bigDescription: ("Provides a link to the wiki site.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Returns a link to the wiki site.",
    enabled: true,
    fullName: "Wiki",
    name: "wiki",
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

    let reply = (`The official Chrono X Wiki can be found with the following link:\n`
        + `<http://mmbnchronox.wikia.com/wiki/MMBN_Chrono_X_Wiki>`);

    return message.channel.send(reply);
}

export const help = command;