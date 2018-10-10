/*
    Command Name: media.js
    Function: Returns Links to Our Social Media Sites
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';


const config = require('../files/config.json');

// Command Stuff
const command : commandHelp = {
    bigDescription: ("Replies with a list of all of the Chrono X Media Links.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Posts all CX social media",
    enabled: true,
    fullName: "Media",
    name: "media",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

export async function run(bot: Discord.Client, message: Discord.Message) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.fullName, message);
    }

    // Build Reply
    let reply = (`Want to keep in touch with us? Make sure to follow us on our social media platforms!\n`
        + "**deviantART**: <https://mmbnchronox.deviantart.com/> \n"
        + "**e-mail**: cxdevteam@gmail.com \n"
        + "**Facebook**: <https://www.facebook.com/MMBNChronoX/> \n"
        + "**Twitch**: <https://www.twitch.tv/mmbncx> \n"
        + "**Twitter**: <https://twitter.com/mmbncx> \n"
        + "**YouTube**: <https://youtube.com/rockflor> \n");

    message.channel.send(reply);
}

export const help = command;