/*
    Command Name: created.js
    Function: Returns the Date your Account was Created
    Clearance: none
    Default Enabled: Cannot be disabled.
    Date Created: 05/23/18
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Reqired Files
const Discord = require(`discord.js`);
const log = require(`../functions/log.js`);
;

// Command Variables

// Misc. Variables
const name = "Created";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    log.debug(`I am inside the ${name} command.`);

    let createdOn = await new Date((message.author.id / 4194304) + 1420070040000);

    return message.channel.send(`Account created on: **${createdOn}**`)
        .catch(error => {
            log.error(error);
        });
}

module.exports.help = {
    name: "created",
    description: ("Returns the date your acount was created."),
    permissionLevel: "normal"
}
