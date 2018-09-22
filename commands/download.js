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
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`)
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables

// Misc Variables
const name = "Download";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.download) {
        return disabledCommand.run(name, message);
    }

    // Build Reply
    let reply = (`To download the latest version of Chrono X, check the following link: \n`
        + `http://www.mmbnchronox.com/game.php`);

    return message.channel.send(reply);
}

module.exports.help = {
    name: "download",
    description: "Gives you the download link!",
    permissionLevel: "normal"
}