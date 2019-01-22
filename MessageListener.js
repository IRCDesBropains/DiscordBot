/************************************************* 
*            MODULE MESSAGE_LISTENER             *
*************************************************/

var movieRecommendation = require("./MovieRecommendation/MovieRecommendation");
var eventsFactory = require("./Events/EventsFactory");
var eventManager = require("./Events/EventManager");

function getTemperature(IP, API_KEY, message) {
        console.log("http://" + IP + ":5000/data/temperature/" + API_KEY);
        $.ajax({
            type: 'GET',
            url: "http://" + IP + ":5000/data/temperature/" + API_KEY,
            success: function(data){
                data = JSON.parse(data);
                if(data["status"] == "success"){
                    message.reply("La température de mon petit appart' de bot est de " + data["temperature"] + "°C");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(jqXHR.status == 0){
                    message.reply("Mon petit appart' de bot est indisponible pour le moment :(");
            }
        }
    });
}

module.exports = function() {
    var MessageListener = {};

    /**
     * @description Ecoute et réagit aux messages des membres de la guilde
     * @param client - Le client Discord
     * @param debug - Booléen
     */
    MessageListener.listen = function(client, API_KEY, IP, debug){
        client.on('message', message => {
            if (message.content === 'ping') {
                message.reply('pong');
            }
            else if (message.content.startsWith("/say")) {
                var msg = message.content.split("/say");
                client.channels.get('136866168454643712').send(msg[1]);
            }
            else if (message.content === '/help') {
                message.reply('Liste des commandes utilisables :\nAucune');
            }
            else if (message.content === '/getTemp') {
                getTemperature(IP, API_KEY, message);
            }
            /*else if (message.content === '/event') {
                message.reply('Liste des events : Aucun');
                var event = eventsFactory.build("BLIND_BID", message, debug);
                eventManager.start(event, message, debug);
                event.addPlayer("Nom20", 20, message, debug);
                event.addPlayer("Nom40", 40, message, debug);
                event.addPlayer("Nom30", 30, message, debug);
                event.maxBet(message, debug);
                eventManager.closeEvent(message, debug);
            }*/
            /*else if (message.content.startsWith("/film recommend")) {
                var str = message.content.split(" ");
                var movieName = "";
                // Get the movie's name
                for(var i = 2; i < str.length; i++){
                    movieName += str[i] + " ";
                }
                movieName = movieName.substring(0, movieName.length - 1)
                // Predict likelability
                movieRecommendation.isRecommended(movieName, debug, function(res){
                    res = parseInt(res * 100) / 100;
                    if(res > 0.25){
                        message.reply("Je te recommande ce film (score : " + res + ") !");
                    }
                    else{
                        message.reply("Je ne pense pas qu'il te plaise ... (score : " + res + ")");                        
                    }
                });
            }*/

        });
    };

    return MessageListener;
}();
