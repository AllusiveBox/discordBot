/*
    Command Name: purge.js
    Function: Deletes messages from a channel
    Clearance: admin
	Default Enabled: Yes
    Date Created: 10/25/17
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { run as hasElevatedPermissions } from '../functions/hasElevatedPermissions.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as purge } from '../functions/purge.js';

// Command Variables
const command : commandHelp = {
    adminOnly: true,
    bigDescription: ("This command bulk deletes messages from a channel.\n"
        + "Arguments:\n\t"
        + "@{user} (optional) -> The user to bulk delete messages of.\n\t"
        + "{int} -> The number of messages to delete. This caps at 100.\n\t"
        + "Returns:\n\t"
        + "On successful purge, a message will be logged."),
    description: "Purge commands from a channel.",
    enabled: true,
    fullName: "Purge",
    name: "purge",
    permissionLevel: "admin"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
export async function run(bot: Discord.Client, message: Discord.Message, args, sql) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.fullName, message);
    }

    // DM Check
    if (dmCheck(message, command.fullName)) return; // Return on DM channel

    // Permissions Check
    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql, true)) return;

    // Grab the Amount
    let amount = !!parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);

    let user = null;

    if (!amount) { // If No Amount Provided...
        debug(`No amount of messages was provided to delete.\n`);

        // Build Reply
        let reply = `${message.author}, you need to indicate a number of messages to purge!`
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    } else if ((amount < 2) || (amount > 100)) {
        debug(`Amount range is invalid.`);

        // Build Reply
        let reply = `${message.author}, you please use a valid range. The allowed range is between 2 and 100.`;
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    }

    // Get the User, if Any Mentioned
    user = message.mentions.members.first() !== undefined ? message.mentions.members.first() : null;

    purge(bot, message, amount, user);
}

export const help = command;