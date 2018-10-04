/*
    Command Name: n1.js
    Function: Provides a link to the N1GP server
    Clearance: none
	Default Enabled: Yes
    Date Created: 05/19/18
    Last Updated: 10/02/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug } = require(`../functions/log.js`);
const { run: disabledDMs } = require(`../functions/disabledDMs.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand`);

// Command Stuff
inviteLink = config.n1gpLink;

const command = {
    bigDescription: ("Provides a link to the N1GP server."),
    description: "Sends a link to N1GP",
    enabled: true,
    fullName: "N1GP",
    name: "n1",
    permissionLevel: "normal"
}



/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
module.exports.run = async (bot, message) => {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    return message.author.send(inviteLink).catch(error => {
        disabledDMs(message, inviteLink);
    });
}

module.exports.help = command;