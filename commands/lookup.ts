/*
    Command Name: lookup.js
    Function: Looks up a User's Data in the Database
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 07/19/18
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r
*/

// Load in Required Files
import * as Discord from 'discord.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as hasElevatedPermissions } from '../functions/hasElevatedPermissions.js';
import betterSql from '../classes/betterSql.js';


import config = require('../files/config.json');
import userIDs = require('../files/userids.json');



const command : commandHelp = {
    fullName: "Lookup",
    name: "lookup",
    adminOnly: true,
    bigDescription: ("Looks up and returns a particular user's data, "
        + "formats it using any given format flags.\n"
        + "Returns:\n\t"
        + "DM reply unless public flag is set"),
    description: "looks for a particular user in the database",
    enabled: null,
    permissionLevel: "admin"
}


/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
export async function run(client: Discord.Client, message: Discord.Message, args: string[], sql: betterSql) {
    // Debug to Console Log
    debug(`I am inside the ${command.name} Command.`);

    let params = "";

    // Param Options
    let formattedMessage = false; //F
    let publicMessage = false; //P
    let multipleUsers = false; //M
    let includeAll = false; //A

    let includeUserID = false; //i
    let includeUserName = false; //n
    let includeBattlecode = false; //b
    let includeFavChip = false; //f
    let includeNaviSym = false; //s
    let includeClearance = false; //c
    let includePoints = false; //p
    let includeLevel = false; //l


    if (! await hasElevatedPermissions(client, message, command.adminOnly, sql)) return;
    // Grab Options
    if (args[0] !== undefined) {
        params = args[0];
    }

    if ((params.indexOf('-')) || (params.length === 0) || (args[1] === undefined)) {
        return message.channel.send(`Either no params were passed, or you did not format your params correctly.`);
    }

    if (params.includes('F')) { //Format User Reply
        debug(`Setting Formatted Message Flag.`);
        formattedMessage = true;
    }
    if (params.includes('P')) { // Public Message Back
        debug(`Setting Public Message Flag.`);
        publicMessage = true;
    }
    if (params.includes('M')) { // Multiple User Lookup
        debug(`Setting Mutliple Users Flag.`);
        multipleUsers = true;
    }
    if (params.includes('A')) { // Include all Data
        debug(`Setting Include All Data Flag.`);
        includeAll = true;
    }
    else {
        if (params.includes('i')) { // Include UserID
            debug(`Setting Include UserID Flag.`);
            includeUserID = true;
        }
        if (params.includes('n')) { // Include UserName
            debug(`Setting Include Username Flag.`);
            includeUserName = true;
        }
        if (params.includes('b')) { // Include Battlecode
            debug(`Setting Include Battle Code Flag.`);
            includeBattlecode = true;
        }
        if (params.includes('f')) { // Include FavChip
            debug(`Setting Include FavChip Flag.`);
            includeFavChip = true;
        }
        if (params.includes('s')) { // Include Navi Symbol
            debug(`Setting Include Navi Symbol Flag.`);
            includeNaviSym = true;
        }
        if (params.includes('c')) { // Include Clearance Level
            debug(`Setting Include Clearance Level Flag.`);
            includeClearance = true;
        }
        if (params.includes('p')) { // Include Points
            debug(`Setting Include Points Flag.`);
            includePoints = true;
        }
        if (params.includes('l')) { // Include Level
            debug(`Setting Include Level Flag.`);
            includeLevel = true;
        }
    }

    let toCheck : Discord.Snowflake | Discord.GuildMember = '';
    if (message.channel.type !== 'dm') {
        toCheck = message.mentions.members.first();
    }
    if (!toCheck) {
        toCheck = args.slice(1).join(' ');
    }
    try {
        let row = await sql.userLookup(toCheck);
        if (!row) { // Cannot Find Row
            return message.channel.send(`I am sorry, ${message.author}, I am unable to locate any data on ${toCheck}.\n`
                + `Please verify that what you are searching by is correct and try again. If this issue continues, please reach out to `
                + `<@${userIDs.ownerID}> and let him know.`);
        }
        else {
            // Build String
            let reply = `SQL Data on: ${toCheck}\n`;
            if (formattedMessage) {
                if (includeAll || includeUserID) {
                    reply = `${reply}Discord User ID:\n\t ${row.userId}\n`;
                }
                if (includeAll || includeUserName) {
                    reply = `${reply}Current Server Username:\n\t ${row.userName}\n`;
                }
                if (includeAll || includeBattlecode) {
                    reply = `${reply}Current Battlecode:\n\t ${row.battlecode}\n`;
                }
                if (includeAll || includeFavChip) {
                    reply = `${reply}Current Favorite Chip:\n\t ${row.favechip}\n`;
                }
                if (includeAll || includeNaviSym) {
                    reply = `${reply}Current Navi Symbol:\n\t ${row.navi}\n`;
                }
                if (includeAll || includeClearance) {
                    reply = `${reply}Current Clearance:\n\t ${row.clearance}\n`;
                }
                if (includeAll || includePoints) {
                    reply = `${reply}Current Points:\n\t ${row.points}\n`;
                }
                if (includeAll || includeLevel) {
                    reply = `${reply}Current Level:\n\t ${row.level}`;
                }
                reply = "```" + reply + "```"
            }
            else {
                if (includeAll || includeUserID) {
                    reply = `${reply} ${row.userId};`;
                }
                if (includeAll || includeUserName) {
                    reply = `${reply} ${row.userName};`;
                }
                if (includeAll || includeBattlecode) {
                    reply = `${reply} ${row.battlecode};`;
                }
                if (includeAll || includeFavChip) {
                    reply = `${reply} ${row.favechip};`;
                }
                if (includeAll || includeNaviSym) {
                    reply = `${reply} ${row.navi};`;
                }
                if (includeAll || includeClearance) {
                    reply = `${reply} ${row.clearance};`;
                }
                if (includeAll || includePoints) {
                    reply = `${reply} ${row.points};`;
                }
                if (includeAll || includeLevel) {
                    reply = `${reply} ${row.level};`;
                }
            }
            if (publicMessage) {
                return message.channel.send(reply);
            }
            else {
                return message.author.send(reply).catch(error => {
                    return disabledDMs(message, `I am sorry, ${message.author}, I am unable to DM you.\n`
                        + `Please check your privacy settings and try again.`);
                });
            }
        }
    } catch (error) {
        errorLog(error);
    }

}

export const help = command;