/*
    Command Name: bentquote.js
    Function: Returns a Random Bent Quote from Array
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/22/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const CustomErrors = require(`../classes/CustomErrors.js`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables
try {
    var text = fs.readFileSync(`./files/bentcomments.txt`, `utf8`);
} catch (error) {
    throw new CustomErrors.NoBentQuotesDefined();
}

const command = {
    bentComments: text.split(`\n`),
    bigDescription: ("This command is used to get funny quotes that have been said in the server."
        + "Arguments:\n\t"
        + "{int} -> An Integer that represents the quote number you wish to receive."
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Get a funny quote that was said in the server.",
    enabled: true,
    fullName: "Bent Quote",
    name: "bentquote",
    lastNum: null,
    permissionLevel: "none",
    rando: null
}


/**
 *
 * @param {Number} min
 * @param {Number} max
 */
function randomIntFrom(min, max) {
    while (rando === lastNum) { // Loop Until New Number...
        command.rando = Math.floor(Math.random() * (max - min + 1) + min);
    }
    log.debug(`Setting rando to: ${command.rando}`);
    return command.rando;
}


/**
 * @param {any} value
 */
function isInt(value) {
    if (isNaN(value)) return false;
    return true;
}

/**
 * 
 * @param {int} num
 */

function getBentComments(num) {
    if ((num) && (isInt(num))) {
        if ((num > command.bentComments.length) || (num <= 0)) {
            return command.bentComments;
        } else {
            return command.bentComments[num + 1]
        }
    } else {
        return command.bentComments;
    }
}


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    log.debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!enabled.bentquote) {
        return disabledCommand.run(command.fullName, message);
    }

    // let bentComments = text.split(`\n`);
    // var text = fs.readFileSync(`./files/bentcomments.txt`, `utf8`);
    // if (!text) {
    //   log.debug(`No BentQuotes have been loaded in...`);
    //   return message.channel.send(`No BentQuotes can be found...`);
    // } else {
    //   let bentComments = text.split(`\n`);
    // }

    // Determine if Arguments were Passed With the Command...
    if ((args[0] && (isInt(args[0])))) { // If BentQuote Number Provided...
        if ((args[0] > bentComments.length) || (args[0] <= 0)) { // If Out of Range
            log.debug(`Number was out of range. Generating Random Number.`);

            // Assign Random Num Value
            rando = randomIntFrom(0, bentComments.length - 1);
        } else { // If Number In Range...
            rando = args[0] - 1;
            log.debug(`Setting rando to: ${rando}`);
        }
    } else { // If BentQuote Number Not Provided...
        // Assign Random Number Value
        rando = randomIntFrom(0, bentComments.length - 1);
    }

    // Return the BentQuote
    log.debug(`Generating BentQuote for ${message.author.username}.`);
    message.channel.send(`BentQuote #${rando + 1}: ${bentComments[rando]}`);
    return lastNum = rando;
}

module.exports.help = {
    name: "bentquote",
    description: ("Returns a random quote."),
    permissionLevel: "normal"
}

module.exports.getBentComments = getBentComments;