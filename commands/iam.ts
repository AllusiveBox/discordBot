/*
    Command Name: iam.js
    Function: Change a User's Nickname
    Clearance: none
	Default Enabled: Yes 
    Date Created: 07/29/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { commandBot } from '../classes/commandBot.js';


import channels = require('../files/channels.json');
import config = require('../files/config.json');
import userids = require('../files/userids.json');

// Command Stuff
var usedRecently = new Set();

const command : commandHelp = {
    bigDescription: ("Changes your nickname in the server, "
        + "limited to once every seven days.\n"
        + "Returns:\n\t" + config.returnsDM),
    description: "Allows a user to update their username in the server",
    enabled: true,
    fullName: "I am",
    name: "iam",
    permissionLevel: "normal"
}

/**
 * 
 * @param {commandBot} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(bot: commandBot, message: Discord.Message, args: string[]) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    if (await dmCheck(message, command.name)) return; // Return on DM channel

    if (usedRecently.has(message.author.id)) {
        debug(`${message.author.username} has used the ${command.fullName} command recently.`);
        let reply = `I am sorry, ${message.author}, you cannot use this command agian so soon.`;
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    }

    // Get Nickname to Change to
    let nickName = args.slice(0).join(" ");
	
	if (nickName.length > 32) return message.channel.send(`I am sorry, ${message.author}, that username is too long. Discord only allows names up to 32 characters!`);

    // Test if they want to Reset Nickname
    if (!nickName) {
        nickName = "";
    }

    if (!(message.guild.members.get(message.author.id).nickname) && (nickName === "")) { // If User Has yet to Set Nickname and they didn't Provide a Nickname...
        debug(`User does not have a nickname, nor did they provide a nickname to change to...`);
        let reply = `${message.author}, you haven't set a nickname yet, so I am unable to reset your nickname...`;
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    }

    // Attempt to Change Username
    await message.guild.members.get(message.author.id).setNickname(nickName).catch(error => {
        errorLog(error);
        return message.channel.send(`I am sorry, ${message.author}, `
            + `an unexpected error has prevented me from updating your username. `
            + `Please try again in a few minutes.`);
    });

    // Update the Set of Users that have Used the Command
    usedRecently.add(message.author.id);
    setTimeout(() => {
        debug(`Removing ${message.author.id} from the set...`);
        usedRecently.delete(message.author.id);
    }, 36288000); // Remove After 7 Days.

    // Load in Log channel ID
    let logID = channels.log;

    if (!logID) { // If no Log ID...
        debug(`Unable to find log ID in channels.json. Looking for another log channel.`);

        // Look for Log Channel in Server
        let logChannel = message.member.guild.channels.find(val => val.name === "log");
        if (!logChannel) { // If Unable to Find Log Channel...
            debug(`Unable to find any kind of log channel.`);
        } else {
            logID = logChannel.id;
        }
    }

    // Load in Embed Message Color
    let logChannelColor = config.logChannelColors.memberUpdate;

    // Grab Updated To String
    let updatedTo = "";
    if (nickName === "") { // If Resetting Nickname...
        debug(`Clearing Nickname for ${message.author.username}.`);
        updatedTo = `Username Cleared.`;
    } else {
        debug(`Updating Nickname for ${message.author.username} to ${nickName}.`);
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
        let Channel = <Discord.TextChannel>bot.channels.get(logID)
        Channel.send(updatedUserEmbed).catch(error => {
            return errorLog(error);
        });
    }
    debug("Username Updated.");
    return message.channel.send(`${message.author}, your username has been updated.`);
}

export const help = command;