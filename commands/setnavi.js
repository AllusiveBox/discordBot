/* 
    Command Name setnavi.js
    Function: Set's a User's Navi Symbol in the userinfo file
    Clearance: none
    Default Enabled: True
    Date Createe: 03/03/18
    Last Updated: 09/16/18
    Last Update By: Th3_M4j0r
*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const betterSql = require(`../functions/betterSql.js`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const roles = require(`../files/roles.json`);
const errorLog = require(`../functions/errorLog.js`);
const fs = require(`fs`);


//command stuff
const command = {
    bigDescription: ("Use this command to change your navi symbol to something different"),
    description: "Changes the user's navi symbol",
    enabled: enabled.setnavi,
    name: "Set Navi Symbol",
    permissionLevel: "none"
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
module.exports.run = async (client, message, args, sql) => {
    // Debug to Console
    debug.log(`I am inside the ${command.name} Command.`);

    if (!command.enabled) {
        return disabledCommand.run(command.name, message);
    }


    let navi = args[0];

    if (navi === undefined) {
        debug.log(`No Name Given`);
        return message.channel.send(`Cannot have an empty string.`);
    }

    navi = navi.toLowerCase();


    let row = await sql.getUserRow(message.author.id);
    if (!row) {
        debug.log(`Unable to locate data on ${message.author.username}`);
        return message.channel.send(`I am unable to locate any data on you, please try again`);
    }
    debug.log(`Attempting to update ${message.author.username}'s Navi Symbol`);
    row.navi = navi;
    let navi_sym = (`./img/navi_symbols/${row.navi}.png`);
    if (!fs.existsSync(navi_sym)) { // If file doesn't exist
        debug.log(`Invalid Navi Symbol File: ${row.navi}. Setting to Default.`);
        row.navi = "megaman";
        navi_sym = (`./img/navi_symbols/${row.navi}.png`);
        sql.setNavi(message.author.id, row.navi);
        let reply = `${message.author} invalid navi symbol file. Setting default value.`
        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    }

    //else it does exist

    debug.log(`Valid Navi Symbol File: ${row.navi}`);
    sql.setNavi(message.author.id, row.navi);
    let reply = "Navi Symbol Updated";
    return message.author.send(reply).catch(error => {
        disabledDMs.run(message, reply);
    });
}

module.exports.help = command;