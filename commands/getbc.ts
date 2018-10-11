/*
    Command Name: getbc
    Function: returns a user's battlecode
    Clearance: None
	Default Enabled: Cannot be Disabled
    Date Created: 03/19/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { commandHelp, debug } from '../functions/log';
import betterSql from '../classes/betterSql';
import { commandBot } from '../classes/commandBot';

import config = require('../files/config.json');

const command : commandHelp = {
    bigDescription: ("Returns a mentioned user's battle code. If no user is "
        + "mentioned, it will return the command user's battle code instead.\n"
        + "Returns:\n\t" + config.returnsChannel),
    description: "Shorthand for getbattlecode",
    enabled: null,
    fullName: "Get Battlecode",
    name: "getBC",
    permissionLevel: "normal"
}



/**
 * 
 * @param {commandBot} client
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {betterSql} sql
 */
export function run(bot : commandBot, message: Discord.Message, args: string[], sql: betterSql) {
    debug(`I am inside the ${command.name} function`);
    bot.commands.get("getbattlecode").run(bot, message, args, sql);
}

export const help = command;