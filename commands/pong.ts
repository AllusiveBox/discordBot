/*
    Command Name: pong.js
    Function: Test if Bot is Online
    Clearance: none
	Default Enabled: Yes
    Date Created: 04/23/18
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
    bigDescription: ("Bot Replies \"gnip!\" Useful if you want to see if the bot is "
        + "active and accepting commands.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Bot Replies \"gnip!\".",
    enabled: true,
    fullName: "Pong",
    name: "Pong",
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

    return message.channel.send("gnip!");
}

export const help = command;