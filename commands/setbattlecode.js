/*
    Command Name: setbattlecode
    Function: Set's a user's Battle Mate Code in the userinfo file
    Clearance: none
  	Default Enabled: true
    Date Created: 11/04/17
    Last Updated: 09/06/18
    Last Update By: Th3_M4j0r

*/

// Load in Require Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const disabledDMs = require(`../functions/disabledDMs.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const errorLog = require(`../functions/errorLog.js`);
const validate = require(`../functions/validate.js`);

// Command Variables
/**
 * @type {Set<Discord.Snowflake>}
 */
const commandUsed = new Set();

/**
 * @type {string}
 */
const prefix = config.prefix;

// Misc. Variables
const name = "Set Battlecode";


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {sqlite} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Update Command Prefix
    prefix = config.prefix;

    // Enabled Command Test
    if (!enabled.setbattlecode) {
        return disabledCommand.run(name, message);
    }

    // Get the Battlecode
    var battleCode = args.join(' ').toUpperCase();

    // Check if Battlecode is Valid
    validCode = validate.validateBattleCode(battleCode);

    if (!validCode) { // If Code is Not Valid...
        debug.log(`Invalid Code by ${message.author.username}. Code ${battleCode} `
            + `is not valid.`);

        // Build the Reply Message
        let reply = (`I am sorry, ${message.author}, that is an invalid code `
            + `format.\n`
            + `Valid characters are the numbers 0 - 9, and the characters A - E`);
        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    }
    // IF Code Was Valid...
    debug.log(`Setting the Battlecode for ${message.author.username} to `
        + `${battleCode}.`);

    // SQL Stuff
    let row = await sql.get(`SELECT * FROM userinfo WHERE userId = "${message.author.id}"`);
    if (!row) { // If Row Not Found...
        debug.log(`${message.author.username} does not exist in the `
            + `database`);

        // Build the Reply Message
        let reply = (`I am sorry, ${message.author}, I am unable to `
            + `locate you in the userinfo database. Please wait a few seconds `
            + `and then try again.\n`
            + `If you continue to see this message, please alert `
            + `${config.about.author}`);

        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    }
    // Else Row Was Found...
    if ((row.optOut === 1) && (!commandUsed.has(message.author.id))) {
        // If User Opts Out...
        debug.log(`${message.author.username} does not wish for data to `
            + `be collected. Generating reply now.`);

        // Update the Set
        commandUsed.add(message.author.id);
        setTimeout(() => {
            // Removes User from the Set after 60000 Seconds (1 Minte)
            commandUsed.delete(message.author.id);
        }, 60000);

        // Build the Reply Message
        let reply = (`${message.author}, you currently have opted out`
            + ` of data collection.\n`
            + `If you really want to store your battlecode, use this command `
            + `again. Otherwise, no data will be stored.`);

        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    } // User Allows Data Collection...
    debug.log(`Attempting to Update ${message.author.username}'s `
        + `Battlecode.`);
    try {
        await sql.run(`UPDATE userinfo SET battlecode = "${battleCode}" WHERE `
            + `userId = "${message.author.id}"`)
    } catch (error) {
        errorLog.log(error);

        // Build the Reply Message
        let reply = (`I am sorry, ${message.author}, an `
            + `unexpected error occured. Please wait a few seconds and `
            + `then try again.\n`
            + `If you continue to see this message, please alert `
            + `${config.about.author}`);

        return message.author.send(reply).catch(error => {
            disabledDMs.run(message, reply);
        });
    }

    // Build the Reply Message
    let reply = (`${message.author}, your battlecode has been `
        + `updated to: ${battleCode}`);

    message.author.send(reply).catch(error => {
        disabledDMs.run(message, reply);
    });

    return debug.log(`Battlecode successfully updated.`);
}

module.exports.help = {
    name: "setbattlecode",
    description: ("Allows a user to set their battlecode, which can be fetched "
        + `which can be fetched with the ${prefix}getBattleCode command.`)
}
