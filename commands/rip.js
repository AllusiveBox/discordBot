/*
    Command Name: rip.js
    Function: Pays respect to fallen Mr. Progs
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/17/17
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const enabled = require(`../files/enabled.json`);
const log = require(`../functions/log.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
;

// Command Stuff
const command = {
    bigDescription: ("Use this command to increase the rip counter. \n"
        + "This command will generate a reply in the channel it was used in."),
    description: "Pay respect to fallen Progs",
    enabled: enabled.rip,
    counter: getCounter(),
    name: "rip",
    permissionLevel: "normal"
}

/**
 * 
 * @param {Discord.Message} [message]
 */

function getCounter(message) {
    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        log.error(error);

        // Build the Reply
        let reply = (`No counter.json file was able to be located. `
            + `Please ensure that there is a files/counter.json file and that it `
            + `is in the right directory.`);
        log.debug(reply);
        if (message) { // If Message Param Passed...
            message.channel.send(reply);
        }
        return false;
    }
    return counter;
}

function getCount(message) {
    // Debug to Console
    log.debug(`I am inside the rip.getCount function.`);

    let reply = `Current counter.rip.total is: ${command.counter.rip.total}`;

    if (message) {
        return message.channel.send(reply);
    } else {
        return log.debug(reply);
    }
}

/**
 * 
 * @param {int} [newCount]
 * @param {Discord.Message} [message]
 */

function setCount(newCount = null, message) {
    // Debug to Console
    log.debug(`I am inside the rip.setCount function.`);

    // Get the Counter
    let counter = command.counter;

    // Debug Before
    log.debug(`Previous counter.rip.total: ${counter.rip.total}`);


    if (newCount === null) { // If No newCount passed...
        // Increase RIP Count
        counter.rip.total++;
    } else {
        counter.rip.total = newCount;
    }

    // Debug After
    log.debug(`New counter.rip.total: ${counter.rip.total}`);

    // Save Edited File
    fs.writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            log.error(error);
            if (message) { // If Message Param Passed...
                message.channel.send(`I am sorry, ${message.author}, there was an unexpected error. I was unable to pay respect to fallen progs...`);
            }
            return false;
        }
    });
    // Save Successful
    log.debug(`Successfully saved!`);

    // Update command.counter
    command.counter = counter;
    return true;
}

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    log.debug(`I am inside the ${command.name} command.`);

    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand.run(command.name, message);
    }

    // Get Counter
    let counter = command.counter;

    // Check if Counter is Valid
    if (!counter) return;

    // Update the Counter
    setCount();

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