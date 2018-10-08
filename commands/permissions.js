/*
    Command Name: permissions.js
    Function: Returns a user's clearance level
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/18/17
    Last Updated: 10/06/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
const config = require(`../files/config.json`);
const Discord = require(`discord.js`);
const { run: disabledDMs } = require(`../functions/disabledDMs.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const betterSql = require(`../classes/betterSql.js`);


// Command Required Files
const command = {
    bigDescription: ("Returns what permissions the mentioned user has, or for the user if nobody was mentioned\n"
        + "Returns:\n\t" + config.returnsDM),
    description: "Returns a user's permissions",
    enabled: true,
    fullName: "Permissions",
    name: "permissions",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {?string[]} [args]
 * @param {!betterSql} sql
 */
module.exports.run = async (client, message, args, sql) => {
    // Debug to Console Log
    debug(`I am inside the ${command.fullName} Command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.fullName, message);
    }



    // Find out who to Check
    let toCheck;
    let user;
    try {
        toCheck = message.mentions.members.first();
        user = toCheck.user.username;
    } catch (error) {
        toCheck = message.author;
        user = toCheck.username;
    }
    debug(`Checking user permissions for ${user}`);

    let row = await sql.getUserRow(toCheck.id);

    if (!row) {
        debug(`${user} does not exist in database`);
        return message.channel.send(`I am unable to locate data on ${user}.`);
    }

    let clearanceLevel = row.clearance;

    if (!clearanceLevel) {
        clearanceLevel = "none";
    }
    let reply = `The Permissions level for ${toCheck} is: **${clearanceLevel}**`;
    return message.author.send(reply).catch(error => {
        return disabledDMs(message, reply);
    });
}

module.exports.help = command;