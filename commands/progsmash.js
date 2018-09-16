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
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const errorLog = require(`../functions/errorLog.js`);

// Command Variables

// Misc. Variables
const name = "Prog Smash";

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.progsmash) {
        disabledCommand.run(name, message);
    }

    return message.channel.send({ file: "./img/magicslam.gif" }).catch(error => {
        errorLog.log(error);
        message.channel.send(`Unexpected error caused by ${message.author} when using the ${name} command.`);
    });
}

module.exports.help = {
    name: "progsmash",
    description: "PROG ANGER. PROG SMASH!",
    permissionLevel: "normal"
}