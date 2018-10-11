/*
    Command Name: play.js
    Function: plays a song if in a voice channel
    Clearance: none
	Default Enabled: Yes
    Date Created: 09/06/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

//load in required files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { play } from '../functions/music.js';


import config = require('../files/config.json');

//misc variables
const command : commandHelp = {
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
export async function run(bot: Discord.Client, message: Discord.Message, args: string[]) {
    //debug to console
    debug(`I am inside the ${command.fullName} command.`);
    if (dmCheck(message, command.name)) {
        return;
    }

    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    let arg = args.join(" ");
    play(bot, message, arg).catch(error => {
        errorLog(error);
    });

}

export const help = command;