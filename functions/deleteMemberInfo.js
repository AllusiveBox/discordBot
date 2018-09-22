/**

    cxBot.js Mr. Prog Delete Member Data Scripts
    Version: 3
    Author: AllusiveBox
    Date Started: 02/28/18
    Date Last Updated: 09/22/18
    Last Update By: Th3_M4j0r
**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const userids = require(`../files/userids.json`);
const log = require(`../functions/log.js`);


/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.User} member
 * @param {sqlite} sql
 */
module.exports.run = async (bot, member, sql) => {
    // Debug to Console
    log.debug(`I am in the deleteMemberInfo function.`);

    // Check if Member is in User ID List
    Object.keys(userids).forEach(function (key) {
        if (userids[key] === member.id) { // If Member is in User ID List...
            return log.debug(`Preserving data on ${member.user.username} due to being in `
                + `the userids list.`);
        }
    });

    // Delete User Information on Member
    log.debug(`Deleting userinfo on ${member.user.username}.`);
    sql.deleteUser(member.id);
    return log.debug(`Delete Successful.`);
}
