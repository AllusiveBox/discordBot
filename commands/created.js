/*
    Command Name: created.js
    Function: Returns the Date your Account was Created
    Clearance: none
    Default Enabled: Cannot be disabled.
    Date Created: 05/23/18
    Last Updated: 08/11/18
*/

// Load in Reqired Files
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

// Command Variables

// Misc. Variables
const name = "Created";

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  let createdOn = await new Date((message.author.id/4194304)+1420070040000);

  return message.channel.send(`Account created on: **${createdOn}**`)
  .catch(error => {
    errorLog.log(error);
  });
}

module.exports.help = {
  name        : "created",
  description : ("Returns the date your acount was created.")
}