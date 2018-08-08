const config = require(`./files/config.json`);
const token = require(`./files/bottoken.json`);
const Discord = require(`discord.js`);

const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Doing some tests!");
});

bot.login(token.token);
