/**
 * Mr. Prog Bot Script
 * Version 4.1.0
 * Author: AllusiveBox & Th3_M4j0r
 * Date Started: 09/21/18
 * Last Updated: 09/21/18
 * Last Updated By: AllusiveBox
 * 
 */

process.chdir(__dirname); // Ensure Working Directory is Same as Current File

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const fs = require(`fs`);
const betterSql = require(`./classes/betterSql.js`);
const bottoken = require(`./files/bottoken.json`);
const config = require(`./files/config.json`);
const includedCommands = require(`./files/includedCommands.json`);
const userids = require(`./files/userids.json`);

// Load in Required Functions
const memberJoin = require(`./functions/memberJoin.js`);
const memberLeave = require(`./functions/memberLeave.js`);
const onStartup = require(`./functions/onStartup.js`);
const score = require(`./functions/score.js`);
const log = require(`./functions/log.js`);

// Declare the Bot Stuff
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Open SQ Database
const sql = new betterSql();
sql.open(`./files/userinfo.sqlite`);

// Misc.
falseCommandUsedRecently = new Set();

fs.readdir(`./commands/`, async (error, files) => {
    if (error) {
        return log.error(error);
    }

    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if (jsFile.length <= 0) {
        return log.debug(`Unable to locate any commands!`);
    }

    jsFile.forEach(async (file, i) => {
        var toInclude = eval("includedCommands." + file.substring(0, file.indexOf(".")));

        // Test if Including Command
        if (!toInclude) return log.debug(`${file} not loaded!`);

        // Require Command
        let props = require(`./commands/${file}`);

        bot.commands.set(props.help.name.toLowerCase(), props);
    });
});

// Bot on Startup
bot.on("ready", async () => {
    log.debug(`${bot.user.username} is starting up...`);
    bot.commands.get("setstatus").updateStatus(bot, config.defaultStatus);
    onStartup.run(bot, process.argv);
});

// Bot on Unexpected Error
bot.on("uncaughtException", async (error) => {
    await log.error(error);
    await sql.close();
    return process.exit(1) // Return Unexpected Error Code
});

// Bot on SIGINT 
process.on("SIGINT", async () => {
    await log.debug("SIGINT Detected. Shutting down...");
    await sql.close();
    return process.exit(2); // Return SIGINT Error Code
});

// Bot on Disconnect
bot.on("disconnect", async () => {
    await log.debug("Disconnecting...");
    await sql.close();
    return process.exit(3) // Return Disconnected Error Code
});

// Unhandled Rejection
process.on("unhandledRejection", async (reason, p) => {
    await log.error(reason);
});

// Bot on Member Joining Server
bot.on("guildMemberAdd", async member => {
    try {
        await memberJoin.run(bot, member);
    } catch (error) {
        log.error(error);
    }
});

// Bot on Member Leave Server
bot.on("guildMemberRemove", async member => {
    try {
        await memberLeave.run(bot, member, sql);
    } catch (error) {
        log.error(error);
    }
});

// Message Handler
bot.on("message", async message => {
    let prefix = config.prefix;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    // Return on Bot Users
    if (message.author.bot) return;

    // Check if Bot is Accepting Commands or Not
    if (!config.isOn) { // If Bot is Not On...
        let validUser = false;
        Object.keys(userids).forEach(function (key) {
            if (userids[key] === message.author.id) { // If Member is in the User ID List...
                return validUser = true;
            }
        });

        // Return on Invalid Users
        if (!validUser) return;
    }

    // Check if DM
    if (message.channel.type !== "dm") await score.run(bot, message, sql);

    // Check if Command or Not
    if (!message.content.startsWith(prefix)) return; // Return on Not Commands.

    // Check for Valid Commands
    if ((command.indexOf("/") > -1) || (command.indexOf(".") > -1) || (command.indexOf("\\") > -1)) {
        return log.debug(`Attempted use of Invalid Command Elements by ${message.author.username}.`);
    }

    let commandFile = bot.commands.get(command);
    if (commandFile) { // If the Command Exists...
        commandFile.run(bot, message, args, sql);
    } else {
        if (falseCommandUsedRecently.size > 0) {
            return;
        }
        falseCommandUsedRecently.add(message.author.id)
        setTimeout(() => {
            falseCommandUsedRecently.delete(message.author.id);
        }, 60000) // Remove After 60 Seconds

        return message.channel.send(`This is where I'd put a ${command}...\n`
            + `***IF I HAD ONE.*** (╯°□°）╯︵ ┻━┻`);
    }

    // Log Commands
    await log.command(message.author.username, command, args);
});

bot.login(bottoken.token);