/*
    Command Name: alertme.js
    Function: Assigns a User the Role to be Alerted with Bot Updates
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/29/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { role as ValidateRole } from '../functions/validate.js';

import config = require('../files/config.json');
import roles = require('../files/roles.json');

// Command Variables
const command: commandHelp = {
    bigDescription: ("This command assigns a user a role that will let them be alerted when the bot updates. (**Note**: This command cannot be used in a DM.)\n"
        + "Returns:\n\t"
        + config.returnsDM),
    description: "Provides the user a role so they can know when the bot updates.",
    enabled: true,
    fullName: "Alert Me",
    name: "alertme",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
export async function run(bot: Discord.Client, message: Discord.Message) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.fullName, message);
    }

    // DM Check
    if (dmCheck(message, command.fullName)) return; // Return on DM channel

    // Check to see if Role has been Defined or Not
    ValidateRole
        (roles.alertMe, command.fullName);

    // Find out the User to Update
    var toUpdate = message.member;

    // Grab the Server Roles
    let serverRoles = message.guild.roles;

    // Get the Current Command Prefix
    let prefix = config.prefix;

    // Check if Member Has the Role Already
    if (toUpdate.roles.some(r => [roles.alertMe.ID].includes(r.id))) {
        debug(`${message.author.username} already has the ${roles.alertMe.name} role.`
            + ` Removing role now.`);
        let role = serverRoles.get(roles.alertMe.ID);

        try {
            await toUpdate.removeRole(role);
        } catch (error) {
            errorLog(error);
            return message.channel.send(`I am sorry, ${message.author}, something `
                + `went wrong and I was unable to update your roles.`);
        }

        let reply = (`${message.author}, you have been removed from the `
            + `${roles.alertMe.name} role.\n`
            + `If you wish to be added back to this role later, please use the `
            + `${prefix}alertMe command in the ${message.guild.name} server.`);
        return message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    } else {
        debug(`${message.author.username} does not have the ${roles.alertMe.name} `
            + `role. Adding role now.`);
        let role = serverRoles.get(roles.alertMe.ID);

        try {
            await toUpdate.addRole(role);
        } catch (error) {
            errorLog(error);
            return message.channel.send(`I am sorry, ${message.author}, something went wrong and I was unable to update your roles.`);
        }

        let reply = (`${message.author}, you have been added to the `
            + `${roles.alertMe.name} role.\n`
            + `If you wish to be removed from this role later, pleas use the `
            + `${prefix}alertMe command in the ${message.guild.name} server.`);
        return message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    }
}

export const help = command;
