/*
    Command Name: petwinds.js
    Function: Like petmax.js, but for Winds
    Clearance: None
	Default Enabled: Yes
    Date Created: 07/31/18
    Last Updated: 10/10/18
    Last Updated By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from 'discord.js';
import { writeFile } from 'fs';
import { debug, error as errorLog, commandHelp } from '../functions/log.js';
import { run as disabledCommand } from '../functions/disabledCommand.js';
import config = require('../files/config.json');


// Command Variables
const command : commandHelp = {
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
 * @param {number} newCount
 * @param {Discord.Message} [message]
 */

export function setCount(newCount: number, message: Discord.Message) {
    // Debug to Console
    debug(`I am inside the petwinds.setCount functon.`);

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

    counter.winds.pets = newCount;
    // Save Edited File
    writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            errorLog(error);
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

export function getCount(message: Discord.Message) {
    // Debug to Console
    debug(`I am inside the petmax.getCount function.`);

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
export async function run(bot: Discord.Client, message: Discord.Message) {
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

    // Debug Before
    debug(`Previous winds.pets: ${counter.winds.pets}.`);

    // Increase Counter
    counter.winds.pets++;

    // Debug After
    debug(`New winds.pets: ${counter.winds.pets}.`);

    // Save Edited File
    writeFile(`./files/counter.json`, JSON.stringify(counter), error => {
        if (error) {
            errorLog(error);
            return message.channel.send(`I am sorry, ${message.author}, there was an unexpected error. I was unable to pet Winds...`);
        }
    });

    // Save Successful
    debug(`Successfully saved!`);

    // Build the Reply
    let reply = (`Winds has been given ${counter.winds.pets} head pats.\n`
        + `You guys are weird...`);

    return message.channel.send(reply);
}

export const help = command;