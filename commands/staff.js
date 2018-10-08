/*
    Command Name:staff.js
    Function: Returns a link to our Staff Page
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/17/17
    Last Updated: 10/06/18
    Last Updated By: Th3_M4j0r 

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);

// Command Variables
const command = {
    bigDescription: ("Provides a link to the staff page.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Returns a link to the staff page.",
    enabled: true,
    fullName: "Staff",
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
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    let reply = ("To find out more about our team, clink the following link:\n"
        + "<http://www.mmbnchronox.com/thestaff.php>");

    return message.channel.send(reply);
}

module.exports.help = command;