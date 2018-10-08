/*
    Command Name: setstatus.js
    Function: Changes the Bot's Status
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/27/17
    Last Updated: 10/06/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: disabledDMs } = require(`../functions/disabledCommand.js`);
const { run: hasElevatedPermissions } = require(`../functions/hasElevatedPermissions.js`);
const validate = require(`../functions/validate.js`);

const command = {
    bigDescription: ("This command is used to update the bot's status (what the bot is currently 'streaming').\n"
        + "Required arguments: {string} -> The string of text you want to change the bot's status to.\n"
        + "Returns:\n\t"
        + config.returnsDM),
    description: "Changes the bot's status.",
    enabled: null,
    adminOnly: true,
    fullName: "Set Status",
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
    // Validate Method
    validate.methodType(method);

    bot.user.setActivity(newStatus, {url: url, type: method }).then(presence => {
        debug(`Status updated to: ${newStatus}`);
    }).catch(error => {
        errorLog(error);
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
    debug(`I am inside the ${command.fullName} command.`);

    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql)) return;

    // Join the additional arguments into the status
    let status = args.join(" ");

    let success = updateStatus(bot, status);

    if (success) {
        let reply = `Status was successfully updated.`;
        return message.author.send(reply).catch(error => {
            disabledDMs(command.name, message);
        });
    } else {
        let reply = (`I am sorry, ${message.author}, something went wrong and I was unable to update the status.\n`
            + `Please wait a few seconds and then try again.`);
        return message.author.send(reply).catch(error => {
            disabledDMs(command.name, message);
        });
    }
}

module.exports.help = command;
module.exports.updateStatus = updateStatus;