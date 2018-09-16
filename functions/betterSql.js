/**

    cxBot.js Mr. Prog better sqlite Scripts
    better-sqlite3 is better kept synchronous
    Version: 1
    Author: Th3_M4j0r
    Date Started: 09/08/18
    Date Last Updated: 09/10/18
    Last Update By: Th3_M4j0r
**/

const Discord = require(`discord.js`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const sql = require(`sqlite`);

const notConnectedError = "Not connected to a database, call the 'open' function first";


//the strings for each statement to prepare after connecting
//prepared statements are faster and also safer
const insertUserString = "INSERT INTO userinfo (userId, userName, battlecode, favechip, "
    + "navi, clearance, points, level, optOut) VALUES (?, ?, ?, ?, ?, ?, "
    + "?, ?, ?)";
const setPointsString = "UPDATE userinfo SET points = ?, level = "
    + "?, userName = ? WHERE userId = ?";
const promoteString = "UPDATE userinfo SET clearance = ? WHERE userId = ?"; //don't know how AllusiveBox does this yet
const getUserString = "SELECT * FROM userinfo WHERE userId = ?";
const userLeftString = "DELETE FROM userinfo WHERE userId = ?";
const deleteMeString = "UPDATE userinfo SET userName = null, battlecode = null, "
    + "favechip = null, navi = null, points = null, "
    + "level = null WHERE userId = ?";
const setBattleCodeString = "UPDATE userinfo SET battlecode = ? WHERE userId = ?";
const setNaviString = "UPDATE userinfo SET navi = ? WHERE userId = ?";
const optOutString = "UPDATE userinfo SET optOut = 1 WHERE userId = ?";
const optInString = "UPDATE userinfo SET optOut = 0 WHERE userId = ?";
const userLookupString = "SELECT * FROM userinfo WHERE userID = ? OR userID = ? "
    + "OR userName = ? OR userName = ?";



// /**
//  * 
//  * @type {Database}
//  */
// var Database = null;


// /**
//  * @type {boolean}
//  */
// var dbOpen = false;

// /**
//  * @type {Statement};
//  */
// var userInsertStmt;
// var setPointsStmt;
// var promoteStmt;
// var getUserStmt;
// var setBattleCodeStmt;
// var setNaviStmt;
// var userLeftStmt;
// var deleteMeStmt;
// var optOutStmt;
// var optInStmt;
// var userLookupStmt;


module.exports = class betterSql {

    /**
     * constructor does nothing
     */
    constructor() {
        this._dbOpen = false;
    }

    /**
     * connect to a database
     * 
     * @param {!string} path 
     * @returns {Promise<void>}
     */
    async open(path) {
        debug.log(`Opening sqlite DB at ${path}`);
        this._Database = await sql.open(path, { Promise });
        debug.log(`Preparing statements`);
        this._userInsertStmt = await this._Database.prepare(insertUserString);
        this._setPointsStmt = await this._Database.prepare(setPointsString);
        this._promoteStmt = await this._Database.prepare(promoteString);
        this._getUserStmt = await this._Database.prepare(getUserString);
        this._setBattleCodeStmt = await this._Database.prepare(setBattleCodeString);
        this._setNaviStmt = await this._Database.prepare(setNaviString);
        this._userLeftStmt = await this._Database.prepare(userLeftString);
        this._deleteMeStmt = await this._Database.prepare(deleteMeString);
        this._optOutStmt = await this._Database.prepare(optOutString);
        this._optInStmt = await this._Database.prepare(optInString);
        this._userLookupStmt = await this._Database.prepare(userLookupString);
        this._dbOpen = true;
    }

    /**
     * 
     * @param {Discord.Snowflake} userId 
     */
    async getUserRow(userId) {
        debug.log(`I am in the sql.getUserRow function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        return await this._getUserStmt.get(userId);
    }

    /**
     * 
     * @param {Discord.Snowflake} userId 
     * @param {string} username 
     */
    async insertUser(userId, username) {
        debug.log(`I am in the sql.insertUser function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._userInsertStmt.run(
            userId, username, "0000-0000-0000", null, "megaman", null, 0, 0, 0);
    }

    /**
     * 
     * updates a user's battlecode
     * 
     * @param {Discord.Snowflake} userId
     * @param {string} battleCode
     */
    async setBattleCode(userId, battleCode) {
        debug.log(`I am in the sql.setBattleCode function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._setBattleCodeStmt.run(battleCode, userId);
    }

    /**
     * 
     * Sets a users points
     * 
     * @param {Discord.Snowflake} userId 
     * @param {number} points 
     * @param {number} level 
     * @param {string} username 
     */
    async setPoints(userId, points, level, username) {
        debug.log(`I am in the sql.setPoints function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._setPointsStmt.run(points, level, username, userId);
    }

    /**
     * 
     * @param {Discord.Snowflake} userId 
     * @param {string} navi 
     */
    async setNavi(userId, navi) {
        debug.log(`I am in the sql.setNavi function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._setNaviStmt.run(navi, userId);
    }

    /**
     * 
     * promotes/demotes the user with the given id to the new role
     * 
     * @param {Discord.Snowflake} userId 
     * @param {string} newRole 
     */
    async promoteUser(userId, newRole) {
        debug.log(`I am in the sql.promoteUser function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._promoteStmt.run(newRole, userId);
    }


    /**
     * 
     * A user has requested everything be deleted
     * 
     * @param {Discord.Snowflake} userId
     */
    async deleteUser(userId) {
        debug.log(`I am in the sql.deleteUser function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._deleteMeStmt.run(userId);
    }


    /**
     * 
     * A user has opted out
     * 
     * @param {Discord.Snowflake} userId
     */
    async optOutUser(userId){
        debug.log(`I am in the sql.optOutUser function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._optOutStmt.run(userId);
    }

    /**
     * 
     * A user wants to opt back in
     * 
     * @param {Discord.Snowflake} userId
     */
    async optInUser(userId) {
        debug.log(`I am in the sql.optInUser function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._optInStmt.run(userId);
    }

    /**
     * 
     * allows searching for a user
     * 
     * @param {Object} toCheck 
     */
    async userLookup(toCheck) {
        debug.log(`I am in the sql.userLookup function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        return await this._userLookupStmt.get(toCheck, toCheck.id, toCheck.username, toCheck);
    }

    /**
     * 
     * A user has left the server
     * 
     * @param {Discord.Snowflake} userId
     */
    async userLeft(userId) {
        debug.log(`I am in the sql.userLeft function`);
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._userLeftStmt.run(userId);
    }


    /**
     * 
     * allows execution of statements directly,
     * only use if really needed
     * 
     * @param {string} stmt 
     */
    async run(stmt) {
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._Database.exec(stmt);
    }

    /**
     * 
     * allows execution of statements directly,
     * only use if really needed
     * 
     * @param {string} stmt 
     */
    async get(stmt) {
        if (!this._dbOpen) {
            throw new Error(notConnectedError);
        }
        await this._Database.get(stmt);
    }

    /**
     * 
     * Close the connection, no further statements can be executed
     */
    async close() {
        debug.log(`I am in the sql.close funciton`);
        if (!this._dbOpen) return; //if not open, quietly do nothing
        this._dbOpen = false;
        await this._userInsertStmt.finalize();
        this._userInsertStmt = null;
        await this._setPointsStmt.finalize();
        this._setPointsStmt = null;
        await this._promoteStmt.finalize();
        this._promoteStmt = null;
        await this._getUserStmt.finalize();
        this._getUserStmt = null;
        await this._setBattleCodeStmt.finalize();
        this._setBattleCodeStmt = null;
        await this._setNaviStmt.finalize();
        this._setNaviStmt = null;
        await this._userLeftStmt.finalize();
        this._DatabaseuserLeftStmt = null;
        await this._deleteMeStmt.finalize();
        this._deleteMeStmt = null;
        await this._optOutStmt.finalize();
        this._optOutStmt = null;
        await this._optInStmt.finalize();
        this._optInStmt = null;
        await this._userLookupStmt.finalize();
        this._userLookupStmt = null;
        await this._Database.close();
        debug.log(`database successfully closed`);
        
    }

}

// /**
//  * 
//  * Connect to database and prepare statements
//  * 
//  * @param {!string} path 
//  */
// module.exports.connect = async (path) => {


//     debug.log(`Opening sqlite DB at ${path}`);
//     Database = await sql.open(path, { Promise });
//     dbOpen = true;
//     debug.log(`Preparing statements`);
//     userInsertStmt = await Database.prepare(insertUserString);
//     setPointsStmt = await Database.prepare(setPointsString);
//     promoteStmt = await Database.prepare(promoteString);
//     getUserStmt = await Database.prepare(getUserString);
//     setBattleCodeStmt = await Database.prepare(setBattleCodeString);
//     setNaviStmt = await Database.prepare(setNaviString);
//     userLeftStmt = await Database.prepare(userLeftString);
//     deleteMeStmt = await Database.prepare(deleteMeString);
//     optOutStmt = await Database.prepare(optOutString);
//     optInStmt = await Database.prepare(optInString);
//     userLookupStmt = await Database.prepare(userLookupString);
// }

// /**
//  * 
//  * returns a row based on the users Id, undefined if it doesn't exist
//  * 
//  * @param {Discord.Snowflake} userId 
//  */
// module.exports.getUserRow = async (userId) => {
//     debug.log(`I am in the sql.getUserRow function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     return await getUserStmt.get(userId);
// }


// /**
//  * 
//  * Inserts a user with default values
//  * 
//  * @param {Discord.Snowflake} userId 
//  * @param {string} username 
//  */
// module.exports.insertUser = async (userId, username) => {
//     debug.log(`I am in the sql.insertUser function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await userInsertStmt.run(userId, username, "0000-0000-0000", null, "megaman", null, 0, 0, 0);
// }



// /**
//  * 
//  * updates a user's battlecode
//  * 
//  * @param {Discord.Snowflake} userId
//  * @param {string} battleCode
//  */
// module.exports.setBattleCode = async (userId, battleCode) => {
//     debug.log(`I am in the sql.setBattleCode function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await setBattleCodeStmt.run(battleCode, userId);
// }


// /**
//  * 
//  * Sets a users points
//  * 
//  * @param {Discord.Snowflake} userId 
//  * @param {number} points 
//  * @param {number} level 
//  * @param {string} username 
//  */
// module.exports.setPoints = async (userId, points, level, username) => {
//     debug.log(`I am in the sql.setPoints function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await setPointsStmt.run(points, level, username, userId);
// }

// /**
//  * 
//  * @param {Discord.Snowflake} userId 
//  * @param {string} navi 
//  */
// module.exports.setNavi = async (userId, navi) => {
//     debug.log(`I am in the sql.setNavi function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await setNaviStmt.run(navi, userId);
// }

// /**
//  * 
//  * promotes/demotes the user with the given id to the new role
//  * 
//  * @param {Discord.Snowflake} userId 
//  * @param {string} newRole 
//  */
// module.exports.promoteUser = async (userId, newRole) => {
//     debug.log(`I am in the sql.promoteUser function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await promoteStmt.run(newRole, userId);
// }

// /**
//  * 
//  * A user has requested everything be deleted
//  * 
//  * @param {Discord.Snowflake} userId
//  */
// module.exports.deleteUser = async (userId) => {
//     debug.log(`I am in the sql.deleteUser function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await deleteMeStmt.run(userId);
// }


// /**
//  * 
//  * A user has opted out
//  * 
//  * @param {Discord.Snowflake} userId
//  */
// module.exports.optOutUser = async (userId) => {
//     debug.log(`I am in the sql.optOutUser function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await optOutStmt.run(userId);
// }


// /**
//  * 
//  * A user wants to opt back in
//  * 
//  * @param {Discord.Snowflake} userId
//  */
// module.exports.optInUser = async (userId) => {
//     debug.log(`I am in the sql.optInUser function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await optInStmt.run(userId);
// }


// /**
//  * 
//  * allows searching for a user
//  * 
//  * @param {Object} toCheck 
//  */
// module.exports.userLookup = async (toCheck) => {
//     debug.log(`I am in the sql.userLookup function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     return await userLookupStmt.get(toCheck, toCheck.id, toCheck.username, toCheck);
// }

// /**
//  * 
//  * A user has left the server
//  * 
//  * @param {Discord.Snowflake} userId
//  */
// module.exports.userLeft = async (userId) => {
//     debug.log(`I am in the sql.userLeft function`);
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await userLeftStmt.run(userId);
// }

// /**
//  * 
//  * allows execution of statements directly,
//  * only use if really needed
//  * 
//  * @param {string} stmt 
//  */
// module.exports.run = async (stmt) => {
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     await Database.exec(stmt);
// }

// /**
//  * 
//  * allows execution of a select statement directly,
//  * only use if really needed
//  * 
//  * @param {string} stmt 
//  */
// module.exports.get = async (stmt) => {
//     if (!dbOpen) {
//         throw new Error(notConnectedError);
//     }
//     return await Database.get(stmt);
// }

// /**
//  * 
//  * Close the connection, no further statements can be executed
//  */
// module.exports.close = async () => {

//     if (!dbOpen) return; //if not open, quietly do nothing

//     await userInsertStmt.finalize();
//     await setPointsStmt.finalize();
//     await promoteStmt.finalize();
//     await getUserStmt.finalize();
//     await setBattleCodeStmt.finalize();
//     await setNaviStmt.finalize();
//     await userLeftStmt.finalize();
//     await deleteMeStmt.finalize();
//     await optOutStmt.finalize();
//     await optInStmt.finalize();
//     await userLookupStmt.finalize();
//     await Database.close();
//     dbOpen = false;
// }
