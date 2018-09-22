/*
    Command Name: ban.js
    Function: Ban a user from the Server
    Clearance: Mod+
	Default Enabled: Cannot be Disabled
    Date Created: 12/02/17
    Last Updated: 09/15/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const betterSql = require(`../classes/betterSql.js`);
const roles = require(`../files/roles.json`);
const userids = require(`../files/userids.json`);
const log = require(`../functions/log.js`);
;
const dmCheck = require(`../functions/dmCheck.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);
const ban = require(`../functions/ban.js`);

// Command Variables
const adminRole = roles.adminRole;
const modRole = roles.modRole;
const shadowModRole = roles.sModRole;
const invalidPermission = config.invalidPermission;

const command = {
    bigDescription: ("Use this command to ban someone from a server \n"
        + "A user must be mentioned, a reason given, and they cannot be an admin or mod"),
    description: "Ban someone from a server",
    enabled: "cannot be disabled",
    name: "Ban",
    permissionLevel: "Mod+"
}


// Misc. Variables
const adminOnly = false;

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    log.debug(`I am inside the ${command.name} command.`);

    // DM Check
    if (dmCheck.run(message, command.name)) return; // Return on DM channel

    // Check User Role
    /*if (!message.member.roles.some(r => [adminRole.ID, modRole.ID,
    shadowModRole.ID].includes(r.id))) { // If Not Admin, Mod, or Shadow Mod...
        return message.author.send(invalidPermission).catch(error => {
            return disabledDMs.run(message, invalidPermission);
        });
    }*/
    if (! await hasElevatedPermissions.run(bot, message, adminOnly, sql)) return;

    // Get Member to Ban
    var toBan = message.mentions.members.first();
    if (!toBan) { // No Member to Ban...
        log.debug(`A valid member of the server was not provided.`);
        let reply = (`Please mention a valid member on the server, `
            + `${message.author}.`);
        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    }

    // Validate the Ban Target
    if (toBan.user.id == userids.ownerID) { // If Attempt to Ban Owner...
        return log.debug(`${message.author.username} attempted to ban owner.`);
    } else if (toBan.roles.some(r => [adminRole.ID, modRole.ID,
    shadowModRole.ID].includes(r.id))) { // If Attempt to Ban Admin/Mod/SMod
        log.debug(`${message.author.username} attempted to ban `
            + `${toBan.user.username}.`);
        return message.channel.send(`I am sorry, ${message.author}, I am `
            + `unable to ban ${toBan.user.username} due to the role(s) `
            + `they have.`);
    }

    // Get Reason for Banning Member
    var reason = args.slice(1).join(" ");
    if (!reason) { // No Reason Provided...
        log.debug(`No valid reason was provided.`);
        let reply = (`Please indicate a valid reason for banning `
            + `${toBan.user.username}.`);
        return message.author.send(reply).catch(error => {
            log.debug(`${message.author.username} has DMs disabled.`);
            disabledDMs.run(message, reply);
        });
    }
    // message.channel.send(`This is where the ban function would go...\n`
    //   + `***IF I HAD ONE.***`);

    ban.run(bot, message, toBan, reason, sql);
}

module.exports.help = command;
