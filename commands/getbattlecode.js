/*
    Command Name: getbattlecode.js
    Function: Returns a User's Battle Mate Code from the userinfo file
    Clearance: none
	Default Enabled: true
    Date Created: 11/04/17
    Last Updated: 08/30/18
    Last Update By: AllusiveBox

*/

// Load in Require Files
const discord = require(`discord.js`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const dmCheck = require(`../functions/dmCheck.js`);
const errorLog = require(`../functions/errorLog.js`);

// Command Variables

// Misc. Variables
const name = "Get Battlecode";


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {sqlite} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.getbattlecode) {
        return disabledCommand.run(name, message);
    }

    // DM Check
    if (await dmCheck.run(message, name)) return; // Return on DM channel

    // Find out Who to Get Code Of
    var member = message.mentions.members.first();

    if (!member) { // If No Member Mentioned...
        debug.log(`No member provided. Looking up code for `
            + `${message.author.username}`);

        // Get the Current Command Prefix
        let prefix = config.prefix;

        // Build the Reply Message
        let reply = (`I am sorry, ${message.author}, you have yet to set `
            + `your Battle Mate Code.\n`
            + `To set your code, use the ${prefix}setBattleCode command.`);

        // SQL Stuff
        sql.get(`SELECT * FROM userinfo WHERE userId = "${message.author.id}"`)
            .then(row => {
                if (!row) { // If Row Not Found...
                    debug.log(`${message.author.username} does not exist in the database.`
                        + `Unable provide a battle code.`);
                    return message.channel.send(reply);
                } else { // If Row Was Found...
                    var battleCode = row.battlecode;
                    if (!battleCode) { // If No Battlecode Set...
                        debug.log(`${message.author.username} has not yet set their code.`);
                        return message.channel.send(reply);
                    } else { // If Battlecode Was Set...
                        debug.log(`Generating message with ${message.author.username}'s `
                            + `battlecode.`);
                        return message.channel.send(`${row.userName}'s Battle Mate Code:\n`
                            + `\`\`\`\t${battleCode}\`\`\``);
                    }
                }
            });
    } else { // If Member Was Mentioned...
        debug.log(`Looking up code for ${member.user.username}.`);

        // Get the Current Command Prefix
        let prefix = config.prefix;

        // Build the Reply Message
        let reply = (`I am sorry, ${message.author}, ${member.user.username} `
            + `has yet to set their Battle Mate Code.`);

        //SQL Stuff
        sql.get(`SELECT * FROM userinfo WHERE userId = "${member.id}"`).then(row => {
            if (!row) { // If Row Not Found...
                debug.log(`${memember.user.username} does not exist in database.`);
                return message.channel.send(reply);
            } else { // Ir Row Was Found...
                var battleCode = row.battlecode;
                if (!battleCode) { // If No Battle Code Set...
                    debug.log(`${member.user.username} has not yet set their code.`);
                    return message.channel.send(reply);
                } else { // If Battle Code Was Set...
                    debug.log(`Generating message with ${member.user.username}'s `
                        + `battlecode.`);
                    return message.channel.send(`${row.userName}'s Battle Mate Code:\n`
                        + `\`\`\`\t${battleCode}.\`\`\``);
                }
            }
        });
    }
}

module.exports.help = {
    name: "getbattlecode",
    description: ("Returns a mentioned user's battle code. If no user is "
        + "mentioned, it will return the command user's battle code instead.")
}
