/*
    Command Name: !ping
    Function: Returns ping so that users can tell if the bot is accepting
              commands currently.
    Clearance: none
	  Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 08/08/18
*/

// Load in Required Files
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledCommand = require(`../functions/disabledCommand.js`);

// Command Variables

// Misc. Variables
const name = "Ping";

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am in the ${name} command.`);

  // Enabled Command Test
  if (!enabled.ping) {
    return disabledCommand.run(name, message);
  }

  return message.channel.send("pong!");
}

module.exports.help = {
	name: "ping"
}
