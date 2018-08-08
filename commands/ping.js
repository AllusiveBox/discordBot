/*
    Command Name: !ping
    Function: Returns ping so that users can tell if the bot is accepting
              commands currently.
    Clearance: none
	  Default Enabled: Yes
    Date Created: 10/15/17
    Last Updated: 08/08/18
*/

module.exports.run = async (bot, message, args) => {
  return message.channel.send("pong!");
}

module.exports.help = {
	name: "ping"
}
