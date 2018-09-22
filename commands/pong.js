/*
    Command Name: pong.js
    Function: Test if Bot is Online
    Clearance: none
	Default Enabled: Yes
    Date Created: 04/23/18
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
;

// Command Variables

// Misc. Variables
const name = "Pong"

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.pong) {
        disabledCommand.run(name, message);
    }

    return message.channel.send("gnip!");
}

module.exports.help = {
    name: "pong",
    description: "When you ping, you must be able to pong...",
    permissionLevel: "normal"
}