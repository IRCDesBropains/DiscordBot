const Discord = require('discord.js');
const client = new Discord.Client();
var messageListener = require("./MessageListener");

var debug = true;
TOKEN = process.env.BOT_TOKEN;
API_KEY = process.env.API_KEY;
IP = process.env.IP;


client.on('ready', () => {
	messageListener.listen(client, API_KEY, IP, debug);
});

client.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur le serveur des Bropains, ' + member.displayName)
  }).catch(console.error)
})
/*
client.on('message', message => {

  if (message.content.startsWith('!play')) {

	    let voiceChannel = message.guild.channels
	      .filter(function (channel) { return channel.type === 'voice' })
	      .first()

	    let args = message.content.split(' ')

	    voiceChannel
          .join()
          .then(function (connection) {

	        let stream = YoutubeStream(args[1])
	        stream.on('error', function () {
	          message.reply("Je n'ai pas réussi à lire cette vidéo :(")
	          connection.disconnect()
	        })

	        connection
	          .playStream(stream)
	          .on('end', function () {
	            connection.disconnect()
	        })
    	})
  	}
});
*/

// THIS  MUST  BE  THIS  WAY
client.login(TOKEN);
