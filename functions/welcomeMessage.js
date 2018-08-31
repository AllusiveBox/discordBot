/**

    cxBot.js Mr. Prog Welcome Message Script
    Version: 1
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 08/30/18
    Last Update By: AllusiveBox

**/

// Load in Required Libraries and Files
const Discord = require(`discord.js`);
const config = require(`../files/config.json`);
const debug = require(`../functions/debug.js`);
const channels = require(`../files/channels.json`);

/**
 * 
 * @param {Discord.Member} member
 */
module.exports.run = (member) => {
    // Get the Server Name
    let serverName = member.guild.name;
    // Read in the Bot prefix
    let prefix = config.prefix;
    // Load in the Rules Channel ID
    let rulesID = channels.rules;
    // Check if there was an ID Provided
    if (!rulesID) { // If no Rules ID...
        debug.log(`Unable to find the rules ID in channels.json.`
            + `Looking for another rules channel.`);
        // Look for Rules Channel in the Server
        //let rulesChannel = member.guild.channels.find(`name`, `rules`);
        let rulesChannel = member.guild.channels.find(val => val.name === 'rules').id; //changed to function, since other way is deprecated
        if (!rulesChannel) {
            debug.log(`Unable to find any kind of rules channel.`);
        } else {
            rulesID = rulesChannel.id;
        }
    }
    // Define the Rules Channel Name
    let rulesChannel = "the server";
    // Check if there is an ID Now
    if (rulesID) { // If there is a Rules ID...
        rulesChannel = `<#${rulesID}>`;
    }
    // Generate the Welcome Message
    debug.log(`Generating welcome message for ${member.user.username}`);
    let welcomeMessage = (`Welcome to the ${serverName} server, ${member}!\n`
        + `Before you are able to post in the server, you will need to make sure `
        + `you have a verified e-mail linked to your Discord account.\n`
        + `Please note that by posting in ${serverName}, you are agreeing to the `
        + `rules found in ${rulesChannel}.\n\n\n`
        + `This bot will collect user data while you remain in ${serverName}, but `
        + `you can opt out of this at any time with the ${prefix}optOut command.\n`
        + `For a list of my commands, use !help.\n\n`);

    return welcomeMessage;
}
