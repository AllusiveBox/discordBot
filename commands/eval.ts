/*
    Command Name: eval
    Function: Allows code to be run through the bot
    Clearance: Owner Only
  	Default Enabled: Disabled
    Date Created: 10/17/17
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import * as fs from 'fs';
import betterSql from '../classes/betterSql.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';


import channels = require('../files/channels.json');
import config = require('../files/config.json');
import includedCommands = require('../files/includedCommands.json');
import roles = require('../files/roles.json');
import userids = require('../files/userids.json');

// Command Variables
const ownerID = userids.ownerID;
const command : commandHelp = {
    bigDescription: ("OWNER ONLY. ALL ACCESS COMMAND."),
    description: "OWNER ONLY. ALL ACCESS COMMAND.",
    enabled: false,
    fullName: "Eval",
    name: "eval",
    permissionLevel: "owner"
}

/**
 *
 * @param {string|any} text
 */
function clean(text: string | any) {
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
export async function run(bot: Discord.Client, message: Discord.Message, args: string[], sql: betterSql) {
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

export const help = command;
