/*
    Command Name: setlevel.js
    Function: Allows for manual setting of level for testing puposes.
    Clearance: Owner Only
	Default Enabled: Cannot be Disabled
    Date Created: 11/03/17
    Last Updated: 09/16/18
    Last Update By: AllusiveBox
*/

// Load in Required Files
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);
const Discord = require(`discord.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const userids = require(`../files/userids.json`)
const betterSql = require(`../functions/betterSql.js`);

// Command Stuff
const command = {
    bigDescription: ("Use this command to set the level of a user to something else.\n"
        + "Required arguments: @{user} -> The user to change the points for.\n"
        + "{int} -> The level to set the user to have.\n"),
    description: "Changes a mentioned user's level",
    enabled: "cannot be disabled",
    name: "setlevel",
    permissionLevel: "owner"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
module.exports.run = async  (client, message, args, sql) => {
    // Debug to Console Log
    debug.log(`I am inside the ${command.name} Command.`);
    if (dmCheck.run(message, command.name)) return;


    // Owner ID Check
    if (message.author.id !== userids.ownerID) { // If not Owner ID
        return debug.log(`Attempted use of ${command.name} by ${message.author.username}.\n`);
    }

    // Get the name of the Member to Change Points
    var toChange = message.mentions.members.first();
    // Get the amount of points to set
    var newLevel = !!parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);

    // Validation Check
    if (!toChange) {
        message.channel.send("You must mention someone to update their level");
        return debug.log("No member was given.\n");
    }
    if (!newLevel) {
        message.channel.send("You must indicate what to set their level to");
        return debug.log("No new value was given.\n");
    }

    let row = await sql.getUserRow(toChange.id);
    if (!row) {
        message.channel.send(`I'm sorry, ${message.author}, I am unable to set the level of ${toChange.user.username} `
            + `as they are not currently in the user database.`);
        return debug.log(`Unable to locate any data for ${toChange.user.username}`);
    }
    if (row.optOut === 1) {
        message.channel.send(`I'm sorry, ${message.author}, I cannot set the level of ${toChange.user.username}, they have opted out`);
        return debug.log(`Unable to set level of ${toChange.user.username}, they have opted out`);
    }
    let name = toChange.user.username;
    try {
        name = message.guild.members.get(toChange.id).nickname;
        if (!name) name = toChange.user.username;
        debug.log(`Name set to: ${name}`);
    }
    catch (error) {
        name = message.author.username;
        debug.log(`Unable to get Nickname. Name set to: ${name}`);
    }
    debug.log(`Setting level for ${name} to ${newLevel} from ${row.level}`);
    sql.setPoints(toChange.id, row.points, newLevel, name);
};

module.exports.help = command;