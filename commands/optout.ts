/*
    Command Name: optout.js
    Function: opt out from data collection
    Clearance: none
	Default Enabled: Cannot be disabled 
    Date Created: 05/23/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/


// Load in Required Files
import * as Discord from 'discord.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import betterSql from '../classes/betterSql.js';

import config = require('../files/config.json');

// Command Required Files
const command : commandHelp = {
    bigDescription: ("Allows a user to opt out of data collection.\n"
        + "Returns:\n\t" + config.returnsDM),
    description: "Opts out of data collection",
    enabled: null,
    fullName: "Opt-Out",
    name: "optOut",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {?string[]} [args]
 * @param {betterSql} sql
 */
export async function run(bot, message: Discord.Message, args: string[] | null, sql: betterSql) {

    // Debug to Console Log
    debug(`I am inside the ${command.fullName} Command.`);

    let row = await sql.getUserRow(message.author.id);

    if (!row) {
        debug(`Unable to locate any data for ${message.author.username}.`);
        let reply = `I am unable to locate any data on you. Please try again.`;
        return message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    }
    //else row found


    if (row.optOut === 1) { //if opted out
        debug(`${message.author.username} attempted to opt-out while already opted out.`);
        let reply = `You are already opted out, ${message.author}. `
            + `To opt back in, use the ${config.prefix}optIn command.`;
        return message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    }

    //not opted out

    debug(`${message.author.username} is being opted-out`);
    await sql.optOutUser(message.author.id);
    let reply = `No further data on you will be collected, `
        + `however if you want any existing data to be deleted, `
        + `use the ${config.prefix}deleteMe command. If you `
        + `wish to have data collected again, use the `
        + `${config.prefix}optIn command`;
    return message.author.send(reply).catch(error => {
        return disabledDMs(message, reply);
    });

}

export const help = command;