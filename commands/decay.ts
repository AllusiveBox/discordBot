/*
    Command Name: decay.js
    Function: Returns Decay Server Link Ayeeee
    Clearance: none
  	Default Enabled: Yes
    Date Created: 06/02/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { run as disabledCommand } from '../functions/disabledCommand';
import { debug, commandHelp } from '../functions/log.js';

import config = require('../files/config.json');

// Command Variables
const command : commandHelp = {
    bigDescription: ("This command brings forth a funny video showcasing the wrath of Decay.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Summons the wrath of Decay from the voice channel!",
    enabled: true,
    fullName: "Decay",
    name: "decay",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @returns {Promise<void>}
 */
export async function run(bot: Discord.Client, message: Discord.Message): Promise<void> {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        disabledCommand(command.fullName, message);
        return;
    }

    debug(`Generating Message for ${message.author.username}.\n`);
    message.channel.send(`https://www.youtube.com/watch?v=-d9M_AZqu8U`);

}

export const help = command;
