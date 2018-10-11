/*
    Command Name: created.js
    Function: Returns the Date your Account was Created
    Clearance: none
    Default Enabled: Cannot be disabled.
    Date Created: 05/23/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Reqired Files
import * as Discord from "discord.js";
import { debug, error as errorLog, commandHelp } from "../functions/log.js";

import config = require('../files/config.json');

// Command Variables
const command : commandHelp = {
    bigDescription: ("This command will return the date and time your account was created.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Find out when your account was made.",
    enabled: null,
    fullName: "Created",
    name: "created",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @returns {Promise<void>}
 */
export async function run(bot : Discord.Client, message : Discord.Message) : Promise<void> {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);
    let createdOn = await new Date((Number(message.author.id) / 4194304) + 1420070040000);
    message.channel.send(`Account created on: **${createdOn}**`)
        .catch(error => {
            errorLog(error);
        });
}

export const help = command;
