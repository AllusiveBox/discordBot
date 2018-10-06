/*
    Command Name: setbc
    Function: sets a user's battlecode
    Clearance: None
	Default Enabled: Cannot be Disabled
    Date Created: 03/19/18
    Last Updated: 10/05/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);



const command = {
    bigDescription: ("Allows a user to set their battlecode, which can be fetched "
        + `which can be fetched with the getBattleCode command.`),
    description: "Shorthand for SetBattlecode",
    enabled: null,
    fullName: "Set Battlecode",
    name: "SetBattlecode",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {betterSql} sql
 */
module.exports.run = (client, message, args, sql) => {
    const getBattleCode = require(`./setbattlecode.js`);
    setBattleCode.run(client, message, args, sql);
}

module.exports.help = command;