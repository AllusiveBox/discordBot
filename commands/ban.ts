/*
    Command Name: ban.js
    Function: Ban a user from the Server
    Clearance: Mod+
	Default Enabled: Cannot be Disabled
    Date Created: 12/02/17
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import betterSql from '../classes/betterSql.js';
import { run as ban } from '../functions/ban.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { run as hasElevatedPermissions } from '../functions/hasElevatedPermissions.js';
import { debug, commandHelp } from '../functions/log.js';


const roles = require('../files/roles.json');
const userids = require('../files/userids.json');

// Command Variables
const command: commandHelp = {
    adminOnly: false,
    bigDescription: ("Use this command to ban someone from a server \n"
        + "Arguments:\n\t"
        + "@{user} -> The user to ban.\n\t"
        + "{string} -> The reason the member is to be banned.\n"
        + "Returns:\n\t"
        + "On successful ban, a message will be logged."),
    description: "Ban someone from a server",
    enabled: null,
    fullName: "Ban",
    name: "ban",
    permissionLevel: "mod"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
export async function run(bot: Discord.Client, message: Discord.Message, args: string[], sql: betterSql) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // DM Check
    if (dmCheck(message, command.fullName)) return; // Return on DM channel

    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql)) return;

    // Get Member to Ban
    var toBan = message.mentions.members.first();
    if (!toBan) { // No Member to Ban...
        debug(`A valid member of the server was not provided.`);
        let reply = (`Please mention a valid member on the server, `
            + `${message.author}.`);
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    }

    // Validate the Ban Target
    if (toBan.user.id == userids.ownerID) { // If Attempt to Ban Owner...
        return debug(`${message.author.username} attempted to ban owner.`);
    } else if (toBan.roles.some(r => [roles.adminRole.ID, roles.modRole.ID,
    roles.sModRole.ID].includes(r.id))) { // If Attempt to Ban Admin/Mod/SMod
        debug(`${message.author.username} attempted to ban `
            + `${toBan.user.username}.`);
        return message.channel.send(`I am sorry, ${message.author}, I am `
            + `unable to ban ${toBan.user.username} due to the role(s) `
            + `they have.`);
    }

    // Get Reason for Banning Member
    var reason = args.slice(1).join(" ");
    if (!reason) { // No Reason Provided...
        debug(`No valid reason was provided.`);
        let reply = (`Please indicate a valid reason for banning `
            + `${toBan.user.username}.`);
        return message.author.send(reply).catch(error => {
            debug(`${message.author.username} has DMs disabled.`);
            disabledDMs(message, reply);
        });
    }

    ban(bot, message, toBan, reason);
}

export const help = command;
