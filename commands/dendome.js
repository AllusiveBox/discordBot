/*
    Command Name: dendome.js
    Function: Assigns a User the Tournament Participant Role
    Clearance: none
  	Default Enabled: Yes
    Date Created: 05/19/18
    Last Updated: 08/30/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const roles = require(`../files/roles.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const errorLog = require(`../functions/errorLog.js`);

// Command Variables
const tournyRole = roles.tournyRole;

// Misc Variables
const name = "Dendome";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.dendome) {
        return disabledCommand.run(name, message);
    }

    // DM Check
    if (await dmCheck.run(message, name)) return; // Return on DM channel

    // Check to see if Role has been Defined or Not
    if (tournyRole.ID == "") {
        debug.log(`No role set for ${name}. Please update files/roles.json and `
            + `add a role for the "alertMe" entry. For a template, please check `
            + `in the templates directory.`);
        let reply = (`I am sorry, ${message.author}, ${config.about.author} has not `
            + `yet added a role entry for this command.`);
        return message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    }

    // Find out the User to Update
    var toUpdate = message.member;

    // Grab the Server Roles
    let serverRoles = message.guild.roles;

    // Get the Current Command Prefix
    let prefix = config.prefix;

    // Check if Member has the Role Already
    if (toUpdate.roles.some(r => [tournyRole.ID].includes(r.id))) {
        debug.log(`${message.author.username} already has the ${tournyRole.name} `
            + `role. Removing role now.`);
        let role = await serverRoles.get(tournyRole.ID);
        await toUpdate.removeRole(role).catch(error => {
            errorLog.log(error);
            return message.channel.send(`I am sorry, ${message.author}, something`
                + ` went wrong and I was unable to update your roles.`);
        });
        let reply = (`${message.author}, you have been removed from the `
            + `${tournyRole.name} role.\n`
            + `If you wish to be added back to this role later, please use the `
            + `${prefix}dendome command in the ${message.guild.name} server.`);
        return message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    } else {
        debug.log(`${message.author.username} does not have the ${tournyRole.name} `
            + `role. Adding role now.`);
        let role = await serverRoles.get(tournyRole.ID);
        await toUpdate.addRole(role).catch(error => {
            errorLog.log(error);
            return message.channel.send(`I am sorry, ${message.author}, something `
                + `went wrong and I was unable to update your roles.`);
        });
        let reply = (`${message.author}, you have been added to the `
            + `${tournyRole.name} role.\n`
            + `If you wish to be removed from this role later, please use the `
            + `${prefix}dendome command in the ${message.guild.name} server.`);
        return message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    }
}

module.exports.help = {
    name: "dendome",
    description: ("Assigns the user the Tournament Participant Role.")
}
