/*
    Command Name: play.js
    Function: plays a song if in a voice channel
    Clearance: none
	Default Enabled: Yes
    Date Created: 09/06/18
    Last Updated: 10/06/18
    Last Update By: Th3_M4j0r

*/

//load in required files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);
const { run: dmCheck } = require(`../functions/dmCheck.js`);
const music = require(`../functions/music.js`);

//misc variables
const command = {
    bigDescription: ("Plays music the same voice channel as the user. "
        + "User must be in a voice channel\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Play a song in the voice channel",
    enabled: true,
    fullName: "Play",
    name: "play",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    //debug to console
    debug(`I am inside the ${commnad.fullName} command.`);
    if (dmCheck(message, command.name)) {
        return;
    }

    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    let arg = args.join(" ");
    music.play(bot, message, arg).catch(error => {
        errorLog(error);
    });

}

module.exports.help = command;