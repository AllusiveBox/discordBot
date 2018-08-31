/**

    cxBot.js Mr. Prog Ban Scripts
    Version: 1
    Author: Th3_M4j0r
    Date Started: 08/30/18
    Date Last Updated: 08/30/18
    Last Update By: Th3_M4j0r

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const channels = require(`../files/channels.json`);
const roles = require(`../files/roles.json`);
const debug = require(`../functions/debug.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const errorLog = require(`../functions/errorLog.js`);


const adminRole = roles.adminRole;
const modRole = roles.modRole;
const shadowModRole = roles.sModRole;
const invalidPermission = config.invalidPermission;

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {boolean} adminOnly
 * @returns {boolean}
 */
function isServerCommand(bot, message, adminOnly) {
    let allowedRoles = [adminRole];
    if (!adminOnly) {
        allowedRoles.push(modRole);
        allowedRoles.push(shadowModRole);
    }
    return message.member.roles.some(r => allowedRoles.includes(r.id)); // If Not Admin, Mod, or Shadow Mod...
}

/**
 * checks the sql database for if they have the necessary permissions
 * needs to be async because sqlite is async
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {boolean} adminOnly
 * @param {sqlite} sql
 * @returns {Promise<boolean>}
 */
async function isDMedCommand(bot, message, adminOnly, sql) {
    let row = await sql.get(`SELECT * FROM userinfo WHERE userID = "${message.author.id}"`);
    if (!row) { // If Row Not Found...
        debug.log(`${message.author.username} does not exist in the `
            + `database.`);
        return false;
    } else { //row was found
        if (adminOnly) {
            return row.clearance === "admin";
        } else {
            switch (row.clearance) { //TODO: confirm name of each permission type with AllusiveBox
                case "admin":
                case "mod":
                case "sMod":
                    return true;
                    break;
                default:
                    return false;
            }
        }
    }
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {boolean} adminOnly
 * @param {sqlite} sql
 * @returns {Promise<boolean>}
 */
module.exports.run = async (bot, message, adminOnly, sql) => {
    

    let DMedCommand = false;
    let hasPermission = false;
    if (!message.Guild) DMedCommand = true;
    if (!DMedCommand) {
        hasPermission = isServerCommand(bot, message, adminOnly);
    } else {
        hasPermission = await isDMedCommand(bot, message, adminOnly, sql);
    }
    if (!hasPermission) {
        message.author.send(invalidPermission).catch(error => {
            disabledDMs.run(message, invalidPermission);
        });
    }
    return hasPermission;

}