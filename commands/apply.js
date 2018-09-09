/*
    Command Name: apply.js (previously join.js)
    Function: Returns instructions on how to Join the Team
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/08/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Stuff

// Misc. Variables
const name = "Apply";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */

module.exports.run = async(bot, message, args) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.apply) {
        return disabledCommand.run(name, message);
    }

    // Build Reply
    let reply = ("Currently we are only looking for sprite and pixel artist.\n"
        + "If you are interested, or know someone who might be, please contact us with work samples at the following e-mail:\n"
        + "**cxdevteam@gmail.com**");

    return message.channel.send(reply);
}

module.exports.help = {
    name: "apply",
    description: "Instructions on how to apply to the team"
}