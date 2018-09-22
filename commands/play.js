/*
    Command Name: play.js
    Function: plays a song if in a voice channel
    Clearance: none
	Default Enabled: Yes
    Date Created: 09/06/18
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

//load in required files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`);
;
const disabledCommand = require(`../functions/disabledCommand.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const music = require(`../functions/music.js`);

//misc variables
const name = "Play";

//todo: figure out who should have permission to use this command

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    //debug to console
    log.debug(`I am inside the ${name} command.`);
    if (dmCheck.run(message, name)) {
        return;
    }
    if (!enabled.music) {
        return disabledCommand.run(name, message);
    }
    let arg = args.join(" ");
    music.play(bot, message, arg).catch(error => {
        log.error(error);
    });

}

module.exports.help = {
    name: "Play",
    description: ("Plays a song in a voice channel"),
    permissionLevel: "normal"
}