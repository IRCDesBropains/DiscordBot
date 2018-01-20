
/************************************************* 
 *            MODULE MESSAGE_LISTENER            *
*************************************************/


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
        });
    };
                                
    return MessageListener;
}();
