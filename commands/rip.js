/*
    Command Name: rip.js
    Function: Pays respect to fallen Mr. Progs
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/17/17
    Last Updated: 10/13/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const config = require(`../files/config.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const { run: disabledCommand } = require(`../functions/disabledCommand.js`);

// Command Stuff
const command = {
    bigDescription: ("Use this command to increase the rip counter.\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Pay respect to fallen Progs",
    enabled: true,
    fullName: "RIP",
    name: "rip",
    permissionLevel: "normal"
}

/**
 * 
 * @param {?Discord.Message} [message]
 */

function getCounter(message) {
    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        errorLog(error);
        return message.channel.send(`*${error.toString()}*`);
    }

    return counter;
}

function getCount(message) {
    // Debug to Console
    debug(`I am inside the rip.getCount function.`);

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        errorLog(error);
        return message.channel.send(`*${error.toString()}*`);
    }

    // Build the Reply
    let reply = `Current counter.rip.total is: ${counter.rip.total}`;

    if (message) {
        return message.channel.send(reply);
    } else {
        return debug(reply);
    }
}

/**
 * 
 * @param {int} [newCount]
 * @param {Discord.Message} [message]
 */

function setCount(newCount, message) {
    // Debug to Console
    debug(`I am inside the rip.setCount function.`);

    // Get the Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        errorLog(error);
        let reply = (`No counter.json file was able to be located. `
            + `Please ensure that there is a files/counter.json file and that it `
            + `is in the right directory.`);
        debug(reply);
        return message.channel.send(reply);
    }

    counter.rip.total = newCount;

    // Save Edited File
    fs.writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            errorLog(error);
            if (message) { // If Message Param Passed...
                return message.channel.send(`*${error.toString()}*`);
            }
            return;
        }
    });
    // Save Successful
    return debug(`Successfully saved!`);
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug(`I am inside the ${command.name} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.name, message);
    }

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        errorLog(error);
        return message.channel.send(`*${error.toString()}*`)
    }

    counter.rip.total++;

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
    let reply = `${counter.rip.total} `;

    if (counter.rip.total > 1) {
        reply = (reply + "people have paid respect to fallen Mr. Progs.");
    } else if (counter.rip.total === 1) {
        reply = (reply + "person has paid respect to fallen Mr. Progs.");
    } else {
        reply = `How did you get here, ${message.author}? Please don't do that again.`;
    }

    return message.channel.send(reply);
}

module.exports.help = command;
module.exports.getCount = getCount;
module.exports.setCount = setCount;