/**

    cxBot.js Mr. Prog Permission Check Script
    Version: 1
    Author: Th3_M4j0r
    Date Started: 08/30/18
    Date Last Updated: 10/07/18
    Last Update By: Th3_M4j0r

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const betterSql = require(`../classes/betterSql.js`);
const config = require(`../files/config.json`);
const roles = require(`../files/roles.json`);
const userids = require(`../files/userids.json`);
const { run: disabledDMs } = require(`../functions/disabledDMs.js`);
const { check: dmCheck } = require(`../functions/dmCheck.js`);
const { debug } = require(`../functions/log.js`);

const adminRole = roles.adminRole;
const modRole = roles.modRole;
const shadowModRole = roles.sModRole;
const invalidPermission = config.invalidPermission;

/**
 * Was used in a server, checks if they have a requisite role
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {boolean} adminOnly
 * @returns {boolean}
 */
function isServerCommand(bot, message, adminOnly) {
    let allowedRoles = [adminRole.ID];
    if (!adminOnly) {
        allowedRoles.push(modRole.ID);
        allowedRoles.push(shadowModRole.ID);
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
async function isDMedCommand(bot, message, adminOnly, sql) {
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
module.exports.run = async (bot, message, adminOnly = false, sql, quiet = false) => {

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
    if (message.author.id === userids.ownerID) {
        hasPermission = true;
    }
    if (!(hasPermission) && !(quiet) ) {
        message.author.send(invalidPermission).catch(error => {
            disabledDMs(message, invalidPermission);
        });
    }
    return hasPermission;
}
