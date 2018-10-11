/*
    Command Name: joindate.js
    Function: Returns the Date the Member Joined the Server
    Clearance: none
	Default Enabled: Cannot be Disabled
    Date Created: 04/24/18
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r
*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, commandHelp } from '../functions/log.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { run as dmCheck } from '../functions/dmCheck.js';


import config = require('../files/config.json');

// Command Stuff
const command : commandHelp = {
    bigDescription: ("Returns when the user had joined the server.\n"
        + "Returns\n\t" + config.returnsDM),
    description: "Returns user's join date",
    enabled: null,
    fullName: "Join Date",
    name: "joindate",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
export async function run(bot: Discord.Client, message: Discord.Message) {
    // Debug to Console
    debug(`I am in the ${command.fullName} command.`);

    // DM Check
    if (await dmCheck(message, command.fullName)) return; // Return on DM channel

    // Build the Reply
    let reply = (`You joined the server on: **${message.member.joinedAt}**.`);

    return message.author.send(reply).catch(error => {
        disabledDMs(message, reply);
    });
}

export const help = command;