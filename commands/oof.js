/*
    Command Name: oof.js
    Function: Returns an oof
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/15/18
    Last Updated: 09/09/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

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
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.oof) {
        return disabledCommand.run(name, message);
    }

    return message.channel.send({ file: "./img/oof.png" }).catch(error => {
        errorLog.log(error);
        message.channel.send(`Unexpected error caused by ${message.author} when using the ${name} command.`);
    });
}

module.exports.help = {
    name: "oof",
    description: "Returns an oof"
}