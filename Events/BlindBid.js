/************************************************* 
*              MODULE BLIND_BID                  *
*************************************************/

module.exports = function() {
    var BlindBid = {};

    /**
     * @description 
     * @param debug - Booléen
     */
    BlindBid.create = function(message, debug){
        message.reply("creation du blindbid object");
    };
                                
    return BlindBid;
}();
