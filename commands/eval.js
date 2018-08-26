/*
    Command Name: eval
    Function: Allows code to be run through the bot
    Clearance: Owner Only
  	Default Enabled: Disable
    Date Created: 10/17/17
    Last Updated: 05/23/18
*/

// Load in Required Files
const fs = require(`fs`);
const channels = require(`../files/channels.json`);
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const includedCommands = require(`../files/includedCommands.json`);
const roles = require(`../files/roles.json`);
const userids = require(`../files/userids.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);

// Command Variables
const announce = require(`../commands/announce.js`);
const bentquote = require(`../commands/bentquote.js`);

// Misc. Variables
const name = "Eval";

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`"
        + String.fromCharCode(8203)).replace(/@/g, "@"
        + String.fromCharCode(8203));
    else {
        return text;
    }
}

module.exports.run = async (bot, message, args, sql) => {
  // Debug to Console
  debug.log(`I am inside the ${name} command.`);

  // Owner ID Check
  if (message.author.id !== userids.ownerID) {
    let reply = await (`WARNING. ATTEMPTED USE OF EVAL COMMAND BY `
      + `**${message.author.username}**`);
    debug.log(reply);
    console.log(reply);
    return bot.users.get(userids.ownerID).send(reply).catch(error => {
      errorLog.log(reply);
      errorLog.log(error);
    });
  } else {
    // Enabled Command Test
    if (!enabled.eval) {
      return disabledCommand.run(name, message);
    } else {
      try {
        const code = args.join(" ");
        let evaled = await eval(code);
        if (typeof evaled !== "string") {
          evaled = require("util").inspect(evaled);
        }
        message.channel.send(clean(evaled), { code: "xl" });
      }
      catch (error) {
        try {
          message.channel.send(`\`ERROR:\` \`\`\`xl\n${clean(error)}\n\`\`\``)
          errorLog.log(error);
        }
        catch (error) {
          message.channel.send(`\`ERROR UNABLE TO SEND ERROR MESSAGE DUE TO `
            + `CHARACTER RESTRICTION. ERROR HAS BEEN LOGGED.\``);
          errorLog.run(error);
        }
      }
    }
  }
  // ALWAYS MAKE IT RESET OWNER ID.
  return userids.ownerID = "172020069453398017"
}

module.exports.help = {
  name        : "eval",
  description : ("OWNER ONLY. ALL ACCESS COMMAND.")
}
