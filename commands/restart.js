/*
    Command Name: restart.js
    Function: Restarts the Bot
    Clearance: Owner Only
	Default Enabled: Cannot be Disabled
    Date Created: 07/18/18
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Require Files
const Discord = require(`discord.js`);
const userids = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);

// Command Variables

// Misc. Variables
const name = "Restart";

/**
 *  
 * @param {Discord.Client} bot
 * @param {Discord.message} message
 * @param {string[]} args
 * @param {sqlite} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    let inUserList = false;

    // Check if Member is in User ID List
    Object.keys(userids).forEach(function (key) {
        if (userids[key] === message.author.id) { // If Member is in the User ID List...
            return inUserList = true;
        }
    });

    if (inUserList) { // If Member is In the User ID List...
        debug.log(`Shutting Down...`);
        sql.close();
        debug.log(`Database conection closed.`);
        debug.log(`Alerting Owner...`);
        message.author.send(`Restarting Now...`);
        setTimeout(() => {
            process.exit(0);
        }, 500)
    }
}

module.exports.help = {
    name: "restart",
    description: ("Restarts the bot to allow any changes to take place."),
    permissionLevel: "owner"
}
