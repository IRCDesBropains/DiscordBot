const Discord = require('discord.js');
const client = new Discord.Client();
var messageListener = require("./MessageListener");

client.on('ready', () => {
	messageListener.listen(client);
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
