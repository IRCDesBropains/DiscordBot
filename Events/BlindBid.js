/************************************************* 
*              MODULE BLIND_BID                  *
*************************************************/

module.exports = function() {
    var BlindBid = {};
    var playerList = [];
    var startTime = 0;
    var init = false;

    /**
     * @description 
     * @param debug - Booléen
     */
    BlindBid.create = function(message, debug){
        init = true;
        startTime = new Date();
        if(debug)
            message.reply("[BlindBid][create] Creation du blindbid object"); //@debug
    };

    BlindBid.addPlayer = function(playersName, bet, message, debug){
        if(isFinished(message, debug)){
            playerList.push({
                key: playersName,
                value: bet
            });
            if(debug)
                message.reply("[BlindBid][addPlayer] Mise à jour de l'enchère de " + playersName + " à " + bet); //@debug
        }
    }

    BlindBid.isFinished = function(playersName, bet, message, debug){
        var now = new Date();
        if((startTime - now).getHours() > 12)
            init = false;
        if(debug)
            message.reply("[BlindBid][isFinished] Event terminé : " + init); //@debug
        return init;
    }

    BlindBid.maxBet = function(message, debug){
        var max = 0;
        var argmax = null;
        for(obj in playerList){
            if(obj.value > max){
                max = obj.value;
                argmax = obj.key;
            }
        }
        if(debug)
            message.reply("[BlindBid][maxBet] Meilleure enchère de " + argmax + " à " + max); //@debug
    }

    BlindBid.closeEvent = function(message, debug){
        if(init){
            init = false;
            playerList = [];
            if(debug)
                message.reply("[BlindBid][closeEvent] Enchère terminée"); //@debug
        }
    }


                                
    return BlindBid;
}();
