/*
    Command Name: oof.js
    Function: Returns an oof
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/15/18
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`);
;

// Command Stuff

// Misc. Variables
const name = "Oof";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.oof) {
        return disabledCommand.run(name, message);
    }

    return message.channel.send({ file: "./img/oof.png" }).catch(error => {
        log.error(error);
        message.channel.send(`Unexpected error caused by ${message.author} when using the ${name} command.`);
    });
}

module.exports.help = {
    name: "oof",
    description: "Returns an oof",
    permissionLevel: "normal"
}