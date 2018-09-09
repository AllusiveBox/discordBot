/*
    Command Name: media.js
    Function: Returns Links to Our Social Media Sites
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/09/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Stuff

// Misc Variables
const name = "Media";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.media) {
        return disabledCommand.run(name, message);
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

module.exports.help = {
    name: "media",
    description: "Returns a list of all of the Chrono X Media Links."
}