/*
    Command Name: progsmash.js
    Function: Returns Prog Smash
    Clearance: none
	Default Enabled: Yes
    Date Created: 04/01/18
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
;

// Command Variables

// Misc. Variables
const name = "Prog Smash";

module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.progsmash) {
        disabledCommand.run(name, message);
    }

    return message.channel.send({ file: "./img/magicslam.gif" }).catch(error => {
        log.error(error);
        message.channel.send(`Unexpected error caused by ${message.author} when using the ${name} command.`);
    });
}

module.exports.help = {
    name: "progsmash",
    description: "PROG ANGER. PROG SMASH!",
    permissionLevel: "normal"
}