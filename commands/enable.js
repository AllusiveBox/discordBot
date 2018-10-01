/*
    Command Name: disable.js
    Function: To disable a command
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/17/17
    Last Updated: 09/30/18
    Last Update By: Th3_M4j0r

*/

// Load in Require Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: hasElevatedPermissions } = require(`../functions/hasElevatedPermissions.js`);

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
    debug(`I am inside the ${command.fullName} command.`);

    if (args[0] === undefined) return debug(`No arguments passed.`)

    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql)) return;
    let toEnable = args[0].toLocaleLowerCase();
    if(! toEnable) { //no argument passed
        return debug(`No arguments passed`);
    }
    try {
        var enabled = bot.commands.get(toEnable).help.enabled;
    } catch (error) {
        return errorLog(error);
    }
    if (enabled === null) return debug(`This command cannot be disabled.`);
    debug(`Setting ${toEnable} to true.`);
    return bot.commands.get(toEnable).help.enabled = true;
}

module.exports.help = command;
