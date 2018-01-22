const Discord = require('discord.js');
const client = new Discord.Client();
var messageListener = require("./MessageListener");

var debug = true;
if(debug)
	TOKEN = "NDA0NDEwMDQ1Mzg4ODE2Mzg0.DUVcdw.Ool5LNxfiiR3uPzyEnPwzInvQdY";
else
	TOKEN = process.env.BOT_TOKEN;


client.on('ready', () => {
	messageListener.listen(client, debug);
});


// THIS  MUST  BE  THIS  WAY
client.login(TOKEN);
