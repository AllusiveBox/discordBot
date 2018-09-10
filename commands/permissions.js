/*
    Command Name: permissions.js
    Function: Returns a user's clearance level
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/18/17
    Last Updated: 09/09/18
*/

// Load in Required Files
const config = require(`../files/config.json`);
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const betterSql = require(`../functions/betterSql.js`);


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
    debug.run(`I am inside the ${name} Command.`);

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
    debug.run(`Checking user permissions for ${toCheck.username}`);

    let row = await sql.getUserRow(toCheck);

    if (!row) {
        debug.run(`${toCheck.username} does not exist in database`);
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
    description: ("Returns the what permissions the mentioned user has, or the user if nobody was mentioned")
}