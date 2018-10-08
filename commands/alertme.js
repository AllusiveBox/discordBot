/*
    Command Name: alertme.js
    Function: Assigns a User the Role to be Alerted with Bot Updates
    Clearance: none
	Default Enabled: Yes
    Date Created: 01/29/18
    Last Updated: 09/30/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const roles = require(`../files/roles.json`);
const { run: disabledDMs } = require(`../functions/disabledDMs.js`);
const { run: dmCheck } = require(`../functions/dmCheck.js`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const validate = require(`../functions/validate.js`);


// Command Variables
const command = {
    alertMe: roles.alertMe,
    bigDescription: ("This command assigns a user a role that will let them be alerted when the bot updates. (**Note**: This command cannot be used in a DM.)\n"
        + "Returns:\n\t"
        + config.returnsDM),
    description: "Provides the user a role so they can know when the bot updates.",
    enabled: true,
    fullName: "Alert Me",
    name: "alertme",
    permissionLeve: "normal"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
module.exports.run = async (bot, message) => {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.fullName, message);
    }

    // DM Check
    if (dmCheck(message, command.fullName)) return; // Return on DM channel

    // Check to see if Role has been Defined or Not
    validate.role(command.alertMe, command.fullName);

    // Find out the User to Update
    var toUpdate = message.member;

    // Grab the Server Roles
    let serverRoles = message.guild.roles;

    // Get the Current Command Prefix
    let prefix = config.prefix;

    // Check if Member Has the Role Already
    if (toUpdate.roles.some(r => [command.alertMe.ID].includes(r.id))) {
        debug(`${message.author.username} already has the ${command.alertMe.name} role.`
            + ` Removing role now.`);
        let role = serverRoles.get(command.alertMe.ID);

        try {
            await toUpdate.removeRole(role);
        } catch (error) {
            errorLog(error);
            return message.channel.send(`I am sorry, ${message.author}, something `
                + `went wrong and I was unable to update your roles.`);
        }

        let reply = (`${message.author}, you have been removed from the `
            + `${command.alertMe.name} role.\n`
            + `If you wish to be added back to this role later, please use the `
            + `${prefix}alertMe command in the ${message.guild.name} server.`);
        return message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    } else {
        debug(`${message.author.username} does not have the ${command.alertMe.name} `
            + `role. Adding role now.`);
        let role = serverRoles.get(command.alertMe.ID);

        try {
            await toUpdate.addRole(role);
        } catch (error) {
            errorLog(error);
            return message.channel.send(`I am sorry, ${message.author}, something went wrong and I was unable to update your roles.`);
        }

        let reply = (`${message.author}, you have been added to the `
            + `${command.alertMe.name} role.\n`
            + `If you wish to be removed from this role later, pleas use the `
            + `${prefix}alertMe command in the ${message.guild.name} server.`);
        return message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    }
}

module.exports.help = command;
