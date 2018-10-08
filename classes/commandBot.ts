/**
 * Mr. Prog command class
 * Version 4.1.0
 * Author: Th3_M4j0r
 * Date Started: 10/08/18
 * Last Updated: 10/08/18
 * Last Updated By: Th3_M4j0r
 * 
 */

import * as Discord from 'discord.js';

class commandBot extends Discord.Client {
    commands: Discord.Collection<string, any>
    constructor() {
        super();
        this.commands = new Discord.Collection();
    }
}

export { commandBot };