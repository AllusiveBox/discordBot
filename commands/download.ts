/*
    Command Name: download.js (previously play.js)
    Function: Returns a link to download the demo
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/17/17
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';

const config = require('../files/config.json');

// Command Variables
const command : commandHelp = {
    bigDescription: ("This command provides a link to download the latest demo of MegaMan Battle Network Chrono X.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Gives you the download link!",
    enabled: true,
    fullName: "Download",
    name: "download",
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
        return disabledCommand(command.fullName, message);
    }

    // Build Reply
    let reply = (`To download the latest version of Chrono X, check the following link: \n`
        + `http://www.mmbnchronox.com/game.php`);

    message.channel.send(reply);
}

export const help = command;