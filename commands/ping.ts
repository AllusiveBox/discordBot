/*
    Command Name: !ping
    Function: Returns ping so that users can tell if the bot is accepting commands currently.
    Clearance: none
    Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';


import config = require('../files/config.json');

// Command Variables
const command : commandHelp = {
    bigDescription: ("Bot Replies \"Pong!\" Useful if you want to see if the bot is "
        + "active and accepting commands.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Bot Replies \"Pong!\".",
    enabled: true,
    fullName: "Ping",
    name: "ping",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
export async function run(bot: Discord.Client, message: Discord.Message, args: string[]) {
    // Debug to Console
    debug(`I am in the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    return message.channel.send("pong!");
}

export const help = command;
