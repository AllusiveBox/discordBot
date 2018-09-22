/*
    Command Name: leave.js
    Function: leaves a voice channel
    Clearance: none
	Default Enabled: Yes
    Date Created: 09/03/18
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
const name = "Leave";


//todo: figure out who should have permission to use the command

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 */
module.exports.run = async (bot, message) => {
    //debug to console
    log.debug(`I am inside the ${name} command.`);
    if (dmCheck.run(message, name)) {
        return;
    }
    if (!enabled.music) {
        return disabledCommand.run(name, message);
    }

    music.leave(bot, message).catch(error => {
        log.error(error);
    });

}

module.exports.help = {
    name: "leave",
    description: ("leaves a voice channel"),
    permissionLevel: "normal"
}