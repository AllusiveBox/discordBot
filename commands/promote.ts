/*
    Command Name: promote.js
    Function: Promote a User's Clearnace
    Clearance: Admin
	Default Enabled: Yes
    Date Created: 10/18/17
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r
*/

// Load in Required Files
import * as Discord from 'discord.js';
import betterSql from '../classes/betterSql.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { run as hasElevatedPermissions } from '../functions/hasElevatedPermissions.js';


import config = require('../files/config.json');
import roles = require('../files/roles.json');

// Command Stuff
const adminRole = roles.adminRole;
const modRole = roles.modRole;
const shadowModRole = roles.sModRole;
const command : commandHelp = {
    bigDescription: ("This command is used to promote users, giving them both a role, and updating them in the SQL database.\n"
        + "Required arguments: @{user} -> The user you wish to promote.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Promote a user.",
    enabled: true,
    fullName: "Promote",
    name: "promote",
    permissionLevel: "admin",
    adminOnly: true
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
export async function run(bot: Discord.Client, message: Discord.Message, args: string[], sql: betterSql) {
    // Debug to Console Log
    debug(`I am inside the ${command.fullName} Command.`);

    // DM Check
    if (dmCheck(message, command.name)) return; // Return on DM channel

    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql)) return;


    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    // Find out who to Promote
    let toPromote = message.mentions.members.first();
    if (!toPromote) { // No Member to Promote Given
        debug("No member to promote was listed.\n");
        return message.channel.send("Please indicate a valid member to promote.");
    }

    // Find out what to Promote to
    let toLevel = args.slice(1).join(' ');
    if (!toLevel) { // No Level Given for Promoting
        debug("No level was given to promote to.\n");
        return message.channel.send("Please indicate a valid role to promote to.");
    }

    toLevel = toLevel.toLowerCase();

    if ((toLevel !== "smod") && (toLevel !== "mod") && (toLevel !== "admin") && (toLevel !== "none")) { // Invalid Roll to Promote Too
        debug(`${message.author.username} tried to promote ${toPromote.user.username} to ${toLevel}, but that level does not exist.`);
        debug(`Only mod or admin are valid.\n`)
        return message.channel.send("Invalid role name. Only mod, sMod, or admin can be declared.");
    }

    let row = await sql.userLookup(toPromote.id);
    if (!row) {
        debug(`${toPromote.user.username} does not exist in database. Unable to promote.`);
        return message.channel.send(`I'm sorry, ${message.author}, I am unable to promote ${toPromote.user.username} `
            + `as they are not currently in the user database.`);
    }

    // Grab the Server Roles
    let serverRoles = message.guild.roles;

    debug(`Setting ${toPromote.user.username} to ${toLevel}.`);
    if (toLevel === "admin") {
        let role = serverRoles.get(adminRole.ID)
        toPromote.addRole(role).catch(error => {
            return errorLog(error);
        });
        sql.promoteUser(toPromote.id, "admin");
        role = serverRoles.get(modRole.ID);
        toPromote.addRole(role)
            .catch(error => { // No Role to Remove
                debug(`${toPromote.user.username} is not a mod.`);
            });
        role = serverRoles.get(shadowModRole.ID);
        toPromote.addRole(role)
            .catch(error => { // No Role to Remove
                debug(`${toPromote.user.username} is not a shadow mod.`);
            });
    } else if (toLevel === "mod") {
        let role = serverRoles.get(modRole.ID);
        toPromote.addRole(role).catch(error => {
            return errorLog(error);
        });
        sql.promoteUser(toPromote.id, "mod");
        role = serverRoles.get(adminRole.ID);
        toPromote.removeRole(role)
            .catch(error => { // No Role to Remove
                debug(`${toPromote.user.username} is not an admin.`);
            });
        role = serverRoles.get(shadowModRole.ID);
        toPromote.removeRole(role)
            .catch(error => { // No Role to Remove
                debug(`${toPromote.user.username} is not a shadow mod.`);
            });
    } else if (toLevel === "smod") {
        let role = serverRoles.get(shadowModRole.ID);
        toPromote.addRole(role).catch(error => {
            return errorLog(error);
        });
        sql.promoteUser(toPromote.id, "mod");
        role = serverRoles.get(adminRole.ID);
        toPromote.removeRole(role)
            .catch(error => { // No Role to Remove
                debug(`${toPromote.user.username} is not an admin.`);
            });
        role = serverRoles.get(modRole.ID);
        toPromote.removeRole(role)
            .catch(error => { // No Role to Remove
                debug(`${toPromote.user.username} is not a mod.`);
            });
    } else { //"none"
        let role = serverRoles.get(adminRole.ID);
        toPromote.removeRole(role).catch(error => {
            debug(`${toPromote.user.username} is not an admin.`);
        });
        sql.promoteUser(toPromote.id, "none");
        role = serverRoles.get(modRole.ID);
        toPromote.removeRole(role)
            .catch(error => { // No Role to Remove
                debug(`${toPromote.user.username} is not a mod.`);
            });
        role = serverRoles.get(shadowModRole.ID);
        toPromote.removeRole(role)
            .catch(error => { // No Role to Remove
                debug(`${toPromote.user.username} is not a shadow mod.`);
            });
    }

    return message.channel.send(`${toPromote} has been promoted to **${toLevel}**.\n`);
}

export const help = command;