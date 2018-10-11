/*
    Command Name: setstatus.js
    Function: Changes the Bot's Status
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/27/17
    Last Updated: 10/11/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledDMs } from '../functions/disabledCommand.js';
import { run as hasElevatedPermissions } from '../functions/hasElevatedPermissions.js';
import { methodType } from '../functions/validate.js';


import config = require('../files/config.json');

const command : commandHelp = {
    bigDescription: ("This command is used to update the bot's status (what the bot is currently 'streaming').\n"
        + "Required arguments: {string} -> The string of text you want to change the bot's status to.\n"
        + "Returns:\n\t"
        + config.returnsDM),
    description: "Changes the bot's status.",
    enabled: null,
    adminOnly: true,
    fullName: "Set Status",
    name: "setstatus",
    permissionLevel: "admin"
}



/**
 * 
 * @param {Discord.Client} bot
 * @param {string} [newStatus]
 * @param {Discord.ActivityType} [method]
 * @param {string} [url]
 * @returns {boolean}
 */

function updateStatus(bot: Discord.Client, newStatus: string = config.defaultStatus, method: Discord.ActivityType = "PLAYING", url : string = null): boolean {
    // Validate Method
    methodType(method);

    bot.user.setActivity(newStatus, {url: url, type: method }).then(presence => {
        debug(`Status updated to: ${newStatus}`);
    }).catch(error => {
        errorLog(error);
        return false;
        });

    return true;
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */

export async function run(bot: Discord.Client, message: Discord.Message, args: string[], sql) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql)) return;

    // Join the additional arguments into the status
    let status = args.join(" ");

    let success = updateStatus(bot, status);

    if (success) {
        let reply = `Status was successfully updated.`;
        return message.author.send(reply).catch(error => {
            disabledDMs(command.name, message);
        });
    } else {
        let reply = (`I am sorry, ${message.author}, something went wrong and I was unable to update the status.\n`
            + `Please wait a few seconds and then try again.`);
        return message.author.send(reply).catch(error => {
            disabledDMs(command.name, message);
        });
    }
}

export const help = command;
const _updateStatus = updateStatus;
export { _updateStatus as updateStatus };