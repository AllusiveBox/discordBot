/*
    Command Name:staff.js
    Function: Returns a link to our Staff Page
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/17/17
    Last Updated: 10/11/18
    Last Updated By: Th3_M4j0r 

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';


import config = require('../files/config.json');

// Command Variables
const command : commandHelp = {
    bigDescription: ("Provides a link to the staff page.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Returns a link to the staff page.",
    enabled: true,
    fullName: "Staff",
    name: "staff",
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

    let reply = ("To find out more about our team, clink the following link:\n"
        + "<http://www.mmbnchronox.com/thestaff.php>");

    return message.channel.send(reply);
}

export const help = command;