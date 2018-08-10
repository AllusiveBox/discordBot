/*
    Command Name: about.js
    Function: Give Bot Information
    Clearance: none
    Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 08/09/18
*/

// Load in Require Files
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const disabledDMs = require(`../functions/disabledDMs`);

// Command Required Files

// Misc. Variables
const name = "About";

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // Enabled Command Test
  if (!enabled.about) {
    return disabledCommand.run(name, message);
  }

  // Return About Text
  debug.log(`Generating About Message for ${message.author.username}`);
  let reply = await (`Hello, my name is ${bot.user.username}! I was created by `
  + `${config.author}!\n\n`
  + `I am version: **${config.verNum}**.\n\n`
  + `I was last updated on: **${config.lastUpdated}**.`);

  // Send the Message
  return message.author.send(reply).catch(error => {
    disabledDMs.run(message, reply);
  })
}

module.exports.help = {
  name: "about"
}
