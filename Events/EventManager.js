/************************************************* 
*           MODULE EVENT_MANAGER                 *
*************************************************/

module.exports = function() {
    var EventManager = {};

    EventManager.startEvent = function(objEvent, message, debug){
        if(debug)
            message.reply("[EventManager][startEvent] Démarrage d'un event"); //@debug
        objEvent.create(message, debug);
    }

    EventManager.closeEvent = function(objEvent, message, debug){
        objEvent.closeEvent(message, debug);
    }

    return EventManager;
}();
