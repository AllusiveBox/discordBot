/*
    Command Name: pong.js
    Function: Test if Bot is Online
    Clearance: none
	Default Enabled: Yes
    Date Created: 04/23/18
    Last Updated: 10/03/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);]
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);


// Command Variables
const command = {
    bigDescription: ("Bot Replies \"gnip!\" Useful if you want to see if the bot is "
        + "active and accepting commands."),
    description: "Bot Replies \"gnip!\".",
    enabled: true,
    fullName: "Pong",
    name: "Pong",
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
        disabledCommand(command.name, message);
    }

    return message.channel.send("gnip!");
}

module.exports.help = command;