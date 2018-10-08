/*
    Command Name: setbc
    Function: sets a user's battlecode
    Clearance: None
	Default Enabled: Cannot be Disabled
    Date Created: 03/19/18
    Last Updated: 10/08/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);



const command = {
    bigDescription: ("Allows a user to set their battlecode, which can be fetched "
        + `which can be fetched with the ${config.prefix}getBC command.\n`
        + "Returns:\n\t"
        + config.returnsDM),
    description: "Shorthand for SetBattlecode",
    enabled: null,
    fullName: "Set Battlecode",
    name: "setbc",
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
    const getBattleCode = require(`./setbattlecode.js`);
    setBattleCode.run(bot, message, args, sql);
}

module.exports.help = command;