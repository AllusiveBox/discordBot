/*
    Command Name: question.js
    Function: Asks a question to the Question Chat
    Clearance: none
	Default Enabled: Only during Streaming Sessions
    Date Created: 12/02/17
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { run as dmCheck } from '../functions/dmCheck.js';


import channels = require('../files/channels.json');
import config = require('../files/config.json');

// Command Variables
const talkedRecently = new Set();
const command: commandHelp = {
    bigDescription: ("Allows you to ask a question in the question channel (This command can only be used when the bot is set to streaming).\n"
        + "Required arguments: {string} -> The Question you want to ask.\n"
        + "Returns:\n\t"
        + "This command will generate a message in the question channel"),
    description: "Allows you to ask a question when streaming.",
    enabled: false,
    fullName: "Question",
    name: "question",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
export async function run(bot: Discord.Client, message: Discord.Message, args) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    if (dmCheck(message, command.name)) return; // Return on DM channel

    if (talkedRecently.has(message.author.id)) {// If Member has used this command Recently...
        let reply = `${message.author}, slow down! Please do not spam questions.`;
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    }

    // Get Question Channel Color
    let questionChannelColor = config.questionChannelColor;

    // Load in the Question Channel ID
    let questionID = channels.question;

    // Check if there was an ID Provided
    if (!questionID) { // If no Question ID...
        debug(`Unable to find the question ID in channels.json`
            + `Looking for another Question channel.`);

        // Look for Question Channel in Server
        let questionChannel = message.guild.channels.find(val => val.name === "question");
        if (!questionChannel) {
            debug(`Unable to find any kind of question channel. Silently disabling command.`);
            return command.enabled = false;
        } else {
            questionID = questionChannel.id;
        }
    }

    // Add User to Set
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        // Removed User from the Set after 30 Seconds.
        talkedRecently.delete(message.author.id);
    }, 30000);

    // Get the Question
    var question = args.join(" ");

    if (!question) { // If No Question Provided...
        debug(`Unable to send an empty string!`);

        // Build the Reply
        let reply = (`I am sorry, ${message.author}, I am unable to send an empty question.\n`
            + `Please make sure to ask a question!`);
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    }

    // Get the Member's Avatar
    let avatar = message.member.user.avatarURL;

    // Build the Question Embed
    let questionEmbed = new Discord.RichEmbed()
        .setDescription(`Question`)
        .setColor(questionChannelColor)
        .setThumbnail(avatar)
        .addField("Asked By", message.author)
        .addField("Question", question)
        .addField("Asked on", new Date());

    let Channel = <Discord.TextChannel>bot.channels.get(questionID);
    Channel.send(questionEmbed).catch(error => {
        return errorLog(error);
    });
}

export const help = command;