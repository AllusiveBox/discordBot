/*
    Command Name: join.js
    Function: joins a voice channel
    Clearance: none
	Default Enabled: enabled
    Date Created: 09/03/18
    Last Updated: 10/06/18
    Last Update By: Th3_M4j0r

*/

//load in required files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);
const { run: dmCheck } = require(`../functions/dmCheck.js`);
const music = require(`../functions/music.js`);

//misc variables
const command = {
    bigDescription: ("Joins the same voice channel as the user. " 
        + "User must be in a voice channel.\n"
        + "Returns:\n\t" + config.channelReply),
    description: "Join a voice channel",
    enabled: null, //uses the "play" command being enabled to check if it is enabled 
    fullName: "Join",
    name: "join",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 */
module.exports.run = async (bot, message) => {
    //debug to console
    debug(`I am inside the ${command.fullName} command.`);
    if (dmCheck(message, command.fullName)) {
        return;
    }

    if (bot.commands.get("play").help.enabled === false) {
        return disabledCommand(command.name, message);
    }

    music.join(bot, message);

}

module.exports.help = command;