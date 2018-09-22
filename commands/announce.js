/*
    Command Name: announceChange.js
    Function: The Bot Lists the Change log to the BulletBoard Channel.
    Clearance: Owner Only
  	Default Enabled: Cannot be Disabled
    Date Created: 12/03/17
    Last Updated: 09/22/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const CustomErrors = require(`../classes/CustomErrors.js`);
const channels = require(`../files/channels.json`);
const userids = require(`../files/userids.json`);
const roles = require(`../files/roles.json`);
const log = require(`../functions/log.js`);


// Command Variables
try {
    var text = fs.readFileSync(`./files/announcement.txt`, `utf8`);
} catch (error) {
    throw new CustomErrors.NoAnnouncementTextDefined();
}

const command = {
    alertMe: roles.alertMe,
    announceChat: channels.announceChat,
    announcement: text.split('\n'),
    bigDescription: (`This command is used to ping the ${roles.alertMe.name} role when the bot updates.`
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
 * @param {Discord.Message} [message]
 */

function getAnnouncement(message) {
    if (!message) { // If No Message Param Provided...
        return command.announcement;
    } else {
        message.channel.send(command.announcement);
    }
}

/**
 * 
 * @param {string} newAnnouncement
 * @param {Discord.Message} [message]
 */

function setAnnouncement(newAnnouncement, message) {
    command.announcement = newAnnouncement;
    if (!message) { // If No Message Param Provided...
        return log.debug(`Announcement successfully updated!`);
    } else {
        return message.channel.send(`Announcement successfully updated!`);
    }
}

/**
 * 
 * @param {string} updateText
 * @param {Discord.Message} [message]
 */

function updateAnnouncement(updateText, message) {
    command.announcement = `${command.announcement}${updateText}`;

    // Open Stream Writer
    var stream = fs.createWriteStream(`./files/command.announcement.txt`, `utf8`);
    // Update Announceent Text File
    stream.write(command.announcement);
    // Cose Stream Writer
    stream.end();
    log.debug(`Updating announcement to \n${command.announcement}`);

    if (!message) { // If No Message Param Provided...
        return;
    } else { // If Message Param Provided...
        return message.channel.send(command.announcement);
    }
}

/**
 * 
 * @param {Discord.Message} [message]
 */

function resetAnnouncement(message) {
    command.announcement = "";
    updateAnnouncement("");
    log.debug(`Announcement reset!`);
    if (!message) { // If No Message Param Provided...
        return log.debug(`Announcement reset!`);
    } else {
        return message.channel.send(`Announcement reset!`);
    }
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${command.fullName} command.`);

    if (message.author.id !== userids.ownerID) { // If Not Owner
        return log.debug(`Attempted use of ${command.fullName} by ${message.author.username}.`);
    }

    // Check if alertMe role is Defined
    if (!command.alertMe) { // If alertMe Role not Defined...
        let reply = (`No role set for alertMe. Please update files/roles.json`
            + ` and add a role for the "alertMe" entry. For a template, please check `
            + `in the templates directory.`);
        log.debug(reply);
        return message.channel.send(reply);
    }

    // Check if Announcement Channel is Defined
    if (!command.announceChat) { // If Announcement Channel Not Defined...
        let reply = (`No channel set for ${name} command. Please update `
            + `files/channels.json and add a role for the "announceChat" entry. For a `
            + `tmplate, please check in the templates directory.`);
        log.debug(reply);
        return message.channel.send(reply);
    }

    // Check if Announcement is Defined
    if (!command.announcement) { // If Announcement Not Defined...
        let reply = (`No announcement.txt file was able to be located. `
            + `Please ensure that there is a files/announcement.txt file and that it `
            + `is in the right directory.`);
        log.debug(reply);
        return message.channel.send(reply);
    }

    bot.channels.get(command.announceChat).send(`<@&${command.alertMe.ID}>: The bot has recently `
        + `been updated! Below is a list of changes.\n`
        + `If you have any command suggestions, send a DM to <@${userids.ownerID}>.`
        + ` It's easier to keep up with them that way.\n\n`);
    return bot.channels.get(command.announceChat).send(command.announcement).catch(error => {
        log.error(error);
        return message.author.send(`ERROR! Please check error.txt!`);
    });
}

module.exports.help = command;
module.exports.getAnnouncement = getAnnouncement;
module.exports.resetAnnouncement = resetAnnouncement;
module.exports.setAnnouncement = setAnnouncement;
module.exports.updateAnnouncement = updateAnnouncement;