/*
    Command Name: help.js
    Function: Sends a list of Commands to the User
    Clearance: none
	Default Enabled: Cannot be Disabled
    Date Created: 10/15/17
    Last Updated: 10/07/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const userIDs = require(`../files/userids.json`);
const { run: disabledDMs } = require(`../functions/disabledDMs.js`);
const { run: hasElevatedPermissions } = require(`../functions/hasElevatedPermissions.js`);
const { debug, error: errorLog } = require(`../functions/log.js`);

// Command Variables
const command = {
    bigDescription: ("You're a special kind of stupid, aren't you?"),
    description: "This command.",
    enabled: null,
    fullName: "Help",
    name: "help",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Check if User is a Mod
    let isMod = await hasElevatedPermissions(bot, message, false, sql, true);

    // Check if User is Admin
    let isAdmin = await hasElevatedPermissions(bot, message, true, sql, true);

    // Check if User is Owner
    let isOwner = message.author.id === userIDs.ownerID ? true : false;

    if (args[0]) {
        let command = bot.commands.get(args[0].toLowerCase());

        // Test if Command Exists
        if (command === undefined) {
            debug(`Unable to locate command, ${args[0]}.`);
            let reply = `I am unable to locate command: ${args[0]}.`;
            return message.author.send(reply).catch(error => {
                disabledDMs(message, reply);
            });
        }

        if ((command.help.permissionLevel === "mod") && !(isMod || isAdmin || isOwner))
            return debug(`Not including ${command.help.name}`);
        if ((command.help.permissionLevel === "admin") && !(isAdmin || isOwner))
            return debug(`Not including ${command.help.name}`);
        if ((command.help.permissionLevel === "owner") && !isOwner)
            return debug(`Not including ${command.help.name}`);

        debug(`Generating help message for ${message.author.username} for the ${args[0]} command.`);

        return message.author.send(command.help.bigDescription).catch(error => {
            disabledDMs(message, `I am sorry, ${message.author}, I am unable to DM you.\n`
                + `Please check your privacy settings and try again.`)
        });
    }

    let reply = "**__A list of My Commands__**\n\n";

    bot.commands.forEach(function (command) {
        // Don't Print Disabled Commands
        if (command.help.enabled == false) return;
        // Permission Checks
        if ((command.help.permissionLevel === "mod") && !(isMod || isAdmin || isOwner))
            return debug(`Not including ${command.help.name}`);
        if ((command.help.permissionLevel === "admin") && !(isAdmin || isOwner))
            return debug(`Not including ${command.help.name}`);
        if ((command.help.permissionLevel === "owner") && !isOwner)
            return debug(`Not including ${command.help.name}`);

        let nextCommand = (`**${command.help.name}:\n\t**`
            + `${command.help.description}\n`);

        if (reply.length + nextCommand.length < 2000) { // Reply is Under Character Limit...
            reply = (`${reply}${nextCommand}`);
        } else { // Reply is Near Character Limit...
            message.author.send(reply).catch(error => {
                return disabledDMs(message, `I am sorry, ${message.author}, I am unable to DM you.\n`
                    + `Please check your privacy settings and try again.`);
            });
            reply = nextCommand;
        }
    });

    message.author.send(reply).catch(error => {
        return disabledDMs(message, `I am sorry, ${message.author}, I am unable to DM you.\n`
            + `Please check your privacy settings and try again.`);
    });
}

module.exports.help = command;

