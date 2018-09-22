/*
    Command Name: debug.js
    Function: Sets Debug Flag for Testing
    Clearance: Owner Only
	Default Enabled: Cannot be Disabled
    Date Created: 10/15/17
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const userids = require(`../files/userids.json`);
const config = require(`../files/config.json`);
const log = require(`../functions/log.js`);
;

// Command Variables

// Misc Variables
const name = "Debug";


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    //Debug to Console
    log.debug(`I am inside the ${name} command.`);

    // Owner ID Check
    if (message.author.id !== userids.ownerID) { // If Not Owner ID...
        return log.debug(`Attempted use of ${name} by ${message.author.username}.`);
    }

    // Switch the Debug Value
    config.debug = !config.debug;
    return log.debug(`Setting debug value to: ${config.debug}.`);
}

module.exports.help = {
    name: "debug",
    description: ("Switches the debug value."),
    permissionLevel: "owner"
}
