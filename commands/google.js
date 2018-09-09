/*
    Command Name: google.js
    Function: Just google it, Lan...
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/15/18
    Last Updated: 09/01/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const errorLog = require(`../functions/errorLog.js`); 

// Command Variables

// Misc Variables
const name = "Google";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.google) {
        return disabledCommand.run(name, message);
    }

    // DM Check
    if (await (!dmCheck.check(message, name))) {
        message.delete().catch(error => {
            errorLog.log(`Unable to purge command by ${message.author.username}.`);
        });
    } 

    return message.channel.send({ file: "./img/google.png" });
}

module.exports.help = {
    name: "google",
    description: ("Just google it, Lan...")
}