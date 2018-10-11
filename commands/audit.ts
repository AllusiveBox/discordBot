/**

    cxBot.js Mr. Prog audit log command
    Version: 1
    Author: Th3_M4j0r
    clearance: Mod+
    Default Enabled: Cannot be Disabled
    Date Started: 09/16/18
    Date Last Updated: 10/10/18
    Last Update By: Th3_M4j0r

**/



import * as Discord from 'discord.js';
import betterSql from '../classes/betterSql.js';
import { run as dmCheck } from '../functions/dmCheck.js';
import { run as hasElevatedPermissions } from '../functions/hasElevatedPermissions.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';

import config = require('../files/config.json');


//command Stuff
const command : commandHelp = {
    adminOnly: false,
    bigDescription: ("Use this command to see a page of the audit log, "
        + "can take a page number as an argument.\nReturns:\n\t " + config.returnsDM),
    description: "DMs you a page of the audit log",
    enabled: null,
    fullName: "Audit",
    name: "audit",
    permissionLevel: "mod"
}

/**
 * 
 * @param {Discord.GuildAuditLogsEntry} entry
 */
function format(entry: Discord.GuildAuditLogsEntry) {

    if (entry.actionType == "DELETE") {
        return `\tTimestamp:${entry.createdAt.toString()}\n\tAction:${entry.action}`
            + `\n\tExecutor:${entry.executor.username}`;
    }
    else {
        return `\tTimestamp:${entry.createdAt.toString()}\n\tAction:${entry.action}`
            + `\n\tExecutor:${entry.executor.username}\n\tChanges:${JSON.stringify(entry.changes)}`;
    }
}

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {betterSql} sql
 * */
export async function run(bot: Discord.Client, message: Discord.Message, args: string[], sql: betterSql) {

    debug(`I am inside the ${command.fullName} command`);
    if (dmCheck(message, command.fullName)) return; //returns on DM channel 

    if (! await hasElevatedPermissions(bot, message, command.adminOnly, sql)) return;

    let startPos = 0;
    let page = 1;
    if (args[0] && !isNaN(Number(args[0])) && Number(args[0]) > 0) { //valid page number?
        startPos = (Number.parseInt(args[0]) - 1) * 5;
        page = Number(args[0]);
    }
    try {
        debug(`Fetching audit logs for ${message.guild.name}`);
        let audit = await message.guild.fetchAuditLogs();
        let entries = audit.entries.array();
        debug(`Attempting to Generate embed of entries ${startPos} through ${startPos + 4}`);
        let embed = new Discord.RichEmbed()
            .setTitle(`Page#${page}`)
            .setColor(config.auditColor)
            .addField(`Log#${startPos + 1}`, format(entries[startPos]))
            .addField(`Log#${startPos + 2}`, format(entries[startPos + 1]))
            .addField(`Log#${startPos + 3}`, format(entries[startPos + 2]))
            .addField(`Log#${startPos + 4}`, format(entries[startPos + 3]))
            .addField(`Log#${startPos + 5}`, format(entries[startPos + 4]));
        message.author.send({ embed }).catch(error => {
            errorLog(error);
            message.channel.send(`I was unable to send the log to you, if this persists, inform ${config.about.author}\n`
                + `error type: ${error.toString()}`);
        });
    }
    catch (error) {
        errorLog(error);
    }
};

export { command as help };