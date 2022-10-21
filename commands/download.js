/*
    Command Name: download.js (previously play.js)
    Function: Returns a link to download the demo
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/17/17
    Last Updated: 09/30/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`)
const { debug } = require(`../functions/log.js`)
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);

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
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.fullName, message);
    }

    // Build Reply
    let reply = (`To download the latest version of Chrono X, check the following link: \n`
        + `https://mega.nz/#!yjwA3BBa!sqcwpcRdrUzB9e97A7vyAG9QObY2R6jEI3afEiossIk`);

    return message.channel.send(reply);
}

module.exports.help = command;
