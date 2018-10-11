/* 
    Command Name setnavi.js
    Function: Set's a User's Navi Symbol in the userinfo file
    Clearance: none
    Default Enabled: True
    Date Created: 03/03/18
    Last Updated: 10/10/18
    Last Update By: Th3_M4j0r
*/

// Load in Required Files
import * as Discord from 'discord.js';
import betterSql from '../classes/betterSql.js';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import { run as disabledDMs } from '../functions/disabledDMs.js';
import { existsSync } from 'fs';


import config = require('../files/config.json');
import roles = require('../files/roles.json');


//command stuff
const command: commandHelp = {
    bigDescription: ("Use this command to change your navi symbol to something different\n"
        + "Returns:\n\t"
        + config.returnsDM),
    description: "Changes the user's navi symbol",
    enabled: true,
    fullName: "Set Navi",
    name: "setnavi",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
export async function run(client: Discord.Client, message: Discord.Message, args: string[], sql: betterSql) {
    // Debug to Console
    debug(`I am inside the ${command.fullName} Command.`);

    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }


    let navi = args[0];

    if (navi === undefined) {
        debug(`No Name Given`);
        return message.channel.send(`Cannot have an empty string.`);
    }

    navi = navi.toLowerCase();


    let row = await sql.getUserRow(message.author.id);
    if (!row) {
        debug(`Unable to locate data on ${message.author.username}`);
        return message.channel.send(`I am unable to locate any data on you, please try again`);
    }
    debug(`Attempting to update ${message.author.username}'s Navi Symbol`);
    row.navi = navi;
    let navi_sym = (`./img/navi_symbols/${row.navi}.png`);
    if (!existsSync(navi_sym)) { // If file doesn't exist
        debug(`Invalid Navi Symbol File: ${row.navi}. Setting to Default.`);
        row.navi = "megaman";
        navi_sym = (`./img/navi_symbols/${row.navi}.png`);
        sql.setNavi(message.author.id, row.navi);
        let reply = `${message.author} invalid navi symbol file. Setting default value.`
        return message.author.send(reply).catch(error => {
            disabledDMs(message, reply);
        });
    }

    //else it does exist

    debug(`Valid Navi Symbol File: ${row.navi}`);
    sql.setNavi(message.author.id, row.navi);
    let reply = "Navi Symbol Updated";
    return message.author.send(reply).catch(error => {
        disabledDMs(message, reply);
    });
}

export const help = command;