/*
    Command Name: petmax.js
    Function: Counts How Many Times Max has been Pet
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 09/15/18
    Last Updated By: AllusiveBox

*/

// Load in Required Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const errorLog = require(`../functions/errorLog.js`);

// Command Variables

// Misc. Variables
const name = "Pet Max";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */

module.exports.run = async (bot, message) => {
    // Debug to Console
    debug.log(`I am inside the ${name} command.`);

    // Enabled Command Test
    if (!enabled.petmax) {
        return disabledCommand.run(name, message);
    }

    // Get Counter
    try {
        let counter = require(`../files/counter.json`);
    }
    catch (error) {
        errorLog.log(error);
        // Build the Reply
        let reply = (`No counter.json file was able to be located. `
            + `Please ensure that there is a files/counter.json file and that it `
            + `is in the right directory.`);
        debug.log(reply);
        return message.channel.send(reply);
    }

    // Debug Before
    debug.log(`Previous max.total: ${counter.max.total}.`);

    // Increase Counter
    counter.max.total++;

    // Debug After
    debug.log(`New max.total: ${counter.max.total}.`);

    // Save Edited File
    fs.writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            errorLog.run(error);
            return message.channel.send(`I am sorry, ${message.author}, there was an unexpected error. I was unable to pet Max...`);
        }
    });

    // Save Successful
    debug.log(`Successfully saved!`);

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

module.exports.help = {
    name: "petmax",
    description: "Give Max a pat on the head!",
    permissionLevel: "normal"
}

/**
 * 
 * @param {int} newCount
 * @param {Discord.Message} message [OPTIONAL]
 */

module.exports.setCount = async (newCount, message) => {
    // Debug to Console
    debug.log(`I am inside the petmax.setCount functon.`);

    // Get Counter
    try {
        let counter = require(`../files/counter.json`);
    }
    catch (error) {
        errorLog.log(error);
        // Build the Reply
        let reply = (`No counter.json file was able to be located. `
            + `Please ensure that there is a files/counter.json file and that it `
            + `is in the right directory.`);
        debug.log(reply);
        return message.channel.send(reply);
    }

    counter.max.total = newCount;
    // Save Edited File
    fs.writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            errorLog.run(error);
            if (message) {
                return message.channel.send(`I was unable to update the counter. Please check the error log.`);
            } else {
                return;
            }
        }
    });

    if (message) {
        return message.channel.send(`counter.max.total set to: ${counter.max.total}`);
    } else {
        return;
    }

}

/**
 * 
 * @param {Discord.Message} message [OPTIONAL]
 */

module.exports.getCount = async (message) => {
    // Debug to Console
    debug.log(`I am inside the petmax.getCount function.`);

    // Get Counter
    try {
        let counter = require(`../files/counter.json`);
    }
    catch (error) {
        errorLog.log(error);
        // Build the Reply
        let reply = (`No counter.json file was able to be located. `
            + `Please ensure that there is a files/counter.json file and that it `
            + `is in the right directory.`);
        debug.log(reply);
        return message.channel.send(reply);
    }

    // Build the Reply
    let reply = `Current counter.max.total is: ${counter.max.total}`;

    if (message) {
        return message.channel.send(reply);
    } else {
        return debug.log(reply);
    }
}