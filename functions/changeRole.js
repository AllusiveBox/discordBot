/**

    cxBot.js Mr. Prog Role Changing Script
    Version: 3
    Author: AllusiveBox
    Date Started: 08/11/18
    Date Last Updated: 08/11/18

**/

// Load in Required Libraries and Files
const config = require(`../files/config.json`);
const roles = require(`../files/roles.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

module.exports.run = (bot, message, level) => {
  // Debug to Console
  debug.log(`I am in the changerole function.`);

  // Default Assignments
  let serverRoles = message.guild.roles;
  let member = message.member;
  let has = ` has been promoted to: `;

  if (!member) { // If Member Object is null...
    errorLog.log(`Member object null for ${memeber.author.username}`);
    return message.channel.send(`${message.author}, I am unable to update your `
      + `roles at this time.`);
  }
  // Level Logic Check
  level = level < 10 ? '0' + level : level;
  // Get The Role
  let role = serverRoles.find("id", roles.levelUp[`${level}`].ID);
  if (!role) {
    debug.log(`Role has not been defined for level ${level}...`);
  }
  member.addRole(role).catch(error => {
    return errorLog.log(error);
  });
  debug.log(`${message.author.username}${has}${roles.levelUp[`${level}`].name}`);
  message.channel.send(`You have been promoted to `
    + `**__${roles.levelUp[`${level}`].name}!__**`);
}
