/*
    Command Name: !ping
    Function: Returns ping so that users can tell if the bot is accepting commands currently.
    Clearance: none
    Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 08/30/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables

// Misc. Variables
const name = "Ping";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    debug.log(`I am in the ${name} command.`);

    // Enabled Command Test
    if (!enabled.ping) {
        return disabledCommand.run(name, message);
    }

    return message.channel.send("pong!");
}

module.exports.help = {
    name: "ping",
    description: ("Bot Replies \"Pong!\" Useful if you want to see if the bot is "
        + "active and accepting commands.")

}
