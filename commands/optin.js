/*
    Command Name: optin.js
    Function: Allows a User to Opt-In to data collection
    Clearance: none
	Default Enabled: Cannot be Disabled
    Date Created: 05/23/18
    Last Updated: 09/09/18
    Last Updated By: Th3_M4j0r
*/

// Load in Required Files
const config = require(`../files/config.json`);
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const disabledDMs = require(`../functions.disabledDMs.js`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const betterSql = require(`../functions/betterSql.js`);

// Command Required Files

// Misc. Variables
const name = "Opt-In";

/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {?string[]} [args]
 * @param {betterSql} sql
 */
module.exports.run = async (client, message, args, sql) => {

    // Debug to Console Log
    debug.run(`I am inside the ${name} Command.`);

    let row = await sql.getUserRow(message.author.id);

    if (!row) {
        debug.run(`Unable to locate any data for ${message.author.username}.`);
        let reply = `I am unable to locate any data on you. Please try again.`;
        return message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    }


    if (row.optOut === 0) { //if opted-in already
        debug.run(`${message.author.username} attempted to opt-in while already opted in.`);
        let reply = `You are already opted in, ${message.author}. `
         + `To opt out, use the ${config.prefix}optOut command.`;
        return message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    }

    //else 

    debug.run(`${message.author.username} is being opted in, resetting everything`);
    await sql.optInUser(message.author.id);
    if(row.points === null) { //if points are null, reset everything
        await sql.setPoints(message.author.id, 0, 0, message.author.username);
        await sql.setBattleCode(message.author.id, "0000-0000-0000");
        await sql.setNavi(message.author.id, "megaman");
    }

    let reply = `I have updated your preferences, ${message.author}. If you wish to opt-out of future data collection `
    + `please use the ${config.prefix}optOut command.`;
    return message.author.send(reply).catch(error => {
        return disabledDMs.run(message, reply);
    });

}


module.exports.help = {
    name: "optin",
    description: "Allows a user to opt out of data collection."
}