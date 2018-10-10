/*
    Command Name: join.js
    Function: joins a voice channel
    Clearance: none
	Default Enabled: enabled
    Date Created: 09/03/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

//load in required files
import * as Discord from 'discord.js';
import { debug, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { join } from '../functions/music.js';
import { commandBot } from '../classes/commandBot.js';


const config = require('../files/config.json');

//misc variables
const command : commandHelp = {
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
 * @param {commandBot} bot 
 * @param {Discord.Message} message 
 */
export async function run(bot: commandBot, message: Discord.Message) {
    //debug to console
    debug(`I am inside the ${command.fullName} command.`);
    if (dmCheck(message, command.fullName)) {
        return;
    }

    if (bot.commands.get("play").help.enabled === false) {
        return disabledCommand(command.name, message);
    }

    join(bot, message);

}

export const help = command;