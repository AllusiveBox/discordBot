/*
    Command Name: alertme.js
    Function: Assigns a User the Role to be Alerted with Bot Updates
    Clearance: none
	  Default Enabled: Yes
    Date Created: 01/29/18
    Last Updated: 08/10/18
*/

// Load in Required Files
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const roles = require(`../files/roles.json`);
const userids = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const dmCheck = require(`../functions/dmCheck.js`);

// Command Variables
const alertMe = roles.alertMe;
const invalidChannel = config.invalidChannel;

// Misc. Variables
const name = "Alert Me";

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // Enabled Command Test
  if (!enabled.alertme) {
    return disabledCommand.run(name, message);
  }

  // DM Check
  let isDM = await dmCheck.run(message, name);
  if (isDM) return;

  // Check to see if Role has been Defined or Not
  if (!alertMe) {
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
  var toUpdate = await message.member;

  // Check if Member Has the Role Already
  if (message.member.roles.some(r => [alertMe.ID].includes(r.id))) {
    debug.log(`${message.author.username} already has the ${alertMe.name} role.`
      + ` Removing role now.`);
      let role = await message.guild.roles.find("id", alertMe.ID);
      toUpdate.removeRole(role).catch(error => {
        return errorLog.log(error);
        return message.channel.send(`I am sorry, ${message.author}, something `
          + `went wrong and I was unable to update your roles.`);
        });
        let reply = await (`${message.author}, you have been removed from the `
          + `${alertMe.name} role.\n`
          + `If you wish to be added to this role again later, please use this `
          + `command in the ${message.guild.name} server.`);
        return message.author.send(reply).catch(error => {
          disabledDMs.run(message, reply);
      });
  } else {
    debug.log(`${message.author.username} does not have the ${alertMe.name} `
      + `role. Adding rolw now.`);
      let role = await message.guild.roles.find("id", alertMe.ID);
      toUpdate.addRole(role).catch(error => {
        errorLog.log(error);
        return message.channel.send(`I am sorry, ${message.author}, something `
          + `went wrong and I was unable to update your roles.`);
      });
      let reply = await (`${message.author}, you have been added to the `
      + `${alertMe.name} role.\n`
      + `If you want to be removed from this role later, please use this `
      + `command in the ${message.guild.name} server.`);
      return message.author.send(reply).catch(error => {
        disabledDMs.run(message, reply);
      });
  }
}

module.exports.help = {
  name : "alertme",
  description : ("Assigns a role to the user so they can be alerted when the "
    + "bot updates.")
}
