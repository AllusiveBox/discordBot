/*
    Command Name: getbc
    Function: returns a user's battlecode
    Clearance: None
	Default Enabled: Cannot be Disabled
    Date Created: 03/19/18
    Last Updated: 09/01/18
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

module.exports.run = (client, message, args, sql) => {
    const getBattleCode = require(`./getbattlecode.js`);
    getBattleCode.run(client, message, args, sql);
}

module.exports.help = {
    name: "getbc",
    description: "A shorthand command for getBattlecode."
}