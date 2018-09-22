/*
    Command Name: avatar.js
    Function: Returns a User's Avatar
    Clearance: Mod+
	Default Enabled: Cannot be disabled
    Date Created: 04/14/18
    Last Updated: 09/22/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const userids = require(`../files/userids.json`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);
const log = require(`../functions/log.js`);


const command = {
    adminOnly: false,
    bigDescription: ("Returns the target's avatar as a DM to the user, " 
        + "works with both a mention and their ID. Use only to "
        + "validate if it's safe for the server or not. **Do not abuse.**"),
    description: "DMs you with a user's avatar",
    enabled: null,
    fullName: "Avatar",
    name: "avatar",
    permissionLevel: "mod"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {sqlite} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    log.debug(`I am inside the ${command.fullName} command.`);

    // DM Check
    if (dmCheck.run(message, command.fullName)) return; // Return on DM channel

    if (! await hasElevatedPermissions.run(bot, message, command.adminOnly, sql)) return;

    // Find out Who to Get Avatar of
    let member = message.mentions.members.first();

    if (!member) { // If No Member is Mentioned, or API Returns null...
        log.debug(`No member mentioned trying by ID...`);
        let toCheck = args.slice(0).join(' ');
        if (message.guild.members.has(toCheck)) {
            log.debug(`Found a member by the given ID`);
            member = message.guild.members.get(toCheck);
        } else {
            let reply = (`I am sorry ${message.author}, either you did not mention a `
                + `valid member, used an incorrect ID, or the API returned a null user.\n`
                + `Please ask <@${userids.ownerID}> to investigate.`);
            return message.author.send(reply).catch(error => {
                return disabledDMs.run(message, reply);
            });
        }
    } // Valid Member was found
    log.debug(`Generating Avatar URL for ${member.user.username} and sending `
        + `it to ${message.author.username}.`);
    return message.author.send(bot.users.get(member.id).avatarURL)
        .catch(error => {
            let reply = (`I am sorry, ${message.author}, I am unable to DM you.\n`
                + `Please check your privacy settings and try again.`);
            return disabledDMs.run(message, reply);
        });
}


module.exports.help = command;
