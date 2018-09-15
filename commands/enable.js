/*
    Command Name: disable.js
    Function: To disable a command
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 10/17/17
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Require Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);

// Command Variables

// Misc. Variables
const name = "Enable";
const adminOnly = true;

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {sqlite} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    if (! await hasElevatedPermissions.run(bot, message, adminOnly, sql)) return;
    let toEnable = args[0].toLocaleLowerCase();
    if(! toEnable) { //no argument passed
        return debug.log(`No arguments passed`);
    }
    let isDefined = eval("enabled." + toEnable);
    if(isDefined === undefined) {
        return debug.log(`${toEnable} does not exist`);
    }
    debug.log(`Setting ${toEnable} to true.`);
    return eval("enabled " + toEnable + "= true");
}

module.exports.help = {
    name: "enable",
    description: ("Enables a command."),
    permissionLevel: "admin"
}
