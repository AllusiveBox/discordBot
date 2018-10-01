/*
    Command Name: getbattlecode.js
    Function: Returns a User's Battle Mate Code from the userinfo file
    Clearance: none
	Default Enabled: true
    Date Created: 11/04/17
    Last Updated: 09/30/18
    Last Update By: Th3_M4j0r

*/

// Load in Require Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const { debug } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);
const { run: dmCheck } = require(`../functions/dmCheck.js`);
const betterSql = require(`../classes/betterSql.js`);

const command = {
    bigDescription: ("Returns a mentioned user's battle code. If no user is "
        + "mentioned, it will return the command user's battle code instead."),
    description: "Returns the mentioned user's battle code, or the user's "
        + "if nobody is mentioned",
    enabled: true,
    fullName: "Get Battlecode",
    name: "getBattleCode",
    permissionLevel: "normal"
}


// Command Variables
const prefix = config.prefix;

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 * @param {betterSql} sql
 */
module.exports.run = async (bot, message, args, sql) => {
    // Debug to Console
    debug(`I am inside the ${command.name} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(name, message);
    }

    // DM Check
    if (dmCheck(message, name)) return; // Return on DM channel

    // Find out Who to Get Code Of
    let member = message.mentions.members.first();
    
    let reply = (`I am sorry, ${message.author}, ${member.user.username} `
            + `has yet to set their Battle Mate Code.`);

    if(!member) { //no member was mentioned, get author's battle code instead
        debug(`No member provided. Looking up code for `
            + `${message.author.username}`);
        member = message.member;
        reply = (`I am sorry, ${message.author}, you have yet to set `
        + `your Battle Mate Code.\n`
        + `To set your code, use the ${prefix}setBattleCode command.`);

    } else { //member was mentioned
        debug(`Looking up code for ${member.user.username}.`);
    }

    let row = await sql.getUserRow(message.author.id);
    if (!row) { // If Row Not Found...
        debug(`${member.user.username} does not exist in the database.`
            + `Unable provide a battle code.`);
        return message.channel.send(reply);
    }
    let battleCode = row.battleCode;
    if(!battleCode) {
        debug(`${member.user.username} has not yet set their code.`);
        return message.channel.send(reply);
    }

    //battleCode was set

    debug(`Generating message with ${member.user.username}'s `
                + `battlecode.`);
    return message.channel.send(`${row.userName}'s Battle Mate Code:\n`
                    + `\`\`\`\t${battleCode}\`\`\``);
}

module.exports.help = command;
