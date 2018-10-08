/*
    Command Name: getbc
    Function: returns a user's battlecode
    Clearance: None
	Default Enabled: Cannot be Disabled
    Date Created: 03/19/18
    Last Updated: 10/06/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);

const command = {
    bigDescription: ("Returns a mentioned user's battle code. If no user is "
        + "mentioned, it will return the command user's battle code instead.\n"
        + "Returns:\n\t" + config.returnsChannel),
    description: "Shorthand for getbattlecode",
    enabled: null,
    fullName: "Get Battlecode",
    name: "getBC",
    permissionLevel: "normal"
}



/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {betterSql} sql
 */

module.exports.run = (bot, message, args, sql) => {
    const getBattleCode = require(`./getbattlecode.js`);
    getBattleCode.run(client, message, args, sql);
}

module.exports.help = command;