/**

    cxBot.js Mr. Prog Role Changing Script
    Version: 3
    Author: AllusiveBox
    Date Started: 08/11/18
    Date Last Updated: 10/09/18
    Last Update By: Th3_M4j0r

**/

// Load in Required Libraries and Files
import * as Discord from 'discord.js';
const roles = require(`../files/roles.json`);
import { debug, error as errorLog } from '../functions/log';

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {Number} level
 */
export function run(bot: Discord.Client, message: Discord.Message, level: number) {
    // Debug to Console
    debug(`I am in the changerole function.`);

    // Default Assignments
    let serverRoles = message.guild.roles;
    let member = message.member;
    let has = ` has been promoted to: `;

    if (!member) { // If Member Object is null...
        errorLog(`Member object null for ${message.author.username}`);
        return message.channel.send(`${message.author}, I am unable to update your `
            + `roles at this time.`);
    }
    // Level Logic Check
    level = level < 10 ? 0 + level : level;
    // Get The Role
    let role : Discord.RoleResolvable = serverRoles.get(roles.levelUp[`${level}`]);
    if (!role) {
        return debug(`Role has not been defined for level ${level}...`);
    } else {
        role = role.id;
    }
    member.addRole(role).catch(error => {
        return errorLog(error);
    });
    debug(`${message.author.username}${has}${roles.levelUp[`${level}`].name}`);
    message.channel.send(`You have been promoted to `
        + `**__${roles.levelUp[`${level}`].name}!__**`);
}
