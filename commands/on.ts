/*
    Command Name: on.js
    Function: Allows the Owner and Temp Owner to turn on the Bot
    Clearance: Owner and Temp Owner Only.
	Default Enabled: Yes
    Date Created: 11/10/17
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';


import config = require('../files/config.json');
import userids = require('../files/userids.json');

// Command Stuff
const command : commandHelp = {
    bigDescription: ("Turns the Bot's status to online and sets the isOn flag to true.\n"
        + "Returns:\n\t"
        + "This command returns nothing"),
    description: "Sets the bot to online, responds to commands again",
    enabled: null,
    fullName: "On",
    name: "on",
    permissionLevel: "owner"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

export async function run(bot: Discord.Client, message: Discord.Message) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    if (config.isOn) return; // Ignore if the Bot is Already Accepting Commands

    // Check if User is in the User ID List
    let validUser = false;
    Object.keys(userids).forEach(function (key) {
        if (userids[key] === message.author.id) { // If Member is in the User ID List...
            return validUser = true;
        }
    });

    if (validUser) {
        debug(`${message.author.username} is switching the bot to 'on' state.`);
        bot.user.setStatus("online").catch(error => {
            errorLog(error);
            return message.author.send(`An unexpected error prevented me from updating my status...`
                + `Please try again in a few minutes.`);
        });
        config.isOn = true;
        // Build the Reply
        let reply = `Bot Status has been set to Online and the isOn flag has been enabled.`;
        message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    }
}

export const help = command;