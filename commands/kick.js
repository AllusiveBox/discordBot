/*
    Command Name: kick.js
    Function: Kick a user from the Server
    Clearance: Mod+
	Default Enabled: Cannot be Disabled
    Date Created: 08/31/18
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const sqlite = require(`sqlite`);
const config = require(`../files/config.json`);
const roles = require(`../files/roles.json`);
const userids = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);
const kick = require(`../functions/kick.js`);

// Command Variables
const adminRole = roles.adminRole;
const modRole = roles.modRole;
const shadowModRole = roles.sModRole;
const invalidPermission = config.invalidPermission;

// Misc. Variables
const name = "Kick";
const adminOnly = false;

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {sqlite} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // DM Check
    if (dmCheck.run(message, name)) return; // Return on DM channel

    // Check if User has permission to use kick command
    if (! await hasElevatedPermissions.run(bot, message, adminOnly, sql)) return;

    // Get Member to Kick
    var toKick = message.mentions.members.first();
    if (!toKick) { // No Member to Kick...
        debug.log(`A valid member of the server was not provided.`);
        let reply = (`Please mention a valid member on the server, `
            + `${message.author}.`);
        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    }

    // Validate the kick Target
    if (toKick.user.id == userids.ownerID) { // If Attempt to Kick Owner...
        return debug.log(`${message.author.username} attempted to kick owner.`);
    } else if (toKick.roles.some(r => [adminRole.ID, modRole.ID,
    shadowModRole.ID].includes(r.id))) { // If Attempt to kick Admin/Mod/SMod
        debug.log(`${message.author.username} attempted to kick `
            + `${toKick.user.username}.`);
        return message.channel.send(`I am sorry, ${message.author}, I am `
            + `unable to kick ${toKick.user.username} due to the role(s) `
            + `they have.`);
    }

    // Get Reason for Kicking Member
    var reason = args.slice(1).join(" ");
    if (!reason) { // No Reason Provided...
        debug.log(`No valid reason was provided.`);
        let reply = (`Please indicate a valid reason for kicking `
            + `${toKick.user.username}.`);
        return message.author.send(reply).catch(error => {
            debug.log(`${message.author.username} has DMs disabled.`);
            disabledDMs.run(message, reply);
        });
    }
    // message.channel.send(`This is where the kick function would go...\n`
    //   + `***IF I HAD ONE.***`);

    kick.run(bot, message, toKick, reason, sql);
}

module.exports.help = {
    name: "kick",
    description: ("Kicks a member from the server."),
    permissionLevel: "mod"
}
