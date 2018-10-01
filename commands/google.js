/*
    Command Name: google.js
    Function: Just google it, Lan...
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/15/18
    Last Updated: 09/30/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);
const { check: dmCheck } = require(`../functions/dmCheck.js`);

// Command Variables
const command = {
    bigDescription: ("Just google it, Lan..."),
    description: "Google it",
    enabled: true,
    fullName: "Google",
    name: "google",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    debug(`I am inside the ${command.name} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(name, message);
    }

    // DM Check
    if (await (!dmCheck(message, name))) {
        message.delete().catch(error => {
            errorLog(`Unable to purge command by ${message.author.username}.`);
        });
    } 

    return message.channel.send({ file: "./img/google.png" });
}

module.exports.help = command;