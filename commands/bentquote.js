/*
    Command Name: bentquote.js
    Function: Returns a Random Bent Quote from Array
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/15/18
    Last Update By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables
var text = fs.readFileSync(`./files/bentcomments.txt`, `utf8`);
var bentComments = text.split(`\n`);
var lastNum;
var rando;

// Misc. Variables
const name = "BentQuote";


/**
 *
 * @param {Number} min
 * @param {Number} max
 */
function randomIntFrom(min, max) {
    while (rando === lastNum) { // Loop Until New Number...
        rando = Math.floor(Math.random() * (max - min + 1) + min);
    }
    debug.log(`Setting rando to: ${rando}`);
    return rando;
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
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.bentquote) {
        return disabledCommand.run(name, message);
    }

    // Create the BentQuote Array
    if (!bentComments) { // If Not Bent Comments Defined...
        let reply = (`No bentquote.txt file was able to be located. `
            + `Please ensure that there is a files/bentquote.txt file and that it `
            + `is in the right directory.`);
        enabled.bentquote = false;
        debug.log(reply);
        return message.channel.send(reply);
    }

    // let bentComments = text.split(`\n`);
    // var text = fs.readFileSync(`./files/bentcomments.txt`, `utf8`);
    // if (!text) {
    //   debug.log(`No BentQuotes have been loaded in...`);
    //   return message.channel.send(`No BentQuotes can be found...`);
    // } else {
    //   let bentComments = text.split(`\n`);
    // }

    // Determine if Arguments were Passed With the Command...
    if ((args[0] && (isInt(args[0])))) { // If BentQuote Number Provided...
        if ((args[0] > bentComments.length) || (args[0] <= 0)) { // If Out of Range
            debug.log(`Number was out of range. Generating Random Number.`);

            // Assign Random Num Value
            rando = randomIntFrom(0, bentComments.length - 1);
        } else { // If Number In Range...
            rando = args[0] - 1;
            debug.log(`Setting rando to: ${rando}`);
        }
    } else { // If BentQuote Number Not Provided...
        // Assign Random Number Value
        rando = randomIntFrom(0, bentComments.length - 1);
    }

    // Return the BentQuote
    debug.log(`Generating BentQuote for ${message.author.username}.`);
    message.channel.send(`BentQuote #${rando + 1}: ${bentComments[rando]}`);
    return lastNum = rando;
}

module.exports.help = {
    name: "bentquote",
    description: ("Returns a random quote."),
    permissionLevel: "normal"
}

module.exports.getBentComments = function (num) {
    if ((num) && (isInt(num))) {
        if ((num > bentComments.length) || (num <= 0)) {
            return bentComments;
        } else {
            return bentComments[num + 1]
        }
    } else {
        return bentComments;
    }
}
