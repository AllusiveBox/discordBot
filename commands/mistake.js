/*
    Command Name:
    Function: 
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/13/18
    Last Updated: 10/13/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const userids = require(`../files/userids.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);

// Command Variables
const command = {
    bigDescription: ("This command informs you of what the mistake was."
        + "Returns\n\t"
        + config.returnsChannel),
    description: "Oh, mistakes were made...",
    enabled: true, // true/false
    fullName: "Mistake",
    name: "mistake",
    permissionLevel: "owner"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    if ((message.author.id === userids.maxID) || (message.author.id === userids.ownerID)) {
        return message.channel.send({ file: "./img/mistake.png" }).catch(error => {
            errorLog(error);
            return message.channel.send(error.toString());
        });
    }
}

module.exports.help = command;