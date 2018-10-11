/*
    Command Name: n1.js
    Function: Provides a link to the N1GP server
    Clearance: none
	Default Enabled: Yes
    Date Created: 05/19/18
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, commandHelp } from '../functions/log.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { run as disabledCommand } from '../functions/disabledCommand';


import config = require('../files/config.json');

// Command Stuff
const inviteLink : Discord.InviteResolvable = config.n1gpLink;

const command : commandHelp = {
    bigDescription: ("Provides a link to the N1GP server.\n"
        + "Returns:\n\t" + config.returnsDM),
    description: "Sends a link to N1GP",
    enabled: true,
    fullName: "N1GP",
    name: "n1",
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

    return message.author.send(inviteLink).catch(error => {
        disabledDMs(message, inviteLink);
    });
}

export const help = command;