/*
    Command Name: setpoints.js
    Function: Allows for manual setting of points for testing purposes.
    Clearance: Owner Only
	Default Enabled: cannot be disabled
    Date Created: 11/03/17
    Last Updated: 10/06/18
    Last Updated By: Th3_M4j0r
*/

// Load in Required Files
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const Discord = require(`discord.js`);
const { run: dmCheck } = require(`../functions/dmCheck.js`);
const userids = require(`../files/userids.json`)
const betterSql = require(`../classes/betterSql.js`);

// Command Stuff

const command = {
    bigDescription: ("Use this command to set the points of a user to something else.\n"
        + "Required arguments: @{user} -> The user to change the points for.\n"
        + "{int} -> The number of points to set the user to have.\n"
        + "Returns:\n\t"
        + "This command returns nothing"),
    description: "Changes a mentioned user's points",
    enabled: null,
    fullName: "Set Points",
    name: "setpoints",
    permissionLevel: "owner"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console Log
    debug(`I am inside the ${command.fullName} Command.`);
    if (dmCheck(message, command.name)) return;


    // Owner ID Check
    if (message.author.id !== userids.ownerID) { // If not Owner ID
        return debug(`Attempted use of ${command.name} by ${message.author.username}.\n`);
    }

    // Get the name of the Member to Change Points
    var toChange = message.mentions.members.first();
    // Get the amount of points to set
    var amount = !!parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);

    // Validation Check
    if (!toChange) {
        message.channel.send("You must mention someone to update their points");
        return debug("No member was given.\n");
    }
    if (!amount) {
        message.channel.send("You must indicate what to set their points to");
        return debug("No new value was given.\n");
    }

    let row = await sql.getUserRow(toChange.id);
    if (!row) {
        message.channel.send(`I'm sorry, ${message.author}, I am unable to set the points of ${toChange.user.username} `
            + `as they are not currently in the user database.`);
        return debug(`Unable to locate any data for ${toChange.user.username}`);
    }
    if (row.optOut === 1) {
        message.channel.send(`I'm sorry, ${message.author}, I cannot set the points of ${toChange.user.username} they have opted out`);
        return debug(`Unable to set points of ${toChange.user.username}, they have opted out`);
    }
    let name = toChange.user.username;
    try {
        name = message.guild.members.get(toChange.id).nickname;
        if (!name) name = toChange.user.username;
        debug(`Name set to: ${name}`);
    }
    catch (error) {
        name = message.author.username;
        debug(`Unable to get Nickname. Name set to: ${name}`);
    }
    debug(`Setting points for ${name} to ${amount} from ${row.points}`);
    sql.setPoints(toChange.id, amount, row.level, name);
};

module.exports.help = command;