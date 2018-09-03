/**

    cxBot.js Mr. Prog music script
    Version: 1
    Author: Th3_M4j0r
    Date Started: 09/02/18
    Date Last Updated: 09/03/18
    Last Update By: Th3_M4j0r

**/

const Discord = require(`discord.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const debug = requrie(`../functions/debug.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);

/**
 * 
 * function for joining a voice channel,
 * assumes caller checks for if the user has permission to use.
 *
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 * @returns {Promise<boolean>} was the join successful or not
 */
module.exports.join = async (bot, message) => {
    debug.log(`I am inside the music.join function`);
    if (!message.member.voiceChannel) {
        message.channel.send("I'm sorry, you must be in a voice channel to use this command");
        return false;
    }
    if (message.guild.voiceConnection) {
        message.channel.send("I'm sorry, I'm already in a voice channel");
        return false;
    }
    if (message.member.voiceChannel.joinable) {
        await message.member.voiceChannel.join();
        message.channel.send("Connected");
        debug.log(`I have joined the voice channel: ${message.guild.voiceConnection.channel.name}`);
        return true;
    } else {
        message.channel.send("I'm sorry I cannot join that voice channel");
        return false;
    }
}

/**
 * 
 * function for leaving a voice channel,
 * assumes caller checks for if the user has permission to use.
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message
 * @returns {Promise<boolean>} was a voice channel left or not? 
 */
module.exports.leave = async (bot, message) => {
    debug.log(`I am inside the music.leave function`);
    if (!message.guild.voiceConnection) {
        message.channel.send("I'm not in a voice channel");
        return false;
    }

    //user must be in the same channel as the bot, unless they are a mod
    if(message.member.voiceChannel.id !== message.guild.voiceConnection.channel.name) {
        if(! await hasElevatedPermissions.run(bot, message, false, null)) return false;
    }
    debug.log(`I have left the voice channel: ${message.guild.voiceConnection.channel.name}`);
    message.guild.voiceConnection.channel.leave();
    return true;
}