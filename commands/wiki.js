/*
    Command Name: wiki.js
    Function: Returns a link to the Wiki
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/25/17
    Last Updated: 09/16/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables
const command = {
    bigDescription: ("Provides a link to the wiki site.\n"
        + "This command will generate a reply in the channel it was used in."),
    description: "Returns a link to the wiki site.",
    enabled: enabled.wiki,
    name: "wiki",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${command.name} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand.run(command.name, message);
    }

    let reply = (`The official Chrono X Wiki can be found with the following link:\n`
        + `<http://mmbnchronox.wikia.com/wiki/MMBN_Chrono_X_Wiki>`);

    return message.channel.send(reply);
}

module.exports.help = command;