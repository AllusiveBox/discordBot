const fs = require(`fs`);
const SpiffyDate = require(`../classes/SpiffyDate.js`);

class Logger {
    /**
     * 
     * @param {String} name
     * @param {String} [logFile=null]
     */
    constructor(name = null, logFile = null) {
        this.name = name;
        this.logFile = logFile;
    }

    /**
     * 
     * @param {string} logText
     * @param {?boolean} [debug=false]
     * @param {?character} [flags]
     */

    log(logText, debug = false, flags = null) {
        // Get SpiffyDate
        let timestamp = new SpiffyDate();

        // Build the Log Message
        let logMessage = `${this.name}: ${timestamp.getSpiffyDate()} > ${logText}\n`;

        // Check for Flags
        if ((!flags) || (!this.logFile)) {
            return console.log(logMessage);
        }

        // Build Stream Writer
        let stream = fs.createWriteStream(this.logFile, { flags: flags });

        // Write to Log File
        stream.write(logMessage);

        // End the Stream
        stream.end();

        if (debug) console.log(logMessage);

        return;
    }
}

module.exports = Logger;