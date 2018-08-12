/**

    cxBot.js Mr. Prog Delete Member Data Scripts
    Version: 3
    Author: AllusiveBox
    Date Started: 02/28/18
    Date Last Updated: 08/11/18

**/

// Load in Required Libraries and Files
const userids = require(`../files/userids`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

module.exports.run = async (bot, member, sql) => {
  // Debug to Console
  debug.log(`I am in the deleteMemberInfo function.`);

  // Check if Member is in User ID List
  Object.keys(userids).forEach(function(key) {
    if (userids[key] === member.id) { // If Member is in User ID List...
      return debug.log(`Preserving data on ${member.user.username} due to being in `
      + `the userids list.`);
    }
  });

  // Delete User Information on Member
  debug.log(`Deleting userinfo on ${member.user.username}.`);
  sql.run(`DELETE FROM userinfo WHERE userID = "${member.id}"`).catch(error => {
    return errorLog.log(error);
  })
  return debug.log(`Delete Successful.`);
}
