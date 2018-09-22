/**
 * 
 * Mr. Prog Custom Error Classes
 * Version: 1
 * Date Started: 09/21/18
 * Last Updated: 09/22/18
 * Last Updated By: AllusiveBox
 * 
 */

class UnsupportedMethodType extends Error {
    /**
     * UnsupportedMethodType is Thrown When an Invalid Method Type is Provided
     * @param {string} cause
     * @param {?string} [message=null]
     */
    constructor(cause, message = null) {
        if (message === null) {
            message = (`Unsupported MethodType: ${cause} was passed.\n`
                + `Supported MethodTypes are: 'PLAYING', 'STREAMING', 'LISTENING', and 'WATCHING'.`);
        }
        super(message);
        this.name = "UnsupportedMethodType";
        this.cause = cause;
    }
}

class NotConnectedError extends Error {
    /**
     * NotConnectedError is Thrown When the SQLDatabase is Not Connected...
     * @param {?string} [message=null]
     */
    constructor(message = null) {
        if (message === null) {
            message = (`Not connected to a database. Make sure to use the 'open' function first.`);
        }
        super(message);
        this.name = "NotConnectedError"
    }
}

class NoDefinedRole extends Error {
    /**
     * NoDefinedRole is Thrown When A Role is Called but it is not Defined.
     * @param {string} commandName
     * @param {?string} [message=null]
     */
    constructor(commandName, message = null) {
        if (message === null) {
            message = (`No role set for ${commandName}. Please update files/roles.json and add a role for the ${commandName} entry.\n`
                + `For a template, please check in the templates/ directory.`);
        }
        super(message);
        this.name = "NoDefinedRole"
        this.cause = "Invalid or null role ID."
    }
}

class NoBentQuotesDefined extends Error {
    constructor(message = null) {
        if (message === null) {
            message = ("Unable to locate files/bentquote.txt.\n"
                + "Please ensure that there is a bentquote.txt file, and that it is in the correct directory.");
        }
        super(message);
        this.name = "NoBentQuotesDefined";
    }
}

class NoAnnouncementTextDefined extends Error {
    constructor(message = null) {
        if (message === null) {
            message = ("Unable to locate files/announcement.txt.\n"
                + "Please ensure that there is an announcement.txt file, and that it is in the correct directory.");
        }
        super(message);
        this.name = "NoAnnouncementTextDefined";
    }
}

module.exports.NoAnnouncementTextDefined = NoAnnouncementTextDefined;
module.exports.NoBentQuotesDefined = NoBentQuotesDefined;
module.exports.NoDefinedRole = NoDefinedRole;
module.exports.NotConnectedError = NotConnectedError;
module.exports.UnsupportedMethodType = UnsupportedMethodType;
