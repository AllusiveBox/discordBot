/*
    Command Name: disable.js
    Function: To disable a command
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/17/17
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Require Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as hasElevatedPermissions } from '../functions/hasElevatedPermissions.js';
import betterSql from '../classes/betterSql.js';
import { commandBot } from '../classes/commandBot.js';

// Command Variables
const command : commandHelp = {
    adminOnly: true,
    bigDescription: ("This command allows an administrator to enable a command that is disabled.\n"
        + "Returns:\n\t"
        + "This command returns nothing."),
    description: "Enables a command.",
    enabled: null,
    fullName: "Enable",
    name: "enable",
    permissionLevel: "admin"
}

/**
 * 
 * @param {commandBot} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {betterSql} sql
 */
export async function run(bot: commandBot, message: Discord.Message, args: string[], sql: betterSql) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    if (args[0] === undefined) return debug(`No arguments passed.`)

    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql)) return;
    let toEnable = args[0].toLocaleLowerCase();
    if (!toEnable) { //no argument passed
        return debug(`No arguments passed`);
    }
    if (toEnable == "music") { //music is a special case
        toEnable = "play";
    }
    try {
        var enabled = bot.commands.get(toEnable).help.enabled;
    } catch (error) {
        return errorLog(error);
    }
    if (enabled === null) return debug(`This command cannot be disabled.`);
    debug(`Setting ${toEnable} to true.`);
    bot.commands.get(toEnable).help.enabled = true;
}

export const help = command;
