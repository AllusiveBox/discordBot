/*
    Command Name: promote.js
    Function: Promote a User's Clearnace
    Clearance: Admin
	Default Enabled: Yes
    Date Created: 10/18/17
    Last Updated: 09/15/18
    Last Updated By: Th3_M4j0r
*/

// Load in Required Files
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const betterSql = require(`../functions/betterSql.js`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const Discord = require(`discord.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const errorLog = require(`../functions/errorLog.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);
const roles = require(`../files/roles.json`);

// Command Stuff
const adminRole = roles.adminRole;
const modRole = roles.modRole;
const shadowModRole = roles.sModRole;
const adminOnly = true;

// Misc. Variables
const name = "Promote";


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
module.exports.run = async (client, message, args, sql) => {
    // Debug to Console Log
    debug.log(`I am inside the ${name} Command.`);

    // DM Check
    if (dmCheck.run(message, name)) return; // Return on DM channel

    if (! await hasElevatedPermissions.run(client, message, adminOnly, sql)) return;


    // Enabled Command Test
    if (!enabled.promote) {
        disabledCommand.run(name, message);
    }

    // Find out who to Promote
    let toPromote = message.mentions.members.first();
    if (!toPromote) { // No Member to Promote Given
        debug.log("No member to promote was listed.\n");
        return message.channel.send("Please indicate a valid member to promote.");
    }

    // Find out what to Promote to
    let toLevel = args.slice(1).join(' ');
    if (!toLevel) { // No Level Given for Promoting
        debug.log("No level was given to promote to.\n");
        return message.channel.send("Please indicate a valid role to promote to.");
    }

    toLevel = toLevel.toLowerCase();

    if ((toLevel !== "smod") && (toLevel !== "mod") && (toLevel !== "admin") && (toLevel !== "none")) { // Invalid Roll to Promote Too
        debug.log(`${message.author.username} tried to promote ${toPromote.user.username} to ${toLevel}, but that level does not exist.`);
        debug.log(`Only mod or admin are valid.\n`)
        return message.channel.send("Invalid role name. Only mod, sMod, or admin can be declared.");
    }

    let row = await sql.userLookup(toPromote.id);
    if (!row) {
        debug.log(`${toPromote.user.username} does not exist in database. Unable to promote.`);
        return message.channel.send(`I'm sorry, ${message.author}, I am unable to promote ${toPromote.username} `
            + `as they are not currently in the user database.`);
    }

    debug.log(`Setting ${toPromote.user.username} to ${toLevel}.`);
    if (toLevel === "admin") {
        toPromote.addRole(adminRole.id).catch(error => {
            errorLog.log(error);
        });
        sql.promoteUser(toPromote.id, "admin");
        toPromote.removeRole(modRole.id)
            .catch(error => { // No Role to Remove
                debug.log(`${toPromote.user.username} is not a mod.`);
            });
        toPromote.removeRole(shadowModRole.id)
            .catch(error => { // No Role to Remove
                debug.log(`${toPromote.user.username} is not a shadow mod.`);
            });
    } else if (toLevel === "mod") {
        toPromote.addRole(modRole.id).catch(error => {
            errorLog.log(error);
        });
        sql.promoteUser(toPromote.id, "mod");
        toPromote.removeRole(adminRole.id)
            .catch(error => { // No Role to Remove
                debug.log(`${toPromote.user.username} is not an admin.`);
            });
        toPromote.removeRole(shadowModRole.id)
            .catch(error => { // No Role to Remove
                debug.log(`${toPromote.user.username} is not a shadow mod.`);
            });
    } else if (toLevel === "smod") {
        toPromote.addRole(shadowModRole.id).catch(error => {
            errorLog.log(error);
        });
        sql.promoteUser(toPromote.id, "mod");
        toPromote.removeRole(adminRole.id)
            .catch(error => { // No Role to Remove
                debug.log(`${toPromote.user.username} is not an admin.`);
            });
        toPromote.removeRole(modRole.id)
            .catch(error => { // No Role to Remove
                debug.log(`${toPromote.user.username} is not a mod.`);
            });
    } else { //"none"
        toPromote.removeRole(adminRole.id).catch(error => {
            debug.log(`${toPromote.user.username} is not an admin.`);
        });
        sql.promoteUser(toPromote.id, "none");
        toPromote.removeRole(modRole.id)
            .catch(error => { // No Role to Remove
                debug.log(`${toPromote.user.username} is not a mod.`);
            });
        toPromote.removeRole(shadowModRole.id)
            .catch(error => { // No Role to Remove
                debug.log(`${toPromote.user.username} is not a shadow mod.`);
            });
    }

    return message.channel.send(`${toPromote} has been promoted to **${toLevel}**.\n`);
}