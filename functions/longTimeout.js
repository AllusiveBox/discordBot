/**

    cxBot.js Mr. Prog workaround for limitations on setTimeout
    Version: 1
    Author: Th3_M4j0r
    Date Started: 09/02/18
    Date Last Updated: 09/02/18
    Last Update By: Th3_M4j0r

**/


/**
 * 
 * sets a longTimeout
 * @param {function} callback the callback function
 * @param {Number} ms the timeout delay in ms
 * @return {longTimeoutObject}
 */
module.exports.set = (callback, ms) => {
    if (typeof callback !== 'function')
        throw new Error('Callback must be a function');
    ms = parseInt(ms);
    if (Number.isNaN(ms))
        throw new Error('Delay must be an integer');

    var args = Array.prototype.slice.call(arguments, 2);
    var cb = callback.bind.apply(callback, [this].concat(args));

    var longTimeout = {
        timer: null,
        clear: function () {
            if (this.timer)
                clearTimeout(this.timer);
        }
    };

    var max = 2147483647;
    if (ms <= max)
        longTimeout.timer = setTimeout(cb, ms);
    else {
        var count = Math.floor(ms / max); // the number of times we need to delay by max
        var rem = ms % max; // the length of the final delay
        (function delay() {
            if (count > 0) {
                count--;
                longTimeout.timer = setTimeout(delay, max);
            } else {
                longTimeout.timer = setTimeout(cb, rem);
            }
        })();
    }
    return longTimeout;
}

/**
 * clears a long timeout, quietly does nothing if an invalid argument is given
 * @param {longTimeoutObject} longTimeoutObject the longTimeout to clear
 * @returns {void}
 */
module.exports.clear = (longTimeoutObject) => {
    if (longTimeoutObject &&
        typeof longTimeoutObject.clear === 'function')
        longTimeoutObject.clear()
}