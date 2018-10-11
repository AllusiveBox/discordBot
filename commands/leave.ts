/*
    Command Name: leave.js
    Function: leaves a voice channel
    Clearance: none
	Default Enabled: cannot be disabled
    Date Created: 09/03/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

//load in required files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { leave } from '../functions/music.js';

import config = require('../files/config.json');

//command variables
const command : commandHelp = {
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
export async function run(bot: Discord.Client, message: Discord.Message) {
    //debug to console
    debug(`I am inside the ${command.fullName} command.`);
    if (dmCheck(message, command.fullName)) {
        return;
    }
    

    leave(bot, message).catch(error => {
        errorLog(error);
    });

}

export const help = command;