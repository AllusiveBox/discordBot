/*
    Command Name: setbc
    Function: sets a user's battlecode
    Clearance: None
	Default Enabled: Cannot be Disabled
    Date Created: 03/19/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, commandHelp } from '../functions/log.js';
import { commandBot } from '../classes/commandBot';
import betterSql from '../classes/betterSql.js';

import config = require('../files/config.json');



const command: commandHelp = {
    bigDescription: ("Allows a user to set their battlecode, which can be fetched "
        + `which can be fetched with the ${config.prefix}getBC command.\n`
        + "Returns:\n\t"
        + config.returnsDM),
    description: "Shorthand for SetBattlecode",
    enabled: null,
    fullName: "Set Battlecode",
    name: "setbc",
    permissionLevel: "normal"
}

/**
 * 
 * @param {commandBot} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {betterSql} sql
 */
export function run(bot: commandBot, message: Discord.Message, args: string[], sql: betterSql) {
    debug(`I am inside the ${command.name} function`);
    bot.commands.get("setbattlecode").run(bot, message, args, sql);
}

export const help = command;