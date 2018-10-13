/*
    Command Name: ban.js
    Function: Ban a user from the Server
    Clearance: Mod+
	Default Enabled: Cannot be Disabled
    Date Created: 12/02/17
    Last Updated: 10/13/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const betterSql = require(`../classes/betterSql.js`);
const config = require(`../files/config.json`);
const roles = require(`../files/roles.json`);
const userids = require(`../files/userids.json`);
const { run: ban } = require(`../functions/ban.js`);
const { run: dmCheck } = require(`../functions/dmCheck.js`);
const { run: disabledDMs } = require(`../functions/disabledDMs.js`);
const { run: hasElevatedPermissions } = require(`../functions/hasElevatedPermissions.js`);
const { debug } = require(`../functions/log.js`);

// Command Variables
const command = {
    adminOnly: false,
    adminRole: roles.adminRole,
    modRole: roles.modRole,
    shadowModRole: roles.sModRole,
    bigDescription: ("Use this command to ban someone from a server \n"
        + "Arguments:\n\t"
        + "@{user} -> The user to ban.\n\t"
        + "{string} -> The reason the member is to be banned.\n"
        + "Returns:\n\t"
        + "On successful ban, a message will be logged."),
    description: "Ban someone from a server",
    enabled: null,
    name: "ban",
    fullName: "Ban",
    permissionLevel: "mod"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // DM Check
    if (dmCheck(message, command.fullName)) return; // Return on DM channel

    // Check User Role
    /*if (!message.member.roles.some(r => [adminRole.ID, modRole.ID,
    shadowModRole.ID].includes(r.id))) { // If Not Admin, Mod, or Shadow Mod...
        return message.author.send(invalidPermission).catch(error => {
            return disabledDMs(message, invalidPermission);
        });
    }*/
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
    } else if (toBan.roles.some(r => [command.adminRole.ID, command.modRole.ID,
    command.shadowModRole.ID].includes(r.id))) { // If Attempt to Ban Admin/Mod/SMod
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
    // Set the isKicking flag to true
    config.isKicking = true;

    ban(bot, message, toBan, reason, sql);
}

module.exports.help = command;
