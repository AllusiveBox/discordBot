/**

    cxBot.js Mr. Prog Bot Script
    Version: 4.0.0
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 08/08/18

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`./files/config.json`);
const token = require(`./files/bottoken.json`);
const includedCommands = require(`./files/includedCommands`);
const fs = require(`fs`);
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Load in Required Functions
const debug = require(`./functions/debug.js`);
const errorLog = require(`./functions/errorLog.js`);
const commandLog = require(`./functions/commandLog.js`);
const memberJoin = require(`./functions/memberJoin.js`);
const memberLeave = require(`./functions/memberLeave.js`);
const onStartup = require(`./functions/onStartup.js`);

fs.readdir(`./commands/`, async (error, files) => {
  if (error) {
    debug.log(error);
  }

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    return debug.log("Couldn't find commands!");
  }

  jsfile.forEach(async (file, i) => {
    // Read Through List of Commands to Include in This Instance
    var toInclude = eval("includedCommands."
      +file.substring(0, file.indexOf(".")));
    // Test if Command is to be Included
    if (!toInclude) return debug.log(`${file} not loaded.`);
    // Require Command
    let props = require(`./commands/${file}`);
    // Log Command as Included
    debug.log(`${file} loaded!`);
    // Load in the Command
    bot.commands.set(props.help.name, props);
    console.log(bot.commands);
  });
});

// Bot on Startup
bot.on("ready", async () => {
  debug.log(`${bot.user.username} is starting up...`);
  bot.user.setActivity("Doing some tests!");
  onStartup.run(bot, process.argv);
});

// Bot on Member Joining Server
bot.on(`guildMemberAdd`, async member => {
  try {
    await memberJoin.run(bot, member);
  }
  catch (error) {
    errorLog.log(error);
  }
});

bot.on(`guildMemberRemove`, async member => {
  try {
    await memberLeave.run(bot, member);
  }
  catch (error) {
    errorLog.log(error);
  }
});

// Message Handler
bot.on("message", async message => {

  let prefix = config.prefix
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  if (message.author.bot) { // If Message is From a Bot User...
    return;
  }

  if (!message.content.startsWith(prefix)) { // If Message is Not a command...
    return;
  }

  // Check for Valid commands
  if ((command.indexOf(`/`) > -1) || command.indexOf(`.`) > -1  ) {
    return debug.log(`Attempted use of Invalid Command Elements...`);
  }

  let commandFile = bot.commands.get(command);
  if (commandFile) {
    commandFile.run(bot, message, args);
  }
  else {
    errorLog.log(`Cannot find command for ${command}.`);
  }

  // Log Commands
  commandLog.log(bot, message, command, args);

});

bot.login(token.token);
