/*
    Command Name: announceChange.js
    Function: The Bot Lists the Change log to the BulletBoard Channel.
    Clearance: Owner Only
  	Default Enabled: Cannot be Disabled
    Date Created: 12/03/17
    Last Updated: 08/10/18
*/

// Load in Required Files
const channels = require(`../files/channels.json`);
const userids = require(`../files/userids.json`);
const roles = require(`../files/roles.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

// Command Stuff
const fs = require(`fs`);
var text = fs.readFileSync(`./files/announcement.txt`, `utf8`);
const announcement = text.split(`\n`);
const announceChat = channels.announceChat;
const alertMe = roles.alertMe

// Misc. Variables
const name = "Announce";

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  if (message.author.id !== userids.ownerID) { // If Not Owner
    return debug.log(`Attempted use of ${name} by ${message.author.username}.`);
  }

  // Check if alertMe role is Defined
  if (!alertMe) { // If alertMe Role not Defined...
    let reply = await (`No role set for alertMe. Please update files/roles.json`
    + ` and add a role for the "alertMe" entry. For a template, please check `
    + `in the templates directory.`);
    debug.log(reply);
    return message.channel.send(reply);
  }

  // Check if Announcement Channel is Defined
  if (!announceChat) { // If Announcement Channel Not Defined...
    let reply = await (`No channel set for ${name} command. Please update `
    + `files/channels.json and add a role for the "announceChat" entry. For a `
    + `tmplate, please check in the templates directory.`);
    debug.log(reply);
    return message.channel.send(reply);
  }

  // Check if Announcement is Defined
  if (!announcement) { // If Announcement Not Defined...
    let reply = await (`No announcement.txt file was able to be located. `
    + `Please ensure that there is a files/announcement.txt file and that is `
    + `is in the right directory.`);
    debug.log(reply);
    return message.channel.send(reply);
  }

  bot.channels.get(announceChat).send(`<@&${alertMe.ID}>: The bot has recently `
    + `been updated! Below is a list of changes.\n\n`
    + `If you have any command suggestions, send a DM to <@${userids.ownerID}>.`
    + ` It's easier to keep up with them that way.\n`);
  return bot.channels.get(announceChat).send(announcement).catch(error => {
    errorLog.log(error);
    return message.author.send(`ERROR! Please check error.txt!`);
  });
}

module.exports.help = {
  name : "announce",
  description : (`Generates announcement text for the ${alertMe.name} role.`)
}
