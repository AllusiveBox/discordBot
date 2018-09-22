/*
    Command Name: on.js
    Function: Allows the Owner and Temp Owner to turn on the Bot
    Clearance: Owner and Temp Owner Only.
	Default Enabled: Yes
    Date Created: 11/10/17
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const userids = require(`../files/userids.json`);
const log = require(`../functions/log.js`);
;

// Command Stuff

// Misc Variables
const name = "off";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${name} command.`);

    if (config.isOn) return; // Ignore if the Bot is Already Accepting Commands

    // Check if User is in the User ID List
    let validUser = false;
    Object.keys(userids).forEach(function (key) {
        if (userids[key] === message.author.id) { // If Member is in the User ID List...
            return validUser = true;
        }
    });

    if (validUser) {
        log.debug(`${message.author.username} is switching the bot to 'on' state.`);
        bot.user.setStatus("online").catch(error => {
            log.error(error);
            return message.author.send(`An unexpected error prevented me from updating my status...Please try again in a few minutes.`);
        });
        config.isOn = true;
        // Build the Reply
        let reply = `Bot Status has been set to Online and the isOn flag has been enabled.`
        message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    }
}

module.exports.help = {
    name: "on",
    description: "Turns the Bot's status to invisible and sets the isOn flag to true",
    permissionLevel: "admin"
}