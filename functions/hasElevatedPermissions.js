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

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {boolean} adminOnly
 * @param {sqlite} sql
 */
module.exports.run = (bot, message, adminOnly, sql) => {
    let allowedRoles = [adminRole];
    if (!adminOnly) {
        allowedRoles.push(modRole);
        allowedRoles.push(shadowModRole);
    }

    let DMedCommand = false;
    if (!message.Guild) DMedCommand = true;

    if (!DMedCommand) {
        if (!message.member.roles.some(r => allowedRoles.includes(r.id))) { // If Not Admin, Mod, or Shadow Mod...
            message.author.send(invalidPermission).catch(error => {
                disabledDMs.run(message, invalidPermission);
            });
            return false;
        } else {
            return true;
        }
    } else {
       //TODO: sql query to check for if they have the requisite role
        return false;
    }

}