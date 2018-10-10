/**
 * Mr. Prog command class
 * Version 4.1.0
 * Author: Th3_M4j0r
 * Date Started: 10/08/18
 * Last Updated: 10/10/18
 * Last Updated By: Th3_M4j0r
 * 
 */

import * as Discord from 'discord.js';
import {debug, commandHelp} from '../functions/log.js';

class commandBot extends Discord.Client {
    public commands: Discord.Collection<string, commandModule>
    constructor() {
        debug('Constructing commandBot');
        super();
        this.commands = new Discord.Collection();
    }
}

interface commandModule extends NodeModule {
    help: commandHelp;
    run: Function;
}

export { commandBot };