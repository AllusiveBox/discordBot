/*
    Command Name: decay.js
    Function: Returns Decay Server Link Ayeeee
    Clearance: none
  	Default Enabled: Yes
    Date Created: 06/02/18
    Last Updated: 09/30/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { run: disabledCommand } = require(`../functions/disabledCommand`);
const { debug } = require(`../functions/log.js`);

// Command Variables
const command = {
    bigDescription: ("This command brings forth a funny video showcasing the wrath of Decay.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Summons the wrath of Decay from the voice channel!",
    enabled: true,
    fullName: "Decay",
    name: "decay",
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
        return disabledCommand(command.fullName, message);
    }

    debug(`Generating Message for ${message.author.username}.\n`);
    return message.channel.send(`https://www.youtube.com/watch?v=-d9M_AZqu8U`);

}

module.exports.help = command;
