/*
    Command Name: lookup.js
    Function: Looks up a User's Data in the Database
    Clearance: Admin+
	Default Enabled: Cannot be Disabled
    Date Created: 07/19/18
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox
*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const betterSql = require(`../functions/betterSql.js`);
const hasElevatedPermissions = require(`../functions/hasElevatedPermissions.js`);


// Misc. Variables
const name = "Lookup";

const adminOnly = true;


/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {betterSql} sql
 */
module.exports.run = async (client, message, args, sql) => {
    // Debug to Console Log
    debug.log(`I am inside the ${name} Command.`);

    var params = ""

    // Param Options
    var formattedMessage = false; //F
    var publicMessage = false; //P
    var multipleUsers = false; //M
    var includeAll = false; //A

    var includeUserID = false; //i
    var includeUserName = false; //n
    var includeBattlecode = false; //b
    var includeFavChip = false; //f
    var includeNaviSym = false; //s
    var includeClearance = false; //c
    var includePoints = false; //p
    var includeLevel = false; //l


    if (! await hasElevatedPermissions.run(client, message, adminOnly, sql)) return;

    let row = await sql.getUserRow(message.author.id);
    if (!row) { // Cannot Find Row
        return debug.log(`${message.author.username} does not exist in database.n`);
    }
    else { // Row Found
        if (row.clearance !== `admin`) {
            debug.log(`${message.author.username} does not have admin permissions`);
            return message.author.send(invalidPermission).catch(error => {
                debug.log(`${message.author.username} has DMs disabled.`);
                return message.channel.send(invalidPermission);
            });
        }
        let params = '';
        // Grab Options
        if (args[0] !== undefined) {
            params = args[0];
        }

        if ((params.indexOf('-')) || (params.length === 0) || (args[1] === undefined)) {
            return message.channel.send(`Either no params were passed, or you did not format your params correctly.`);
        }

        if (params.includes('F')) { //Format User Reply
            debug.log(`Setting Formatted Message Flag.`);
            formattedMessage = true;
        }
        if (params.includes('P')) { // Public Message Back
            debug.log(`Setting Public Message Flag.`);
            publicMessage = true;
        }
        if (params.includes('M')) { // Multiple User Lookup
            debug.log(`Setting Mutliple Users Flag.`);
            multipleUsers = true;
        }
        if (params.includes('A')) { // Include all Data
            debug.log(`Setting Include All Data Flag.`);
            includeAll = true;
        }
        else {
            if (params.includes('i')) { // Include UserID
                debug.log(`Setting Include UserID Flag.`);
                includeUserID = true;
            }
            if (params.includes('n')) { // Include UserName
                debug.log(`Setting Include Username Flag.`);
                includeUserName = true;
            }
            if (params.includes('b')) { // Include Battlecode
                debug.log(`Setting Include Battle Code Flag.`);
                includeBattlecode = true;
            }
            if (params.includes('f')) { // Include FavChip
                debug.log(`Setting Include FavChip Flag.`);
                includeFavChip = true;
            }
            if (params.includes('s')) { // Include Navi Symbol
                debug.log(`Setting Include Navi Symbol Flag.`);
                includeNaviSym = true;
            }
            if (params.includes('c')) { // Include Clearance Level
                debug.log(`Setting Include Clearance Level Flag.`);
                includeClearance = true;
            }
            if (params.includes('p')) { // Include Points
                debug.log(`Setting Include Points Flag.`);
                includePoints = true;
            }
            if (params.includes('l')) { // Include Level
                debug.log(`Setting Include Level Flag.`);
                includeLevel = true;
            }
        }

        let toCheck = '';
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
                    + `<@${config.ownerID}> and let him know.`);
            }
            else {
                // Build String
                if (formattedMessage) {
                    let reply = `SQL Data on: ${toCheck}\n`;
                    if (includeAll || includeUserID) {
                        reply = `${reply}Discord User ID:\n\t ${row.userID}\n`;
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
                    let reply = `SQL Data on: ${toCheck}\n`;
                    if (includeAll || includeUserID) {
                        reply = `${reply} ${row.userID};`;
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
                        return disabledDMs.run(message, `I am sorry, ${message.author}, I am unable to DM you.\n`
                            + `Please check your privacy settings and try again.`);
                    });
                }
            }
        } catch (error) {
            errorLog.run(error);
        }

    }
}

module.exports.help = {
    name: "lookup",
    description: ("looks for a particular user in the database"),
    permissionLevel: "admin"
}