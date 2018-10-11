/*
    Command Name: kick.js
    Function: Kick a user from the Server
    Clearance: Mod+
	Default Enabled: Cannot be Disabled
    Date Created: 08/31/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import betterSql from '../classes/betterSql.js';
import { debug, commandHelp } from '../functions/log.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { run as hasElevatedPermissions } from '../functions/hasElevatedPermissions.js';
import { run as kick } from '../functions/kick.js';

import config = require('../files/config.json');
import roles = require('../files/roles.json');
import userids = require('../files/userids.json');

// Command Variables
const adminRole = roles.adminRole;
const modRole = roles.modRole;
const shadowModRole = roles.sModRole;

const command : commandHelp = {
    adminOnly: false,
    bigDescription: ("Use this command to kick someone from a server \n"
        + "Arguments:\n\t"
        + "@{user} -> The user to ban.\n\t"
        + "{string} -> The reason the member is to be kicked.\n"
        + "Returns:\n\t"
        + "On successful kick, a message will be logged."),
    description: "Kick a user form the server",
    enabled: null,
    fullName: "Kick",
    name: "kick",
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

    // Check if User has permission to use kick command
    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql)) return;

    // Get Member to Kick
    var toKick = message.mentions.members.first();
    if (!toKick) { // No Member to Kick...
        debug(`A valid member of the server was not provided.`);
        let reply = (`Please mention a valid member on the server, `
            + `${message.author}.`);
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    }

    // Validate the kick Target
    if (toKick.user.id == userids.ownerID) { // If Attempt to Kick Owner...
        return debug(`${message.author.username} attempted to kick owner.`);
    } else if (toKick.roles.some(r => [adminRole.ID, modRole.ID,
    shadowModRole.ID].includes(r.id))) { // If Attempt to kick Admin/Mod/SMod
        debug(`${message.author.username} attempted to kick `
            + `${toKick.user.username}.`);
        return message.channel.send(`I am sorry, ${message.author}, I am `
            + `unable to kick ${toKick.user.username} due to the role(s) `
            + `they have.`);
    }

    // Get Reason for Kicking Member
    var reason = args.slice(1).join(" ");
    if (!reason) { // No Reason Provided...
        debug(`No valid reason was provided.`);
        let reply = (`Please indicate a valid reason for kicking `
            + `${toKick.user.username}.`);
        return message.author.send(reply).catch(error => {
            debug(`${message.author.username} has DMs disabled.`);
            disabledDMs(message, reply);
        });
    }
    // message.channel.send(`This is where the kick function would go...\n`
    //   + `***IF I HAD ONE.***`);

    kick(bot, message, toKick, reason, sql);
}

export const help = command;
