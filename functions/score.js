/**

    cxBot.js Mr. Prog Score Script
    Version: 3
    Author: AllusiveBox
    Date Started: 08/11/18
    Date Last Updated: 10/07/18
    Last Update By: Th3_M4j0r

**/

// Load in required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: changeRole } = require(`../functions/changeRole.js`);
const betterSql = require(`../classes/betterSql.js`);

/**
 * 
 * Score throttling
 * 
 * @type {Set<Discord.Snowflake>}
 */
const talkedRecently = new Set();

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {betterSql} sql
 */
module.exports.run = async (bot, message, sql) => {
    // Debug to Console
    debug(`I am inside the Score System`);

    if (!config.score) return debug(`Score System Disabled.`);

    if (talkedRecently.has(message.author.id)) return debug(`Throttled `
        + `${message.author.username}.`);

    talkedRecently.add(message.author.id)
    setTimeout(() => {
        // Remove User from Set after 30 Seconds
        talkedRecently.delete(message.author.id);
    }, 30000);

    // Begin Score System
    try {
        //while(!sql._dbOpen) {} //wait for the db to be open
        let row = await sql.getUserRow(message.author.id);
        if (!row) { // If Row Not Found...
            debug(`Row was not found for ${message.author.username}. `
                + `Generating data now...`);
            sql.insertUser(message.author.id, message.author.username);
        } else { // If Row Was Found...
            if (row.optOut === 1) {
                debug(`User does not want data collected.`);
                return;
            }

            debug(`Row found for ${message.author.username}.`);
            let name = message.author.username;
            try {
                name = message.guild.members.get(message.author.id).nickname;
                if (!name) name = message.author.username;
                debug(`Name set to: ${name}`);
            }
            catch (error) {
                name = message.author.username;
                debug(`Unable to get Nickname. Name set to: ${name}`);
            }

            // Increase Points by 1
            let curLevel = Math.floor(0.142 * Math.sqrt(row.points + 1));
            debug(`Checking if Leveled Up.`);
            if (curLevel > row.level) { // If Current Level > Actual Level...
                row.level = curLevel;
                debug(`${message.author.username} has leveled up. Generating `
                    + `level up message.`);
                message.channel.send(`Congratulations, ${name}, you've just reached `
                    + `level **${curLevel}**!`);
                // TODO When finished, Enable changeRole call here
                changeRole(bot, message, curLevel);
            }

            debug(`Updating userinfo file.`);
            sql.setPoints(message.author.id, row.points + 1, row.level, name);
        }

    } catch (error) {
        await sql.run("CREATE TABLE IF NOT EXISTS userinfo (userId TEXT NOT NULL, "
            + "userName TEXT, battlecode TEXT, favechip TEXT, navi TEXT, "
            + "clearance TEXT, points INTEGER, level INTEGER, optOut INTEGER, "
            + "PRIMARY KEY (userId))");
        message.channel.send(`ERROR CAUSED BY: ${message.author}.`);
        return errorLog(error);
    }
}
