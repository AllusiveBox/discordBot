/*
    Command Name: iam.js
    Function: Change a User's Nickname
    Clearance: none
	Default Enabled: Yes 
    Date Created: 07/29/18
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const channels = require(`../files/channels.json`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const userids = require(`../files/userids.json`);
const log = require(`../functions/log.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const dmCheck = require(`../functions/dmCheck.js`);
; 

// Command Stuff
var usedRecently = new Set();

// Misc Variables
const name = "I am";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */

module.exports.run = async (bot, message, args) => {
    // Debug to Console
    log.debug(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.iam) {
        return disabledCommand.run(name, message);
    }

    if (await dmCheck.run(message, name)) return; // Return on DM channel

    if (usedRecently.has(message.author.id)) {
        log.debug(`${message.author.username} has used the ${name} command recently.`);
        let reply = `I am sorry, ${message.author}, you cannot use this command agian so soon.`;
        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    }

    // Get Nickname to Change to
    let nickName = args.slice(0).join(" ");

    // Test if they want to Reset Nickname
    if (!nickName) {
        nickName = "";
    }

    if (!(message.guild.members.get(message.author.id).nickname) && (nickName === "")) { // If User Has yet to Set Nickname and they didn't Provide a Nickname...
        log.debug(`User does not have a nickname, nor did they provide a nickname to change to...`);
        let reply = `${message.author}, you haven't set a nickname yet, so I am unable to reset your nickname...`;
        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    }

    // Attempt to Change Username
    await message.guild.members.get(message.author.id).setNickname(nickName).catch(error => {
        log.error(error);
        return message.channel.send(`I am sorry, ${message.author}, an unexpected error has prevented me from updating your username. Please try again in a few minutes.`)
    });

    // Update the Set of Users that have Used the Command
    usedRecently.add(message.author.id);
    setTimeout(() => {
        log.debug(`Removing ${message.author.id} from the set...`);
        usedRecently.delete(message.author.id);
    }, 36288000); // Remove After 7 Days.

    // Load in Log channel ID
    let logID = channels.log;

    if (!logID) { // If no Log ID...
        log.debug(`Unable to find log ID in channels.json. Looking for another log channel.`);
        // Look for Log Channel in Server
        logID = message.member.guild.channels.find(val => val.name === 'log').id; 
    }

    // Load in Embed Message Color
    let logChannelColor = config.logChannelColors.memberUpdate;

    // Grab Updated To String
    let updatedTo = "";
    if (nickName === "") { // If Resetting Nickname...
        log.debug(`Clearing Nickname for ${message.author.username}.`);
        updatedTo = `Username Cleared.`;
    } else {
        log.debug(`Updating Nickname for ${message.author.username} to ${nickName}.`);
        updatedTo = `Username set to: ${nickName}`;
    }

    // Get Member's Avatar
    let avatar = message.member.user.avatarURL;

    // Build the Embed
    let updatedUserEmbed = new Discord.RichEmbed()
        .setDescription(`Member Updated!`)
        .setColor(logChannelColor)
        .setThumbnail(avatar)
        .addField(`Member Name`, message.author.username)
        .addField(`Member ID`, message.author.id)
        .addField(`Changed Username`, updatedTo)
        .addField(`Time`, new Date());

    // Check if there is an ID Now...
    if (!logID) { // If no Log ID...
        bot.users.get(userids.ownerID).send(updatedUserEmbed);
    } else {
        bot.channels.get(logID).send(updatedUserEmbed).catch(error => {
            log.error(error);
            return message.channel.send(`I am sorry, ${message.author}, an unexpected error has prevented me from updating your username. Please try again in a few minutes.`);
        });
    }
    log.debug("Username Updated.");
    return message.channel.send(`${message.author}, your username has been updated.`);
}

module.exports.help = {
    name: "iam",
    description: "Allows a user to update their username in the server",
    permissionLevel: "normal"
}