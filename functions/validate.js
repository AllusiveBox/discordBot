/**

    cxBot.js Mr. Prog Validation Scripts
    Version: 4
    Author: AllusiveBox
    Date Started: 08/26/18
    Date Last Updated: 09/22/18
    Last Update By: AllusiveBox

**/

// Load in Required Libraries and Files
const log = require(`../functions/log.js`);


/**
 * 
 * @param {string} battleCode
 */
module.exports.validateBattleCode = (battleCode) => {
    // Debug to Console
    log.debug(`I am inside the Battlecode Validation System`);

    if (battleCode.length !== 14) { // If Battle Code Length is Invalid...
        log.debug(`Battlecode fails validation at battleCode.length: `
            + `${battleCode.length}`);
        return false;
    } else { // If Battle Code Length is Valid...
        for (i = 0; i < battleCode.length; i++) {
            let code = battleCode.charCodeAt(i);
            if ((i === 4) || (i === 9)) { // Special Case for Dash Characters
                if (battleCode[i] !== '-') { // If Not Dash Character...
                    log.debug(`Battlecode fails validation at battleCode[${i}]: `
                        + `Expected character '-'. Found character ${battleCode[i]}.`);
                    return false;
                }
            } else if (!((code > 47) && code < 58) && !((code > 64) && (code < 70))) {
                // If Code is Out of Bounds...
                log.debug(`Battlecode fails validation at battleCode[${i}]: `
                    + `Character out of range. Found character ${code}.`);
                return false;
            } else {
                log.debug(`battleCode[${i}]: ${battleCode[i]} | code: ${code}`);
            }
        }
        log.debug(`Battlecode successfully passed validation.`);
        return true;
    }
}
