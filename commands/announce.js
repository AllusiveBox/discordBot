/*
    Command Name: announceChange.js
    Function: The Bot Lists the Change log to the BulletBoard Channel.
    Clearance: Owner Only
  	Default Enabled: Cannot be Disabled
    Date Created: 12/03/17
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const channels = require(`../files/channels.json`);
const userids = require(`../files/userids.json`);
const roles = require(`../files/roles.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);


// Command Variables
var text = fs.readFileSync(`./files/announcement.txt`, `utf8`);
var announcement = text.split(`\n`);
const announceChat = channels.announceChat;
const alertMe = roles.alertMe

// Misc. Variables
const name = "Announce";

/**
 * 
 * @param {Discord.Message} message [OPTIONAL]
 */

function getAnnouncement(message) {
    if (!message) { // If No Message Param Provided...
        return announcement;
    } else {
        message.channel.send(announcement);
    }
}

/**
 * 
 * @param {string} newAnnouncement
 * @param {Discord.Message} message [OPTIONAL]
 */

function setAnnouncement(newAnnouncement, message) {
    announcement = newAnnouncement;
    if (!message) { // If No Message Param Provided...
        return debug.log(`Announcement successfully updated!`);
    } else {
        return message.channel.send(`Announcement successfully updated!`);
    }
}

/**
 * 
 * @param {string} updateText
 * @param {Discord.Message} message [OPTIONAL]
 */

function updateAnnouncement(updateText, message) {
    announcement = `${announcement}${updateText}`;

    // Open Stream Writer
    var stream = fs.createWriteStream(`./files/announcement.txt`, `utf8`);
    // Update Announceent Text File
    stream.write(announcement);
    // Cose Stream Writer
    stream.end();
    debug.log(`Updating announcement to \n${announcement}`);

    if (!message) { // If No Message Param Provided...
        return;
    } else { // If Message Param Provided...
        return message.channel.send(announcement);
    }
}

/**
 * 
 * @param {Discord.Message} message
 */

function resetAnnouncement(message) {
    announcement = "";
    updateAnnouncement("");
    debug.log(`Announcement reset!`);
    if (!message) { // If No Message Param Provided...
        return debug.log(`Announcement reset!`);
    } else {
        return message.channel.send(`Announcement reset!`);
    }
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    if (message.author.id !== userids.ownerID) { // If Not Owner
        return debug.log(`Attempted use of ${name} by ${message.author.username}.`);
    }

    // Check if alertMe role is Defined
    if (!alertMe) { // If alertMe Role not Defined...
        let reply = (`No role set for alertMe. Please update files/roles.json`
            + ` and add a role for the "alertMe" entry. For a template, please check `
            + `in the templates directory.`);
        debug.log(reply);
        return message.channel.send(reply);
    }

    // Check if Announcement Channel is Defined
    if (!announceChat) { // If Announcement Channel Not Defined...
        let reply = (`No channel set for ${name} command. Please update `
            + `files/channels.json and add a role for the "announceChat" entry. For a `
            + `tmplate, please check in the templates directory.`);
        debug.log(reply);
        return message.channel.send(reply);
    }

    // Check if Announcement is Defined
    if (!announcement) { // If Announcement Not Defined...
        let reply = (`No announcement.txt file was able to be located. `
            + `Please ensure that there is a files/announcement.txt file and that it `
            + `is in the right directory.`);
        debug.log(reply);
        return message.channel.send(reply);
    }

    bot.channels.get(announceChat).send(`<@&${alertMe.ID}>: The bot has recently `
        + `been updated! Below is a list of changes.\n`
        + `If you have any command suggestions, send a DM to <@${userids.ownerID}>.`
        + ` It's easier to keep up with them that way.\n\n`);
    return bot.channels.get(announceChat).send(announcement).catch(error => {
        errorLog.log(error);
        return message.author.send(`ERROR! Please check error.txt!`);
    });
}

module.exports.help = {
    name: "announce",
    description: (`Generates announcement text for the ${alertMe.name} role.`),
    permissionLevel: "owner"
}

module.exports.getAnnouncement = getAnnouncement;
module.exports.setAnnouncement = resetAnnouncement;
module.exports.updateAnnouncement = updateAnnouncement;
module.exports.resetAnnouncement = resetAnnouncement;