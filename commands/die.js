/*
    Command Name: die.js
    Function: Set bot status to invisible and stops accepting commands
    Clearance: Owner Only.
	Default Enabled: Cannot be Disabled
    Date Created: 10/27/17
    Last Updated: 09/22/18
    Last Update By: AllusiveBox

*/

// Load in Require Files
const Discord = require(`discord.js`);
const userids = require(`../files/userids.json`);
const log = require(`../functions/log.js`);

// Command Variables
const command = {
    bigDescription: ("This command turns the bot's status to invisible, and terminates the process with code 88, which will prevent the batch stript from restarting.\n"
        + "Returns:\n\t"
        + "This command returns nothing."),
    description: "Set bot's status to invisible and then terminates script.",
    enabled: null,
    fullName: "Die",
    name: "die",
    permissionLevel: "owner"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {sqlite} sql
 */
module.exports.run = (bot, message, args, sql) => {
    // Debug to Console
    log.debug(`I am inside the ${command.fullName} command.`);

    // Owner ID Check
    if (message.author.id !== userids.ownerID) { // If Not Owner...
        return log.debug(`Attempted use of ${command.fullName} by ${message.author.username}.`);
    } else {
        log.debug(`Terminating Bot. Goodbye.`);
        // Set Bot Status to Invisible, in Case Bot Doesn't Disconnect Right Away.
        bot.user.setStatus("invisible");

        // Cleanly Close the SQL Database
        sql.close();

        // Exit the Process, and Return an Error Code that Will Prevent Scripts from
        // Restarting, should they be set to automatically reboot the bot if it
        // Terminates. In this case, I Chose Error Code 88, but it could be anything
        return process.exit(88);
    }
}

module.exports.help = command;
