/*
    Command Name:staff.js
    Function: Returns a link to our Staff Page
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/17/17
    Last Updated: 09/16/18
    Last Updated By: AllusiveBox 

*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables
const command = {
    bigDescription: ("Provides a link to the staff page.\n"
        + "This command will generate a reply in the channel it was used in."),
    description: "Returns a link to the staff page.",
    enabled: enabled.staff,
    name: "staff",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug.log(`I am inside the ${command.name} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand.run(command.name, message);
    }

    let reply = ("To find out more about our team, clink the following link:\n"
        + "<http://www.mmbnchronox.com/thestaff.php>");

    return message.channel.send(reply);
}

module.exports.help = command;