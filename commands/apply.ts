/*
    Command Name: apply.js (previously join.js)
    Function: Returns instructions on how to Join the Team
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from "discord.js";
import { run as disabledCommand } from "../functions/disabledCommand.js";
import { debug, commandHelp } from "../functions/log.js";


import config = require("../files/config.json");

// Command Stuff
const command : commandHelp = {
    bigDescription: ("This command will inform the user on how to join the MegaMan Battle Network Chrono X Development Team.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Instructions on how to join the dev team.",
    enabled: true,
    fullName: "Apply",
    name: "apply",
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
        return disabledCommand(command.fullName, message);
    }
    // Build Reply
    let reply = ("Currently we are only looking for sprite and pixel artist.\n"
        + "If you are interested, or know someone who might be, please contact us with work samples at the following e-mail:\n"
        + "**cxdevteam@gmail.com**");
    return message.channel.send(reply);
}

export const help = command;