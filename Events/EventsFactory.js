/************************************************* 
*               MODULE FACTORY                   *
*************************************************/

var blindBid = require("./BlindBid");

module.exports = function() {
    var EventFactory = {};

    /**
     * @description construit et retourne l'objet dont le nom est passé en param
     * @param name - Nom de l'event à construire
     * @param debug - Booléen
     */
    EventFactory.build = function(name, message, debug){
        switch(name) {
            case "BLIND_BID":
                return blindBid;
                break;
        } 
    };
                                
    return EventFactory;
}();
