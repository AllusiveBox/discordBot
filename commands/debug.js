/*
    Command Name: debug.js
    Function: Sets Debug Flag for Testing
    Clearance: Owner Only
	Default Enabled: Cannot be Disabled
    Date Created: 10/15/17
    Last Updated: 10/20/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const userids = require(`../files/userids.json`);
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);

// Command Variables
const command = {
    bigDescription: ("This command toggles the config.debug flag which determins if stuff are logged to the command prompt or not.\n"
        + "Returns:\n\t"
        + "This command returns nothing."),
    description: "Toggle the config.debug flag.",
    enabled: "null",
    fullName: "Debug",
    name: "debug",
    permissionLevel: "owner"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
module.exports.run = async (bot, message) => {
    //Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Owner ID Check
    if (message.author.id !== userids.ownerID) { // If Not Owner ID...
        return debug(`Attempted use of ${command.fullName} by ${message.author.username}.`);
    }

    // Switch the Debug Value
    config.debug = !config.debug;
    await message.react(config.success);
    return debug(`Setting debug value to: ${config.debug}.`);
}

module.exports.help = command;
