/*
    Command Name: profile.js
    Function: Returns all data the bot has on a user in a DM.
    Clearance: none
	Default Enabled: Cannot be Disabled
    Date Created: 05/22/18
    Last Updated: 09/09/18
    Last Update By: Th3_M4j0r
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
const name = "Profile";

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
    if (!row) { // Cannot Find Row
        debug.run(`Unable to locate any data for ${message.author.username}.`);
        let reply = `I am unable to locate any data on you. Please try again.`;
        return message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    }
    //else found row

    if(row.optOut === 1) {
        debug.run(`${message.author.username} does not wish for data to be collected.`);
        let reply = `I am sorry, ${message.author}, I do not have any information on you due to your configurations.\n`
        + `If you wish to allow me the ability to keep data on you, please use the ${config.prefix}optIn command.`;
        return message.author.send(reply).catch(error => {
            return disabledDMs.run(message, reply);
        });
    }

    debug.run(`Generating userData for ${message.author.username}`);
    
    let userProfile = `${message.author}, this is the data that I have collected on you:\n`
    + `userID: ${row.userID} (This data is provided by Discord's API. It is public data)\n`
    + `userName: ${row.userName} (This is stored to keep up with nicknames. Updates every time you increase point count. It is public data)\n`
    + `battlecode: ${row.battlecode} (Set by you, the user, using the !setBC or !setBattlecode command)\n`
    + `favechip: ${row.favechip} (Feature coming soon! Maybe.)\n`
    + `navi: ${row.navi} (The Navi Symbol that displays when you use !stats)\n`
    + `clearance: ${row.clearance} (What bot permissions you have. null/none are normal users, mod and admin are as the title suggest)\n`
    + `points: ${row.points} (Your current amount of points in the server. 1 point is gained every 30 seconds when you make a post)\n`
    + `level: ${row.level} (Your current level. Each level has a number of points necessary to reach the next)\n\n`
    + `To prevent me from collecting information on you, use the ${config.prefix}optOut command.\n`
    + `To have me delete all the data I have on you, use the ${config.prefix}deleteMe command. (**Note: This won't change your opt-out status**)\n`
    + `**WARNING:** Use of the ${config.prefix}deleteMe command will _permanently_ delete all data recorded on you, with no way to restore it.`;

    if(config.debug) {
        return message.channel.send(userProfile);
    } else {
        return message.author.send(userProfile).catch(error => {
            return disabledDMs.run(message, `I am sorry, ${message.author}, I am unable to DM you.\n`
            + `Please check your privacy settings and try again.`);
        });
    }
}

module.exports.help = {
    name: "profile",
    description: "Sends a user all data stored on them"
}