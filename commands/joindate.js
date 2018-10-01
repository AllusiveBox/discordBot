/*
    Command Name: joindate.js
    Function: Returns the Date the Member Joined the Server
    Clearance: none
	Default Enabled: Cannot be Disabled
    Date Created: 04/24/18
    Last Updated: 10/01/18
    Last Updated By: Th3_M4j0r
*/

// Load in Required Files
const Discord = require(`discord.js`);
const { debug } = require(`../functions/log.js`);
const { run: disabledDMs } = require(`../functions/disabledDMs.js`);
const { run: dmCheck } = require(`../functions/dmCheck.js`);

// Command Stuff
const command = {
    bigDescription: ("Returns when the user had joined the server"),
    description: "Returns user's join date",
    enabled: null,
    fullName: "Join Date",
    name: "joindate",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug(`I am in the ${command.fullName} command.`);

    // DM Check
    if (await dmCheck(message, name)) return; // Return on DM channel

    // Build the Reply
    let reply = (`You joined the server on: **${message.member.joinedAt}**.`);

    return message.author.send(reply).catch(error => {
        disabledDMs(message, reply);
    });
}

module.exports.help = command;