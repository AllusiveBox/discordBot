/*
    Command Name: bork.js
    Function: The bot borks back
    Clearance: none
  	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const enabled = require(`../files/enabled.json`);
const userids = require(`../files/userids.json`);
const log = require(`../functions/log.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
;

// Command Variables
var borkMaster = false;

// Misc. Variables
const name = "Bork";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    log.debug(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.bork) {
        return disabledCommand.run(name, message);
    }

    // Check if Member is in User ID List
    Object.keys(userids).forEach(function (key) {
        if (userids[key] === message.author.id) { // If Member is in User ID List...
            // return message.channel.send(`Bork to you too, young master.`);
            return borkMaster = true;
        }
    });

    if (borkMaster) {
        return message.channel.send(`Bork to you too, young master.`);
    } else {
        return message.channel.send(`What did you just say to me, ${message.author}`
            + `? I'll have you know that I graduated at the top of my class in the `
            + `${bot.user.username} accademy. You better watch yourself, kiddo.`);
    }
}

module.exports.help = {
    name: "bork",
    description: ("Sometimes you bork at the bot, and sometimes the bot borks "
        + "back..."),
    permissionLevel: "normal"
}
