/*
    Command Name: !ping
    Function: Returns ping so that users can tell if the bot is accepting commands currently.
    Clearance: none
    Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 10/03/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);

// Command Variables
const command = {
    bigDescription: ("Bot Replies \"Pong!\" Useful if you want to see if the bot is "
        + "active and accepting commands."),
    description: "Bot Replies \"Pong!\".",
    enabled: true,
    fullName: "Ping",
    name: "Ping",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    debug(`I am in the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    return message.channel.send("pong!");
}

module.exports.help = command;
