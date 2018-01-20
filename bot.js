const Discord = require('discord.js');
const client = new Discord.Client();
var messageListener = require("./MessageListener");

var debug = true;

client.on('ready', () => {
	messageListener.listen(client, debug);
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
