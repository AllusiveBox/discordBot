/*
    Command Name: bork.js
    Function: The bot borks back
    Clearance: none
  	Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 08/12/18
*/

// Load in Required Files
const enabled = require(`../files/enabled.json`);
const userids = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);
const errorLog  = require(`../functions/errorLog.js`);

// Command Variables

// Misc. Variables
const name = "Bork"

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // Enabled Command Test
  if (!enabled.bork) {
    return disabledCommand.run(name, message);
  }

  // Check if Member is in User ID List
  const borkMaster = () => new Promise(Object.keys(userids).forEach(async (key) => {
    if (userids[key] === message.author.id) { // If Member is in User ID List...
      return message.channel.send(`Bork to you too, young master.`);
    }
  }));

  try {
    await borkMaster();
  }
  catch (error) {
    if (error.includes("TypeError")) { // If Type Error, Which is Expected...
      return message.channel.send(`What did you just say to me, `
        + `${message.author}? I'll have you know that I graduated at the top `
        + `of my class in the bork academy. You better watch yourself, kiddo.`);
    }
  }

}

module.exports.help = {
  name        : "bork",
  description : ("Sometimes you bork at the bot, and sometimes the bot borks "
    + "back...")
}
