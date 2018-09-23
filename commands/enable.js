/*
    Command Name: disable.js
    Function: To disable a command
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/17/17
    Last Updated: 09/22/18
    Last Update By: AllusiveBox

*/

// Load in Require Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);

// Command Variables
const command = {
    adminOnly: true,
    bigDescription: ("This command allows an administrator to enable a command that is disabled.\n"
        + "Returns:\n\t"
        + "This command returns nothing."),
    description: "Enables a command.",
    enabled: null,
    fullName: "Enable",
    name: "enable",
    permissionLevel: "admin"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {sqlite} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    log.debug(`I am inside the ${command.fullName} command.`);

    if (args[0] === undefined) return log.debug(`No arguments passed.`)

    if (! await hasElevatedPermissions.run(bot, message, command.adminOnly, sql)) return;
    let toEnable = args[0].toLocaleLowerCase();
    if(! toEnable) { //no argument passed
        return log.debug(`No arguments passed`);
    }
    try {
        var enabled = bot.commands.get(toEnable).help.enabled;
    } catch (error) {
        return log.error(error);
    }
    if (enabled === null) return log.debug(`This command cannot be disabled.`);
    log.debug(`Setting ${toEnable} to true.`);
    return bot.commands.get(toEnable).help.enabled = true;
}

module.exports.help = command;
