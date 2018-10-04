/*
    Command Name: optin.js
    Function: Allows a User to Opt-In to data collection
    Clearance: none
	Default Enabled: Cannot be Disabled
    Date Created: 05/23/18
    Last Updated: 10/03/18
    Last Updated By: Th3_M4j0r
*/

// Load in Required Files
const config = require(`../files/config.json`);
const Discord = require(`discord.js`);
const { run: disabledDMs } = require(`../functions/disabledDMs.js`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const betterSql = require(`../classes/betterSql.js`);

// Command Required Files
const command = {
    bigDescription: ("Allows a user to opt back into data collection."),
    description: "Opts back in for data collection",
    enabled: null,
    fullName: "Opt-In",
    name: "optIn",
    permissionLevel: "normal"
}


/**
 * 
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {?string[]} [args]
 * @param {betterSql} sql
 */
module.exports.run = async (client, message, args, sql) => {

    // Debug to Console Log
    debug(`I am inside the ${command.fullName} Command.`);

    let row = await sql.getUserRow(message.author.id);

    if (!row) {
        debug(`Unable to locate any data for ${message.author.username}.`);
        let reply = `I am unable to locate any data on you. Please try again.`;
        return message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    }


    if (row.optOut === 0) { //if opted-in already
        debug(`${message.author.username} attempted to opt-in while already opted in.`);
        let reply = `You are already opted in, ${message.author}. `
         + `To opt out, use the ${config.prefix}optOut command.`;
        return message.author.send(reply).catch(error => {
            return disabledDMs(message, reply);
        });
    }

    //else 

    debug(`${message.author.username} is being opted in, resetting everything`);
    await sql.optInUser(message.author.id);
    if(row.points === null) { //if points are null, reset everything
        await sql.setPoints(message.author.id, 0, 0, message.author.username);
        await sql.setBattleCode(message.author.id, "0000-0000-0000");
        await sql.setNavi(message.author.id, "megaman");
    }

    let reply = `I have updated your preferences, ${message.author}. If you wish to opt-out of future data collection `
    + `please use the ${config.prefix}optOut command.`;
    return message.author.send(reply).catch(error => {
        return disabledDMs(message, reply);
    });

}


module.exports.help = command;