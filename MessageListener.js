
/************************************************* 
 *            MODULE MESSAGE_LISTENER            *
*************************************************/


module.exports = function() {
    var MessageListener = {};

    /**
     * @description 
     * @param 
     * @param 
     * @return 
     */
    MessageListener.listen = function(client){
        client.on('message', message => {
            if (message.content === 'ping') {
                message.reply('pong');
            }
        });
    };
                                
    return MessageListener;
}();
