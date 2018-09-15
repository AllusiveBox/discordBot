/*
    Command Name: disable.js
    Function: To disable a command
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/19/17
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Require Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);

// Command Variables

// Misc. Variables
const name = "Disable";
const adminOnly = true;

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {sqlite} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    if (! await hasElevatedPermissions.run(bot, message, adminOnly, sql)) return;
    let toDisable = args[0].toLocaleLowerCase();
    if(! toDisable) { //no argument passed
        return debug.log(`No arguments passed`);
    }
    let isDefined = eval("enabled." + toDisable);
    if(isDefined === undefined) {
        return debug.log(`${toDisable} either does not exist, or cannot be disabled.`);
    }
    debug.log(`Setting ${toDisable} to false.`);
    return eval("enabled " + toDisable + "= false");
}

module.exports.help = {
    name: "disable",
    description: ("Disables a command."),
    permissionLevel: "admin"
}
