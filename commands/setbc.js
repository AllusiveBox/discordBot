/*
    Command Name: setbc
    Function: sets a user's battlecode
    Clearance: None
	Default Enabled: Cannot be Disabled
    Date Created: 03/19/18
    Last Updated: 09/08/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);

/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {sqlite} sql
 */

module.exports.run = (bot, message, args, sql) => {
    const getBattleCode = require(`./setbattlecode.js`);
    setBattleCode.run(client, message, args, sql);
}

module.exports.help = {
    name: "setbc",
    description: "A shorthand command for setBattlecode."
}