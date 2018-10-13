/*
    Command Name: petwinds.js
    Function: Like petmax.js, but for Winds
    Clearance: None
	Default Enabled: Yes
    Date Created: 07/31/18
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
    bigDescription: ("Give Winds a pat on the head!\n"
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Give Winds a pat on the head!",
    enabled: true,
    fullName: "Pet Winds",
    name: "petwinds",
    permissionLevel: "normal"
}


// Misc. Variables
const name = "Pet Winds";

/**
 * 
 * @param {int} newCount
 * @param {Discord.Message} [message]
 */

function setCount(newCount, message) {
    // Debug to Console
    debug(`I am inside the petwinds.setCount functon.`);

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        errorLog(error);
        return message.channel.send(`*${error.toString()}*`);
    }

    counter.winds.pets = newCount;

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
    debug(`I am inside the petmax.getCount function.`);

    // Get Counter
    try {
        var counter = require(`../files/counter.json`);
    } catch (error) {
        errorLog(error);
        return message.channel.send(`*${error.toString()}*`);
    }

    // Build the Reply
    let reply = `Current counter.winds.pets is: ${counter.winds.pets}`;

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
    } catch (error) {
        errorLog(error);
        return message.channel.send(`*${error.toString()}*`);
    }

    // Increase Counter
    counter.winds.pets++;
    
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
    let reply = (`Winds has been given ${counter.winds.pets} head pats.\n`
        + `You guys are weird...`);

    return message.channel.send(reply);
}

module.exports.help = command;

module.exports.setCount = setCount;
module.exports.getCount = getCount;