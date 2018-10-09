/**

    cxBot.js Mr. Prog Permission Check Script
    Version: 1
    Author: Th3_M4j0r
    Date Started: 08/30/18
    Date Last Updated: 10/09/18
    Last Update By: Th3_M4j0r

**/

// Load in Required Libraries and Files
import * as Discord from 'discord.js';
import betterSql from '../classes/betterSql.js';
const { invalidPermission } = require('../files/config.json');
const { adminRole, modRole, sModRole } = require('../files/roles.json');
const { ownerID } = require('../files/userids.json');
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { check as dmCheck } from '../functions/dmCheck.js';
import { debug } from './log.js';

/**
 * Was used in a server, checks if they have a requisite role
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {boolean} adminOnly
 * @returns {boolean}
 */
function isServerCommand(bot: Discord.Client, message: Discord.Message, adminOnly: boolean): boolean {
    let allowedRoles = [adminRole.ID];
    if (!adminOnly) {
        allowedRoles.push(modRole.ID);
        allowedRoles.push(sModRole.ID);
    }
    return message.member.roles.some(r => allowedRoles.includes(r.id));
}

/**
 * Checks the sql database for if they have the necessary permissions
 * needs to be async because sqlite is awaited
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {boolean} adminOnly
 * @param {betterSql} sql
 * @returns {Promise<boolean>}
 */
async function isDMedCommand(bot: Discord.Client, message: Discord.Message, adminOnly: boolean, sql: betterSql): Promise<boolean> {
    if (!sql) {
        throw new Error("sql cannot be null for commands that could be used in a DM");
    }
    let row = await sql.getUserRow(message.author.id);
    if (!row) { // If Row Not Found...
        debug(`${message.author.username} does not exist in the `
            + `database.`);
        return false;
    } else { //row was found
        if (adminOnly) {
            return row.clearance === "admin";
        } else {
            switch (row.clearance) {
                case "admin":
                case "mod":
                case "smod":
                    return true;
                default:
                    return false;
            }
        }
    }
}

/**
 * returns true if the command user has the necessary permission to use the command
 * @param {!Discord.Client} bot
 * @param {!Discord.Message} message
 * @param {boolean} [adminOnly=false] default assumes not adminOnly
 * @param {?betterSql} [sql] must be included if command could be DMed
 * @param {boolean} [quiet=false] should the command quietly return true or false?
 * @returns {Promise<boolean>}
 */
export async function run(bot: Discord.Client, message: Discord.Message, adminOnly: boolean = false, sql: betterSql | null, quiet: boolean = false): Promise<boolean> {

    debug(`I am in the hasElevatedPermissions function`);
    let DMedCommand = (dmCheck(message, "elevatedPermissionsCheck"));
    if (DMedCommand && sql == null) { //is it a DMed command and is sql null?
        throw new Error("sql was not provided for a DMed command");
    }
    let hasPermission = false;
    if (!DMedCommand) {
        hasPermission = isServerCommand(bot, message, adminOnly);
    } else {
        hasPermission = await isDMedCommand(bot, message, adminOnly, sql);
    }
    if (message.author.id === ownerID) {
        hasPermission = true;
    }
    if (!(hasPermission) && !(quiet)) {
        message.author.send(invalidPermission).catch(error => {
            disabledDMs(message, invalidPermission);
        });
    }
    return hasPermission;
}
