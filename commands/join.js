/*
    Command Name: join.js
    Function: joins a voice channel
    Clearance: none
	Default Enabled: Yes
    Date Created: 09/03/18
    Last Updated: 09/03/18
    Last Update By: Th3_M4j0r

*/

//load in required files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const music = require(`../functions/music.js`);

//misc variables
const name = "Join";

//todo: figure out who should have permission to use this command

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 */
modules.exports.run = async (bot, message) => {
    //debug to console
    debug.log(`I am inside the ${name} command.`);
    if (dmCheck.run(message, name)) {
        return;
    }
    if (!enabled.music) {
        return disabledCommand.run(name, message);
    }

    music.join(bot, message);

}

module.exports.help = {
    name: "join",
    description: ("Joins a voice channel")
}