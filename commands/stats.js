/*
    Command Name: stats.js
    Function: Returns a User's Stats
    Clearance: none
	Default Enabled: Yes
    Date Created: 02/27/18
    Last Updated: 10/07/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);
const { debug, error: errorLog } = require(`../functions/log.js`);

// Command Variables
const command = {
    bigDescription: ("This command returns your profile stats!\n"
        + "Returns:\n\t"
        + config.returnsDM),
    description: "Returns your profile stats",
    enabled: true, // true/false
    fullName: "Stats",
    name: "stats",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message, sql) => {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.fullName, message);
    }

    let user = await sql.getUserRow(message.author.id);

    console.log(user);


}

module.exports.help = command;