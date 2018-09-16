/*
    Command Name: petwinds.js
    Function: Like petmax.js, but for Winds
    Clearance: None
	Default Enabled: Yes
    Date Created: 07/31/18
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
const name = "Pet Winds";

/**
 * 
 * @param {int} newCount
 * @param {Discord.Message} [message]
 */

function setCount(newCount, message) {
    // Debug to Console
    debug.log(`I am inside the petwinds.setCount functon.`);

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
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

    counter.winds.pets = newCount;
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
        return message.channel.send(`counter.winds.pets set to: ${counter.winds.pets}`);
    } else {
        return;
    }
}

/**
 * 
 * @param {Discord.Message} [message]
 */

function getCount(message) {
    // Debug to Console
    debug.log(`I am inside the petmax.getCount function.`);

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
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
    let reply = `Current counter.winds.pets is: ${counter.winds.pets}`;

    if (message) {
        return message.channel.send(reply);
    } else {
        return debug.log(reply);
    }
}

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
        var counter = require(`../files/counter.json`);
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
    debug.log(`Previous winds.pets: ${counter.winds.pets}.`);

    // Increase Counter
    counter.max.total++;

    // Debug After
    debug.log(`New winds.pets: ${counter.winds.pets}.`);

    // Save Edited File
    fs.writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            errorLog.run(error);
            return message.channel.send(`I am sorry, ${message.author}, there was an unexpected error. I was unable to pet Winds...`);
        }
    });

    // Save Successful
    debug.log(`Successfully saved!`);

    // Build the Reply
    let reply = (`Winds has been given ${counter.winds.pets} head pats.\n`
        + `You guys are weird...`);

    return message.channel.send(reply);
}

module.exports.help = {
    name: "petwinds",
    description: "Give Winds a pat on the head!",
    permissionLevel: "normal"
}

module.exports.setCount = setCount;
module.exports.getCount = getCount;