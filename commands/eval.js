/*
    Command Name: eval
    Function: Allows code to be run through the bot
    Clearance: Owner Only
  	Default Enabled: Disable
    Date Created: 10/17/17
    Last Updated: 09/30/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const betterSql = require(`../classes/betterSql.js`);
const channels = require(`../files/channels.json`);
const config = require(`../files/config.json`);
const includedCommands = require(`../files/includedCommands.json`);
const roles = require(`../files/roles.json`);
const userids = require(`../files/userids.json`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);
const { debug, error: errorLog } = require(`../functions/log.js`);

// Command Variables
const ownerID = userids.ownerID;
const command = {
    bigDescription: ("OWNER ONLY. ALL ACCESS COMMAND."),
    description: "OWNER ONLY. ALL ACCESS COMMAND.",
    enabled: false,
    fullName: "Eval",
    name: "eval",
    permissionLevel: "owner"
}

/**
 *
 * @param {any} text
 */
function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`"
            + String.fromCharCode(8203)).replace(/@/g, "@"
                + String.fromCharCode(8203));
    else {
        return text;
    }
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {betterSql} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Owner ID Check
    if (message.author.id !== userids.ownerID) {
        let reply = (`WARNING. ATTEMPTED USE OF EVAL COMMAND BY `
            + `**${message.author.username}**`);
        debug(reply);
        console.log(reply);
        return bot.users.get(userids.ownerID).send(reply).catch(error => {
            errorLog(reply);
            errorLog(error);
        });
    } else {
        // Enabled Command Test
        if (!command.enabled) {
            return disabledCommand(command.fullName, message);
        } else {
            try {
                const code = args.join(" ");
                let evaled = await eval(code);
                if (typeof evaled !== "string") {
                    evaled = require("util").inspect(evaled);
                }
                message.channel.send(clean(evaled), { code: "xl" });
            }
            catch (error) {
                try {
                    message.channel.send(`\`ERROR:\` \`\`\`xl\n${clean(error)}\n\`\`\``)
                    errorLog(error);
                }
                catch (error) {
                    message.channel.send(`\`ERROR UNABLE TO SEND ERROR MESSAGE DUE TO `
                        + `CHARACTER RESTRICTION. ERROR HAS BEEN LOGGED.\``);
                    errorLog(error);
                }
            }
        }
    }
    // ALWAYS MAKE IT RESET OWNER ID.
    return userids.ownerID = ownerID;
}

module.exports.help = command;
