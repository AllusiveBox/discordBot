/*
    Command Name: leave.js
    Function: leaves a voice channel
    Clearance: none
	Default Enabled: cannot be disabled
    Date Created: 09/03/18
    Last Updated: 10/06/18
    Last Update By: Th3_M4j0r

*/

//load in required files
const Discord = require(`discord.js`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: dmCheck } = require(`../functions/dmCheck.js`);
const music = require(`../functions/music.js`);

//command variables
const command = {
    bigDescription: ("Leaves a voice channel. "
        + "User must be in the same voice channel, or a mod\n"
        + "Returns:\n\t" + config.returnsChannel),
    description: "Leave a voice channel",
    enabled: null,
    fullName: "Leave",
    name: "leave",
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
    

    music.leave(bot, message).catch(error => {
        errorLog(error);
    });

}

module.exports.help = command;