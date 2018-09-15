/*
    Command Name: joindate.js
    Function: Returns the Date the Member Joined the Server
    Clearance: none
	Default Enabled: Cannot be Disabled
    Date Created: 04/24/18
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox
*/

// Load in Required Files
const Discord = require(`discord.js`);
const debug = require(`../functions/debug.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const dmCheck = require(`../functions/dmCheck.js`);

// Command Stuff

// Misc Variables
const name = "Join Date";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug.log(`I am in the ${name} command.`);

    // DM Check
    if (await dmCheck.run(message, name)) return; // Return on DM channel

    // Build the Reply
    let reply = (`You joined the server on: **${message.member.joinedAt}**.`);

    return message.author.send(reply).catch(error => {
        disabledDMs.run(message, reply);
    });
}

module.exports.help = {
    name: "joindate",
    description: "Returns the Date the User Joined the Server",
    permissionLevel: "normal"
}