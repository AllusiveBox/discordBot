/*
    Command Name: face.js
    Function: Returns a Random textFace from Array
    Clearance: none
	Default Enabled: Yes
    Date Created: 10/11/18
    Last Updated: 10/11/18
    Last Update By: Th3_M4j0r

*/

// Load in Required Files
import * as Discord from "discord.js";
import { readFileSync } from "fs";
import { NoTextFacesDefined } from "../classes/CustomErrors.js";
import { debug, commandHelp } from "../functions/log.js";
import { run as disabledCommand } from "../functions/disabledCommand.js";

import config = require('../files/config.json');

// Command Variables
try {
    var text = readFileSync(`./files/textfaces.txt`, `utf8`);
} catch (error) {
    throw new NoTextFacesDefined();
}

var rando : number = null;
var lastNum : number = null;

var bentComments = text.split(`\n`);

const command : commandHelp = {
    bigDescription: ("This command is used to get some funny textfaces."
        + "Arguments:\n\t"
        + "{int} -> An Integer that represents the face number you wish to receive."
        + "Returns:\n\t"
        + config.returnsChannel),
    description: "Get a funny textface.",
    enabled: true,
    fullName: "Text Face",
    name: "textface",
    permissionLevel: "normal"
}


/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomIntFrom(min: number, max: number): number {
    max = max|0;
    min = min|0;
    while (rando === lastNum) { // Loop Until New Number...
        rando = Math.floor(Math.random() * (max - min + 1) + min);
    }
    debug(`Setting rando to: ${rando}`);
    return rando|0;
}


/**
 * @param {any} value
 * @returns {boolean}
 */
function isInt(value : any) : boolean {
    if (isNaN(value)) return false;
    return true;
}

/**
 * 
 * @param {number} num
 */
export function getTextFaces(num : number) : string | string[] {
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

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(bot: Discord.Client, message: Discord.Message, args: string[]) : Promise<void> {
    // Debug to Console
    debug(`I am inside the ${command.fullName} command.`);
    // Enabled Command Test
    if (!command.enabled) {
        return disabledCommand(command.fullName, message);
    }
    // Determine if Arguments were Passed With the Command...
    if ((args[0] && (isInt(args[0])))) { // If TextFace Number Provided...
        if ((Number(args[0]) > bentComments.length) || (Number(args[0]) <= 0)) { // If Out of Range
            debug(`Number was out of range. Generating Random Number.`);
            // Assign Random Num Value
            rando = randomIntFrom(0, bentComments.length - 1);
        }
        else { // If Number In Range...
            rando = Number(args[0]) - 1;
            debug(`Setting rando to: ${rando}`);
        }
    }
    else { // If TextFace Number Not Provided...
        // Assign Random Number Value
        rando = randomIntFrom(0, bentComments.length - 1);
    }
    // Return the TextFace
    debug(`Generating BentQuote for ${message.author.username}.`);
    message.channel.send(`BentQuote #${rando + 1}: ${bentComments[rando]}`);
    lastNum = rando;
}

export const help = command;