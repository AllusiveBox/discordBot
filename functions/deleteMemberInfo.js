/**

    cxBot.js Mr. Prog Delete Member Data Scripts
    Version: 3
    Author: AllusiveBox
    Date Started: 02/28/18
    Date Last Updated: 10/13/18
    Last Update By: AllusiveBox
**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const userids = require(`../files/userids.json`);
const { debug, error: errorLog } = require(`../functions/log.js`);
const betterSql = require(`../classes/betterSql.js`);


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.User} member
 * @param {betterSql} sql
 */
module.exports.run = async (bot, member, sql) => {
    // Debug to Console
    debug(`I am in the deleteMemberInfo function.`);

    // Check if Member is in User ID List
    Object.keys(userids).forEach(function (key) {
        if (userids[key] === member.id) { // If Member is in User ID List...
            return debug(`Preserving data on ${member.user.username} due to being in `
                + `the userids list.`);
        }
    });

    // Delete User Information on Member
    debug(`Deleting userinfo on ${member.user.username}.`);
    sql.userLeft(member.id);
    return debug(`Delete Successful.`);
}
