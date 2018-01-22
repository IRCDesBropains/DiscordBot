/************************************************* 
 *            MODULE MESSAGE_LISTENER            *
*************************************************/

var movieRecommendation = require("./MovieRecommendation/MovieRecommendation");


module.exports = function() {
    var MessageListener = {};

    /**
     * @description Ecoute et réagit aux messages des membres de la guilde
     * @param client - Le client Discord
     * @param debug - Booléen
     */
    MessageListener.listen = function(client, debug){
        client.on('message', message => {
            if (message.content === 'ping') {
                message.reply('pong');
            }
            if (message.content.startsWith("/film recommend")) {
                var str = message.content.split(" ");
                var movieName = "";
                // Get the movie's name
                for(var i = 2; i < str.length; i++){
                    movieName += str[i] + " ";
                }
                movieName = movieName.substring(0, movieName.length - 1)
                // Predict likelability
                movieRecommendation.isRecommended(movieName, debug, function(res){
                    if(res > 0.25){
                        message.reply("Je te recommande ce film !");
                    }
                    else{
                        message.reply("Je ne pense pas qu'il te plaise ...");                        
                    }
                });
            }

        });
    };
                                
    return MessageListener;
}();
