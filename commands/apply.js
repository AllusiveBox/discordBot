/*
    Command Name: apply.js (previously join.js)
    Function: Returns instructions on how to Join the Team
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/22/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const log = require(`../functions/log.js`);

// Command Stuff
const command = {
    bigDescription: ("This command will inform the user on how to join the MegaMan Battle Network Chrono X Development Team.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Instructions on how to join the dev team.",
    enabled: true,
    fullName: "Apply",
    name: "apply",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async(bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!enabled.apply) {
        return disabledCommand.run(command.fullName, message);
    }

    // Build Reply
    let reply = ("Currently we are only looking for sprite and pixel artist.\n"
        + "If you are interested, or know someone who might be, please contact us with work samples at the following e-mail:\n"
        + "**cxdevteam@gmail.com**");

    return message.channel.send(reply);
}

module.exports.help = command;