/**
 * 
 * Mr. Prog Logger Class
 * Version: 1
 * Author: AllusiveBox
 * Date Started: 09/21/18
 * Date Last Updated: 10/09/18
 * Last Updated By: Th3_M4jor
 * 
 */

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { dirname as _dirname } from 'path';
import SpiffyDate from '../classes/SpiffyDate.js';

class Logger {
    name: string;
    logFilePath: string;

    /**
     * 
     * @param {String} name
     */
    constructor(name: string = null) {
        this.name = name;
        this._setLogFilePath();
        this._validateFilePath();
    }

    /**
     * Log Function Logs to the Log File
     * @param {string} logText
     * @param {?boolean} [debug=true]
     * 
     */

    log(logText: string, debug: boolean | null = true) {
        // Get SpiffyDate
        let timestamp = new SpiffyDate();

        // Build the Log Message
        let logMessage = `${timestamp.getSpiffyDate()}: ${this.name} > ${logText}`;

        // Build Stream Writer
        let stream = createWriteStream(this.logFilePath, { flags: 'a' });

        // Write to Log File
        stream.write(`${logMessage}\n`);

        // End the Stream
        stream.end();

        if (debug) console.log(`${logMessage}\n`);

        return;
    }

    /**
     * Log Function Logs to the Log File and Includes a New Line
     * @param {String} logText
     * @param {?boolean} [debug=true]
     */

    logln(logText: string, debug: boolean | null = true) {
        this.log(`${logText}\n`, debug);
    }

    /**
     * Generates the Log File's Path
     * 
     */

    _setLogFilePath() {
        // Get Current Date
        let currentDate = new Date();

        // Grab Month and Year
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        // Format Month
        let monthString = month < 10 ? '0' + month : month;

        this.logFilePath = `./logs/${this.name}/${year}-${monthString}.txt`;
    }

    /**
     * Validates the logFilePath Variable and Creates it, if Necessary*/
    _validateFilePath() {
        // Ensure Log Directory Exists First
        let logDir = _dirname(`./logs/temp.txt`);

        if (!existsSync(logDir)) {
            console.log(`Unable to locate ${logDir}, creating now...`);
            mkdirSync(logDir);
            this._validateFilePath();
        }

        let dirname = _dirname(this.logFilePath);
        if (existsSync(dirname)) {
            return true;
        } else {
            console.log(`Unable to locate ${dirname}, creating now...`);
            mkdirSync(dirname);
            this._validateFilePath();
        }
    }
}

export default Logger;