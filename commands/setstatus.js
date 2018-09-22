/*
    Command Name: setstatus.js
    Function: Changes the Bot's Status
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/27/17
    Last Updated: 09/16/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const log = require(`../functions/log.js`);
const disabledDMs = require(`../functions/disabledCommand.js`);
;
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);

// Command Variables
const adminOnly = true;
const command = {
    bigDescription: ("This command is used to update the bot's status (what the bot is currently 'streaming').\n"
        + "Required arguments: {string} -> The string of text you want to change the bot's status to.\n"
        + "This command will generate a reply back to the user informing them of the successful change or not."),
    description: "Changes the bot's status.",
    enabled: null,
    name: "setstatus",
    permissionLevel: "admin"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {string} [newStatus]
 * @param {"PLAYING" | "STREAMING"| "LISTENING" | "WATCHING"} [method]
 * @returns {boolean}
 */

function updateStatus(bot, newStatus = config.defaultStatus, method = "PLAYING", url = null) {
    if ((method !== "PLAYING") && (method !== "STREAMING") && (method !== "LISTENING") && (method !== "WATCHING")) {
        let unsupportedMethodType = (`Unsupported MethodType: Unsupported MethodType: ${method} was passed.\n`
            + "Supported MethodTypes are 'PLAYING', 'STREAMING', 'LISTENING', and 'WATCHING'.")
        log.error(unsupportedMethodType);
        return false;
    }

    bot.user.setActivity(newStatus, {url: url, type: method }).then(presence => {
        log.debug(`Status updated to: ${newStatus}`);
    }).catch(error => {
        log.error(error);
        return false;
        });

    return true;
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */

module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    log.debug(`I am inside the ${command.name} command.`);

    if (! await hasElevatedPermissions.run(bot, message, adminOnly, sql)) return;

    // Join the additional arguments into the status
    let status = args.join(" ");

    let success = updateStatus(bot, status);

    if (success) {
        let reply = `Status was successfully updated.`;
        return message.author.send(reply).catch(error => {
            disabledDMs.run(command.name, message);
        });
    } else {
        let reply = (`I am sorry, ${message.author}, something went wrong and I was unable to update the status.\n`
            + `Please wait a few seconds and then try again.`);
        return message.author.send(reply).catch(error => {
            disabledDMs.run(command.name, message);
        });
    }
}

module.exports.help = command;
module.exports.updateStatus = updateStatus;