/************************************************* 
 *            MODULE RECOMMENDATION              *
*************************************************/

var nn = require('nn')
var jsonfile = require('jsonfile')


module.exports = function() {
    var Recommendation = {};

    Recommendation.predict = function(genres, debug, callback){
        var file = "./Data/neural_network.json";
        jsonfile.readFile(file, function(err, obj) {
            var net = nn({
                // hidden layers eg. [ 4, 3 ] => 2 hidden layers, with 4 neurons in the first, and 3 in the second. 
                layers: [4, 3],
                // maximum training epochs to perform on the training data 
                iterations: 15000,
                // maximum acceptable error threshold 
                errorThresh: 0.0015,
                // activation function ('logistic' and 'hyperbolic' supported) 
                activation: 'logistic',
                // learning rate 
                learningRate: 0.1,
                // learning momentum 
                momentum: 0.4,
                // logging frequency to show training progress. 0 = never, 10 = every 10 iterations. 
                log: 10
            });
            // Load JSON from the previous NN trained
            net.fromJson(JSON.stringify(obj));
            callback(net.send(genres));
        });
    };
                                
    return Recommendation;
}();
