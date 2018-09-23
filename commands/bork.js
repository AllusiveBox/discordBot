/*
    Command Name: bork.js
    Function: The bot borks back
    Clearance: none
  	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/22/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const userids = require(`../files/userids.json`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const log = require(`../functions/log.js`);

// Command Variables
const command = {
    bigDescription: ("If you bork at the bot, I wonder what will happen?\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    borkMaster: false,
    description: "Sometimes you bork at the bot, and sometimes the bot borks back...",
    enabled: true,
    fullName: "Bork",
    name: "bork",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand.run(command.fullName, message);
    }

    // Ensure Borkmaster is reset
    command.borkMaster = false;

    // Check if Member is in User ID List
    Object.keys(userids).forEach(function (key) {
        if (userids[key] === message.author.id) { // If Member is in User ID List...
            // return message.channel.send(`Bork to you too, young master.`);
            return command.borkMaster = true;
        }
    });

    if (command.borkMaster) {
        return message.channel.send(`Bork to you too, young master.`);
    } else {
        return message.channel.send(`What did you just say to me, ${message.author}`
            + `? I'll have you know that I graduated at the top of my class in the `
            + `${bot.user.username} accademy. You better watch yourself, kiddo.`);
    }
}

module.exports.help = command;