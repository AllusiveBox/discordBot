/*
    Command Name: announceChange.js
    Function: The Bot Lists the Change log to the BulletBoard Channel.
    Clearance: Owner Only
  	Default Enabled: Cannot be Disabled
    Date Created: 12/03/17
    Last Updated: 10/09/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { readFileSync, createWriteStream } from 'fs';
import { NoAnnouncementTextDefined } from '../classes/CustomErrors.js';
const channels = require('../files/channels.json');
const userids = require('../files/userids.json');
const roles = require('../files/roles.json');
import { debug, error as errorLog, commandHelp } from '../functions/log.js';


// Command Variables
try {
    var text = readFileSync(`./files/announcement.txt`, `utf8`);
} catch (error) {
    throw new NoAnnouncementTextDefined();
}

const alertMe = roles.alertMe;
var announceChat = channels.announceChat;
var announcement = text.split('\n');

const command : commandHelp = {
    bigDescription: (`This command is used to ping the ${roles.alertMe.name} role when the bot updates.\n`
        + "Returns:\n\t"
        + "This command will generate a message in whatever is assigned as the announceChat channel."),
    description: `Generates the announcement text for the ${roles.alertMe.name} role.`,
    enabled: null,
    fullName: "Announce",
    name: "announce",
    permissionLevel: "owner"
}

/**
 * 
 * @param {Discord.Message | null} [message]
 */
export function getAnnouncement(message: Discord.Message | null) {
    if (!message) { // If No Message Param Provided...
        return announcement;
    } else {
        message.channel.send(announcement);
    }
}

/**
 * 
 * @param {string} newAnnouncement
 * @param {Discord.Message} [message]
 */
function setAnnouncement(newAnnouncement: string, message: Discord.Message) {
    announcement = newAnnouncement.split('\n');
    if (!message) { // If No Message Param Provided...
        return debug(`Announcement successfully updated!`);
    } else {
        return message.channel.send(`Announcement successfully updated!`);
    }
}

/**
 * 
 * @param {string} updateText
 * @param {?Discord.Message} [message = null]
 */

export function updateAnnouncement(updateText: string, message: Discord.Message | null) {
    announcement = `${announcement}${updateText}`.split('\n');

    // Open Stream Writer
    let stream = createWriteStream(`./files/command.announcement.txt`, `utf8`);
    // Update Announceent Text File
    stream.write(announcement);
    // Cose Stream Writer
    stream.end();
    debug(`Updating announcement to \n${announcement}`);

    if (!message) { // If No Message Param Provided...
        return;
    } else { // If Message Param Provided...
        return message.channel.send(announcement);
    }
}

/**
 * 
 * @param {Discord.Message} [message]
 */

export function resetAnnouncement(message: Discord.Message) {
    announcement = [];
    let stream = createWriteStream(`./files/command.announcement.txt`, `utf8`);
    // Update Announceent Text File
    stream.write(announcement);
    // Cose Stream Writer
    stream.end();
    debug(`Announcement reset!`);
    if (!message) { // If No Message Param Provided...
        return debug(`Announcement reset!`);
    } else {
        return message.channel.send(`Announcement reset!`);
    }
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
export async function run(bot: Discord.Client, message: Discord.Message) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    if (message.author.id !== userids.ownerID) { // If Not Owner
        return debug(`Attempted use of ${command.fullName} by ${message.author.username}.`);
    }

    // Check if alertMe role is Defined
    if (!alertMe) { // If alertMe Role not Defined...
        let reply = (`No role set for alertMe. Please update files/roles.json`
            + ` and add a role for the "alertMe" entry. For a template, please check `
            + `in the templates directory.`);
        debug(reply);
        return message.channel.send(reply);
    }

    // Check if Announcement Channel is Defined
    if (!announceChat) { // If Announcement Channel Not Defined...
        let reply = (`No channel set for ${command.name} command. Please update `
            + `files/channels.json and add a role for the "announceChat" entry. For a `
            + `tmplate, please check in the templates directory.`);
        debug(reply);
        return message.channel.send(reply);
    }

    // Check if Announcement is Defined
    if (!announcement) { // If Announcement Not Defined...
        let reply = (`No announcement.txt file was able to be located. `
            + `Please ensure that there is a files/announcement.txt file and that it `
            + `is in the right directory.`);
        debug(reply);
        return message.channel.send(reply);
    }
    let announceChannel = <Discord.TextChannel> bot.channels.get(announceChat);
    announceChannel.send(`<@&${alertMe.ID}>: The bot has recently `
        + `been updated! Below is a list of changes.\n`
        + `If you have any command suggestions, send a DM to <@${userids.ownerID}>.`
        + ` It's easier to keep up with them that way.\n\n`);
    return announceChannel.send(announcement).catch(error => {
        errorLog(error);
        return message.author.send(`ERROR! Please check error.txt!`);
    });
}

export const help = command;