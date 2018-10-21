/*
    Command Name: created.js
    Function: Returns the Date your Account was Created
    Clearance: none
    Default Enabled: Cannot be disabled.
    Date Created: 05/23/18
    Last Updated: 10/20/18
    Last Update By: AllusiveBox

*/

// Load in Reqired Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);

// Command Variables
const command = {
    bigDescription: ("This command will return the date and time you created your discord account.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Find out when your account was made.",
    enabled: null,
    fullName: "Created",
    name: "created",
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

    let createdOn = await new Date((message.author.id / 4194304) + 1420070040000);

    return message.channel.send(`Account created on: **${createdOn}**`)
        .catch(error => {
            errorLog(error);
            return message.channel.send(`*${error.toString()}*`);
        });
}

module.exports.help = command;
