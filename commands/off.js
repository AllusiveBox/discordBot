/*
    Command Name: off.js
    Function: Make the Bot stop Accepting Commands
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/27/17
    Last Updated: 09/09/18
    Last Updated By: Allusive Box

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const userids = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

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
    debug.log(`I am inside the ${name} command.`);

    if (!config.isOn) return; // Ignore if the Bot is Already Rejecting Commands

    // Check if User is in the User ID List
    let validUser = false;
    Object.keys(userids).forEach(function (key) {
        if (userids[key] === message.author.id) { // If Member is in the User ID List...
            return validUser = true;
        }
    });

    if (validUser) {
        debug.log(`${message.author.username} is switching the bot to 'off' state.`);
        bot.user.setStatus("invisible").catch(error => {
            errorLog.log(error);
            return message.author.send(`An unexpected error prevented me from updating my status...Please try again in a few minutes.`);
        });
        config.isOn = false;
        // Build the Reply
        let reply = `Bot Status has been set to Invisible and the isOn flag has been disabled.`
        message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    }
}

module.exports.help = {
    name: "off",
    description: "Turns the Bot's status to invisible and sets the isOn flag to false"
}