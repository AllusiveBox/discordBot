/*
    Command Name: download.js (previously play.js)
    Function: Returns a link to download the demo
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/17/17
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`)
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`)
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables
const command = {
    bigDescription: ("This command provides a link to download the latest demo of MegaMan Battle Network Chrono X.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Gives you the download link!",
    enabled: true,
    fullName: "Download",
    name: "download",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!enabled.download) {
        return disabledCommand.run(command.fullName, message);
    }

    // Build Reply
    let reply = (`To download the latest version of Chrono X, check the following link: \n`
        + `http://www.mmbnchronox.com/game.php`);

    return message.channel.send(reply);
}

module.exports.help = command;