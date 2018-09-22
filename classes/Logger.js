/**
 * 
 * Mr. Prog Logger Class
 * Version: 1
 * Author: AllusiveBox
 * Date Started: 09/21/18
 * Date Last Updated: 09/22/18
 * Last Updated By: AllusiveBox
 * 
 */

const fs = require(`fs`);
const path = require(`path`);
const SpiffyDate = require(`../classes/SpiffyDate.js`);

class Logger {
    /**
     * 
     * @param {String} name
     */
    constructor(name = null) {
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

    log(logText, debug = true) {
        // Get SpiffyDate
        let timestamp = new SpiffyDate();

        // Build the Log Message
        let logMessage = `${this.name}: ${timestamp.getSpiffyDate()} > ${logText}`;

        // Build Stream Writer
        let stream = fs.createWriteStream(this.logFilePath, { flags: 'a' });

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

    logln(logText, debug = true) {
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
        month = month < 10 ? '0' + month : month;

        this.logFilePath = `./logs/${this.name}/${year}-${month}.txt`;
    }

    /**
     * Validates the logFilePath Variable and Creates it, if Necessary*/
    _validateFilePath() {
        // Ensure Log Directory Exists First
        let logDir = path.dirname(`./logs/temp.txt`);

        if (!fs.existsSync(logDir)) {
            console.log(`Unable to locate ${logDir}, creating now...`);
            fs.mkdirSync(logDir);
            this._validateFilePath();
        }

        let dirname = path.dirname(this.logFilePath);
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            console.log(`Unable to locate ${dirname}, creating now...`);
            fs.mkdirSync(dirname);
            this._validateFilePath();
        }
    }
}

module.exports = Logger;