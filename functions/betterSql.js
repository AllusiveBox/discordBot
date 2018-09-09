/**

    cxBot.js Mr. Prog better sqlite Scripts
    better-sqlite3 is better kept synchronous
    Version: 1
    Author: Th3_M4j0r
    Date Started: 09/08/18
    Date Last Updated: 09/08/18
    Last Update By: Th3_M4j0r
**/

const Discord = require(`discord.js`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const sql = require(`sqlite`);

const notConnectedError = "Not connected to a database, call the 'connect' function first";


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



/**
 * 
 * @type {Database}
 */
var Database = null;


/**
 * @type {boolean}
 */
var dbOpen = false;

/**
 * @type {Statement};
 */
var userInsertStmt;
var setPointsStmt;
var promoteStmt;
var getUserStmt;
var setBattleCodeStmt;
var setNaviStmt;
var userLeftStmt;
var deleteMeStmt;
var optOutStmt;
var optInStmt;
var userLookupStmt;

/**
 * 
 * Connect to database and prepare statements
 * 
 * @param {!string} path 
 * @param {?options} [options]
 */
module.exports.connect = async (path) => {


    debug.log(`Opening sqlite DB at ${path}`);
    Database = await sql.open(path, { Promise });
    dbOpen = true;
    debug.log(`Preparing statements`);
    userInsertStmt = await Database.prepare(insertUserString);
    setPointsStmt = await Database.prepare(setPointsString);
    promoteStmt = await Database.prepare(promoteString);
    getUserStmt = await Database.prepare(getUserString);
    setBattleCodeStmt = await Database.prepare(setBattleCodeString);
    setNaviStmt = await Database.prepare(setNaviStmt);
    userLeftStmt = await Database.prepare(userLeftString);
    deleteMeStmt = await Database.prepare(deleteMeString);
    optOutStmt = await Database.prepare(optOutString);
    optInStmt = await Database.prepare(optInString);
    userLookupStmt = await Database.prepare(userLookupString);
}

/**
 * 
 * returns a row based on the users Id, undefined if it doesn't exist
 * 
 * @param {Discord.Snowflake} userId 
 */
module.exports.getUserRow = async (userId) => {
    debug.log(`I am in the sql.getUserRow function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    return await getUserStmt.get(userId);
}


/**
 * 
 * Inserts a user with default values
 * 
 * @param {Discord.Snowflake} userId 
 * @param {string} username 
 */
module.exports.insertUser = async (userId, username) => {
    debug.log(`I am in the sql.insertUser function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await userInsertStmt.run(userId, username, "0000-0000-0000", null, "megaman", null, 0, 0, 0);
}



/**
 * 
 * updates a user's battlecode
 * 
 * @param {Discord.Snowflake} userId
 * @param {string} battleCode
 */
module.exports.setBattleCode = async (userId, battleCode) => {
    debug.log(`I am in the sql.setBattleCode function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await setBattleCodeStmt.run(battleCode, userId);
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
module.exports.setPoints = async (userId, points, level, username) => {
    debug.log(`I am in the sql.setPoints function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await setPointsStmt.run(points, level, username, userId);
}

/**
 * 
 * @param {Discord.Snowflake} userid 
 * @param {string} navi 
 */
module.exports.setNavi = async (userid, navi) => {
    debug.log(`I am in the sql.setNavi function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await setNaviStmt.run(navi, userId);
}

/**
 * 
 * promotes/demotes the user with the given id to the new role
 * 
 * @param {Discord.Snowflake} userId 
 * @param {string} newRole 
 */
module.exports.promoteUser = async (userId, newRole) => {
    debug.log(`I am in the sql.promoteUser function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await promoteStmt.run(newRole, userId);
}

/**
 * 
 * A user has requested everything be deleted
 * 
 * @param {Discord.Snowflake} userId
 */
module.exports.deleteUser = async (userId) => {
    debug.log(`I am in the sql.deleteUser function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await deleteMeStmt.run(userId);
}


/**
 * 
 * A user has opted out
 * 
 * @param {Discord.Snowflake} userId
 */
module.exports.optOutUser = async (userId) => {
    debug.log(`I am in the sql.optOutUser function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await optOutStmt.run(userId);
}


/**
 * 
 * A user wants to opt back in
 * 
 * @param {Discord.Snowflake} userId
 */
module.exports.optInUser = async (userId) => {
    debug.log(`I am in the sql.optInUser function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await optInStmt.run(userId);
}


/**
 * 
 * allows searching for a user
 * 
 * @param {Object} toCheck 
 */
module.exports.userLookup = async (toCheck) => {
    debug.log(`I am in the sql.userLookup function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    return await userLookupStmt.get(toCheck, toCheck.id, toCheck.username, toCheck);
}

/**
 * 
 * A user has left the server
 * 
 * @param {Discord.Snowflake} userId
 */
module.exports.userLeft = async (userId) => {
    debug.log(`I am in the sql.userLeft function`);
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await userLeftStmt.run(userId);
}

/**
 * 
 * allows execution of statements directly,
 * only use if really needed
 * 
 * @param {string} stmt 
 */
module.exports.run = async (stmt) => {
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    await Database.exec(stmt);
}

/**
 * 
 * allows execution of a select statement directly,
 * only use if really needed
 * 
 * @param {string} stmt 
 */
module.exports.get = async (stmt) => {
    if (!dbOpen) {
        throw new Error(notConnectedError);
    }
    return await Database.get(stmt);
}

/**
 * 
 * Close the connection, no further statements can be executed
 */
module.exports.close = async () => {
    await userInsertStmt.finalize();
    await setPointsStmt.finalize();
    await promoteStmt.finalize();
    await getUserStmt.finalize();
    await setBattleCodeStmt.finalize();
    await setNaviStmt.finalize();
    await userLeftStmt.finalize();
    await deleteMeStmt.finalize();
    await optOutStmt.finalize();
    await optInStmt.finalize();
    await userLookupStmt.finalize();
    await Database.close();
    dbOpen = false;
}
