/**

    cxBot.js Mr. Prog Startup Script
    Version: 2
    Author: AllusiveBox
    Date Started: 08/09/18
    Date Last Updated: 10/09/18
    Last Update By: Th3_M4j0r

**/

import * as Discord from 'discord.js';
const userids = require('../files/userids.json');
import { debug, error as errorLog } from '../functions/log.js';

/**
 * 
 * @param {Discord.Client} bot
 * @param {?string[]} [args]
 */
export async function run(bot: Discord.Client, args: string[] | null) {
    // Read in Passed Along Arguments
    let passedArgs = Number.parseInt(args[2]);
    try {
        if ((passedArgs != 0) && (passedArgs != undefined)) {
            bot.users.get(userids.ownerID).send(`Starting up...\n`
                + `Previous iteration terminated with error code: ${passedArgs}.`);
            if (args[3]) {
                let additionalArgs = args.slice(2).join(" ");
                bot.users.get(userids.ownerID).send(`The following arguments were also `
                    + `included: ${additionalArgs}`);
            }
        }
    }
    catch (error) {
        errorLog(error);
    }
}
