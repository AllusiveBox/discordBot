/*
    Command Name: about.js
    Function: Give Bot Information
    Clearance: none
    Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/17/18
    Last Update By: AllusiveBox

*/

// Load in Require Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const disabledDMs = require(`../functions/disabledDMs`);

// Command Variables
const command = {
    bigDescription: ("Returns information about me!\n"
        + "Returns:\n\t"
        + config.returnsDM),
    description: ("Returns informaton about the bot."),
    enabled: true,
    fullName: "About",
    name: "about",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
module.exports.run = async (bot, message) => {
    // Debug to Console
    debug.log(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand.run(command.fullName, message);
    }

    // Return About Text
    debug.log(`Generating About Message for ${message.author.username}`);
    let reply = (`Hello, my name is ${bot.user.username}! I was created by `
        + `${config.about.author}!\n\n`
        + `I am version: **${config.about.verNum}**.\n\n`
        + `I was last updated on: **${config.about.lastUpdated}**.`);

    // Send the Message
    return message.author.send(reply).catch(error => {
        disabledDMs.run(message, reply);
    });
}

module.exports.help = command;
