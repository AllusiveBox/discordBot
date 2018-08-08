/**

    cxBot.js Mr. Prog Bot Script
    Version: 4.0.0
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 08/08/18

**/

const config = require(`./files/config.json`);
const token = require(`./files/bottoken.json`);
const Discord = require(`discord.js`);
const fs = require(`fs`);
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir(`./commands/`, (error, files) => {
  if (error) {
    console.log(error);
  }

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands!");
    return;
  }

  jsfile.forEach((file, i) => {
    let props = require(`./commands/${file}`);
    console.log(props);
    console.log(`${file} loaded!`);
    bot.commands.set(props.help.name, props);

  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Doing some tests!");
});

bot.on("message", async message => {

  let prefix = config.prefix
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  if (message.author.bot) { // If Message is From a Bot User...
    return;
  }

  if (!message.content.startsWith(prefix)) { // If Message is Not a command...
    return console.log(`Not a command...`);
  }
  console.log(`args:\n\t${args}`);
  console.log(`command:\n\t${command}`);

  // Check for Valid commands
  if ((command.indexOf(`/`) > -1) || command.indexOf(`.`) > -1  ) {
    return console.log(`Attempted use of Invalid Command Elements...`);
  }

  console.log(command);
  let commandFile = bot.commands.get(command);
  if (commandFile) {
    commandFile.run(bot, message, args);
  }
  else {
    console.log(`Cannot find command for ${command}.`);
  }
})

bot.login(token.token);
