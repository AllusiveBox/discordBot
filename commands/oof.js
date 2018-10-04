/*
    Command Name: oof.js
    Function: Returns an oof
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/15/18
    Last Updated: 10/03/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);
const { debug, error: errorLog } = require(`../functions/log.js`);

// Command Stuff
const command = {
    bigDescription: ("Sends the Oof! picture"),
    description: "Returns an oof",
    enabled: true,
    fullName: "Oof!",
    name: "oof",
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

    return message.channel.send({ file: "./img/oof.png" }).catch(error => {
        errorLog(error);
        message.channel.send(`Unexpected error caused by ${message.author} when using the ${command.name} command.`);
    });
}

module.exports.help = command;