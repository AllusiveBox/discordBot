/*
    Command Name: permissions.js
    Function: Returns a user's clearance level
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/18/17
    Last Updated: 09/17/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const config = require(`../files/config.json`);
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const log = require(`../functions/log.js`);
;
const betterSql = require(`../classes/betterSql.js`);


// Misc. Variables
const name = "Permissions";



/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {?string[]} [args]
 * @param {!betterSql} sql
 */
module.exports.run = async (client, message, args, sql) => {
    // Debug to Console Log
    log.debug(`I am inside the ${name} Command.`);

    // Enabled Command Test
    if (!enabled.permissions) {
        return disabledCommand.run(name, message);
    }



    // Find out who to Check
    let toCheck = message.mentions.members.first();
    if (!toCheck) {
        // Self Check Code
        toCheck = message.author;
    }
    log.debug(`Checking user permissions for ${toCheck.username}`);

    let row = await sql.getUserRow(toCheck.id);

    if (!row) {
        log.debug(`${toCheck.username} does not exist in database`);
        return message.channel.send(`I am unable to locate data on ${toCheck.username}.`);
    }

    let clearanceLevel = row.clearance;

    if (!clearanceLevel) {
        clearanceLevel = "none";
    }
    let reply = `The Permissions level for ${toCheck} is: **${clearanceLevel}**`;
    return message.author.send(reply).catch(error => {
        return disabledDMs.run(message, reply);
    });
}

module.exports.help = {
    name: "permissions",
    description: ("Returns what permissions the mentioned user has, or for the user if nobody was mentioned"),
    permissionLevel: "normal"
}