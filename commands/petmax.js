/*
    Command Name: petmax.js
    Function: Counts How Many Times Max has been Pet
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 10/13/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const fs = require(`fs`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);

// Command Variables
const command = {
    bigDescription: ("Give Max a pat on the head!\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Give Max a pat on the head!",
    enabled: true,
    fullName: "Pet Max",
    name: "petmax",
    permissionLevel: "normal"
}


/**
 * 
 * @param {int} newCount
 * @param {Discord.Message} [message]
 */
function setCount(newCount, message) {
    // Debug to Console
    debug(`I am inside the petmax.setCount functon.`);

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        errorLog(error);
        return message.channel.send(`*${error.toString()}*`);
    }

    counter.max.total = newCount;

    // Save Edited File
    fs.writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            errorLog(error);
            if (message) {
                return message.channel.send(`*${error.toString()}*`);
            } else {
                return;
            }
        }
    });

    // Save Successful
    return debug(`Successfully saved!`);
}

/**
 * 
 * @param {Discord.Message} [message]
 */

function getCount(message) {
    // Debug to Console
    debug(`I am inside the petmax.getCount function.`);

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        errorLog(error);
        return message.channel.send(`*${error.toString()}*`);
    }

    // Build the Reply
    let reply = `Current counter.max.total is: ${counter.max.total}`;

    if (message) {
        return message.channel.send(reply);
    } else {
        return debug(reply);
    }
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    }
    catch (error) {
        errorLog(error);
        // Build the Reply
        let reply = (`No counter.json file was able to be located. `
            + `Please ensure that there is a files/counter.json file and that it `
            + `is in the right directory.`);
        debug(reply);
        return message.channel.send(reply);
    }

    // Increase Counter
    counter.max.total++;

    // Save Edited File
    fs.writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            errorLog(error);
            return message.channel.send(`*${error.toString()}*`);
        }
    });

    // Save Successful
    debug(`Successfully saved!`);

    // Build the Reply
    let reply = `${counter.max.total} `;
    if (counter.max.total > 1) {
        reply = (reply + "people have given Max a pat on the head.\n"
            + "Max is a good boy. Yes he is.");
    } else if (counter.max.total === 1) {
        reply = (reply + "person has given Max a pat on the head.");
    } else {
        reply = `How did you get here, ${message.author}? Please, don't do that again.`;
    }

    return message.channel.send(reply);
}

module.exports.help = command;

module.exports.setCount = setCount;
module.exports.getCount = getCount;