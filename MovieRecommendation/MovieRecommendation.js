/************************************************* 
 *         MODULE MOVIE RECOMMENDATION           *
*************************************************/

var allocine = require("./Research");
var recommendation = require("./Recommendation");

module.exports = function() {
    var MovieRecommendation = {};

    MovieRecommendation.isRecommended = function(movieName, debug, callback){
        allocine.getGenres(movieName, debug, function(res){
            if(debug)
                console.log("Genres de " + movieName + " : " + res);
            var rating = res[res.length - 1];
            res.pop();
            recommendation.predict(toBinary(res, rating), debug, function(res){
                if(debug)
                    console.log("Film recommandé : " + res);
                callback(res);
            });
        });  
    };
                                
    return MovieRecommendation;
}();

function toBinary(genres, rating){
    var binary = {
            "Action": 0,
            "Adventure": 0,
            "Animation": 0,   
            "Biography": 0,
            "Comedy": 0,
            "Crime": 0,
            "Documentary": 0,
            "Drama": 0,
            "Family": 0,
            "Fantasy": 0,
            "History": 0,
            "Horror": 0,
            "Musical": 0,
            "Romance": 0,
            "SciFi": 0,
            "Thriller": 0,
            "War": 0,
            "Western": 0,
        };

    for(var g in genres){
        binary[genres[g]] = 1;        
    }

    var index = [];
    // build the index
    for (var x in binary) {
        index.push(x);
    }
    // sort the index
    index.sort(function (a, b) {    
        return a == b ? 0 : (a > b ? 1 : -1); 
    });

    var res = [];
    for(var i = 0; i < index.length; i++){
        res.push((binary[index[i]]));
    }
    res.push(rating);
    return res;
}