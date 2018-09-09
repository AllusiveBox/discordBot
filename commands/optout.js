/*
    Command Name: optout.js
    Function: opt out from data collection
    Clearance: none
	Default Enabled: Cannot be disabled 
    Date Created: 09/08/18
    Last Updated: 09/08/18
    Last Update By: Th3_M4j0r

*/


// Load in Required Files
const config = require(`../files/config.json`);
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const betterSql = require(`../functions/betterSql.js`);

// Command Required Files

// Misc. Variables
const name = "Opt-Out";


/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {?string[]} [args]
 * @param {betterSql} sql
 */
module.exports.run = async (bot, message, args, sql) => {

    // Debug to Console Log
    debug.run(`I am inside the ${name} Command.`);

    let row = sql.getUserRow(message.author.id);

    if (!row) {
        debug.run(`Unable to locate any data for ${message.author.username}.`);
    }



    //SQL Stuff
    /*sql.get(`SELECT * FROM userinfo WHERE userId = "${message.author.id}"`).then(row => {
        if (!row) { // Cannot Find Row

            debug.run(`Unable to locate any data for ${message.author.username}.`);
            return message.author.send(`I am unable to locate any data on you. Please try again.`).catch(error => {
                debug.run(`${message.author.username} has DMs disabled.`);
                return message.channel.send(`I am sorry, ${message.author}, I am unable to DM you.\n`
                    + `Please check your privacy settings and try again.`);
            });
        }
        else { // Row Found

            if (row.clearance !== null) { // If Clearance isn't Null
                sql.run(`UPDATE userinfo SET clearance = null WHERE userId = ${message.author.id}`);
                return message.author.send(`I have updated your preferences, ${message.author}. If you wish to opt-in for data collection `
                    + `please use the !optIn command.`).catch(error => {
                        debug.run(`${message.author.username} has DMs disabled.`);
                        return message.channel.send(`I have updated your preferences, ${message.author}. If you wish to opt-in for data collection `
                            + `please use the !optIn command.`);
                    });
            }
            else { // Clearance is Null
                debug.run(`${message.author.username} attempted to opt-out while already opted out.`);
                return message.author.send(`You are already opted out, ${message.author}. To opt back in, use the !optIn command.`).catch(error => {
                    debug.run(`${message.author.username} has DMs disabled.`);
                    return message.channel.send(`You are already opted out, ${message.author}. To opt back in, use the !optIn command.`);
                });
            }

        }
    });*/

}