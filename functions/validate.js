/**

    cxBot.js Mr. Prog Validation Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 08/26/18
    Date Last Updated: 08/30/18
    Last Update By: AllusiveBox

**/

// Load in Required Libraries and Files
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);


/**
 * 
 * @param {string} battleCode
 */
module.exports.validateBattleCode = (battleCode) => {
    // Debug to Console
    debug.log(`I am inside the Battlecode Validation System`);

    if (battleCode.length !== 14) { // If Battle Code Length is Invalid...
        debug.log(`Battlecode fails validation at battleCode.length: `
            + `${battleCode.length}`);
        return false;
    } else { // If Battle Code Length is Valid...
        for (i = 0; i < battleCode.length; i++) {
            let code = battleCode.charCodeAt(i);
            if ((i === 4) || (i === 9)) { // Special Case for Dash Characters
                if (battleCode[i] !== '-') { // If Not Dash Character...
                    debug.log(`Battlecode fails validation at battleCode[${i}]: `
                        + `Expected character '-'. Found character ${battleCode[i]}.`);
                    return false;
                }
            } else if (!((code > 47) && code < 58) && !((code > 64) && (code < 70))) {
                // If Code is Out of Bounds...
                debug.log(`Battlecode fails validation at battleCode[${i}]: `
                    + `Character out of range. Found character ${code}.`);
                return false;
            } else {
                debug.log(`battleCode[${i}]: ${battleCode[i]} | code: ${code}`);
            }
        }
        debug.log(`Battlecode successfully passed validation.`);
        return true;
    }
}
