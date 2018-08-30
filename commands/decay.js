/*
    Command Name: decay.js
    Function: Returns Decay Server Link Ayeeee
    Clearance: none
  	Default Enabled: Yes
    Date Created: 06/02/18
    Last Updated: 08/30/18
    Last Update By: Th3_M4j0r
*/

// Load in Required Files
const Discord = require(`discord.js`);
const enabled = require(`../files/enabled.json`);
const userids = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
const disabledCommand = require(`../functions/disabledCommand`);

// Command Variables

// Misc. Variables
const name = "Decay";

/**
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} [args]
 */
module.exports.run = async (bot, message, args) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // Enabled Command Test
  if (!enabled.decay) {
    return disabledCommand.run(name, message);
  }

  debug.log(`Generating Message for ${message.author.username}.\n`);
  return message.channel.send(`https://www.youtube.com/watch?v=-d9M_AZqu8U`);

}

module.exports.help = {
  name        : "decay",
  description : ("Summons the wrath of Decay from the Voice Channel!")
}
