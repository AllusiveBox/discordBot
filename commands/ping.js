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

// Command Variables
const disabledMessage = config.disabledMessage;

// Misc. Variables
const name = "Ping";

module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am in the ${name} command.`);

  if (!enabled.ping) {
    debug.log(`The ${name} command is currently disabled.\n`);
    return message.author.send(disabledMessage).catch(error => {
      debug.log(`${message.author.username} has DMs disabled.`);
      return message.channel.send(`I am sorry, ${message.author}, this command`
        + `is currently disabled.`);
    })
  }

  return message.channel.send("pong!");
}

module.exports.help = {
	name: "ping"
}
