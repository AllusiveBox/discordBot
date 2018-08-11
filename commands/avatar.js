/*
    Command Name: avatar.js
    Function: Returns a User's Avatar
    Clearance: Mod+
	  Default Enabled: Cannot be disabled
    Date Created: 04/14/18
    Last Updated: 08/10/18
*/

// Load in Required Files
const config = require(`../files/config.json`);
const roles = require(`../files/roles.json`);
const userids = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const dmCheck = require(`../functions/dmCheck.js`);

// Command Variables
const invalidPermission = config.invalidPermission;
const adminRole = roles.adminRole;
const modRole = roles.modRole;
const shadowModRole = roles.sModRole;

// Misc Variables
const name = "Avatar";

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // DM Check
  let isDM = dmCheck.run(message, name);
  if (isDM) return;

  // Check user Role
  if (!message.member.roles.some(r => [adminRole.ID, modRole.ID,
    shadowModRole.ID].includes(r.id))) { // If Not Admin, Mod, or Shadow Mod...
      return message.author.send(invalidPermission).catch(error => {
        return disabledDMs.run(message, invalidPermission);
    });
  }

  // Find out Who to Get Avatar of
  var member = message.mentions.members.first();

  if (!member) { // If No Member is Mentioned, or API Returns null...
    debug.log(`No member able to be located...`);
    errorLog.log(error);
    let reply = (`I am sorry ${message.author}, either you did not mention a `
    + `valid member, or the API returned a null user.\n`
    + `Please ask <@${userids.ownerID}> to investigate.`);
    return message.author.send(reply).catch(error => {
      return disabledDMs(message, reply);
    });
  } else { // Valid Member was Mentioned
    debug.log(`Generating Avatar URL for ${member.user.username} and sending `
    + `it to ${message.author.username}.`);
    return message.author.send(bot.users.get(member.id).avatarURL)
    .catch(error => {
      let reply = (`I am sorry, ${message.author}, I am unable to DM you.\n`
        + `Please check your privacy settings and try again.`);
      return disabledDMs.run(message, reply);
    });
  }

}


module.exports.help = {
  name        : "avatar",
  description : ("Returns the target's avatar as a DM to the user. Use only to "
    + "validate if it's safe for the server or not. **Do not abuse.**")
}
