/************************************************* 
 *               MODULE RESEARCH                 *
*************************************************/

var allocine = require('allocine-api');


module.exports = function() {
    var Research = {};

    Research.getGenres = function(name, debug, callback){
        name = name.toUpperCase();
        if(debug)
            console.log("Recherche du film \"" + name + "\"");
        
        // Recherche de tous les films "spiderman" 
        allocine.api('search', {q: name, filter: 'movie'}, function(error, results) {
            if(error) { console.log('Error : '+ error); return; }
            var movieCode = 0;

            var feed = results.feed.movie;
            for(var movie in feed){
                if(feed[movie].originalTitle.toUpperCase() == name || (feed[movie].title != undefined && feed[movie].title.toUpperCase() == name)){
                    movieCode = feed[movie].code;
                    break;
                }
            }

            if(debug)
                console.log("Le film \"" + name + "\" possède le code " + movieCode);

            // Informations sur un film particulier 
            allocine.api('movie', {code: movieCode}, function(error, result) {
                if(error) { console.log('Error : '+ error); return; }
                var genres = result.movie.genre;
                var res = [];
                for(var g in genres){
                    var genre = toEnglish(genres[g].$);
                    if(genre != undefined){
                        res.push(genre);
                    }
                }
                res.push(result.movie.statistics.pressRating / 25);
                                
                callback(res);
            });
        });
        



    };
                                
    return Research;
}();

function toEnglish(word){
    var genreToEnglish = [];
    genreToEnglish["Action"] = "Action";
    genreToEnglish["Adulte"] = "Adult";
    genreToEnglish["Aventure"] = "Adventure";
    genreToEnglish["Animation"] = "Animation";
    genreToEnglish["Biographie"] = "Biography";
    genreToEnglish["Comédie"] = "Comedy";
    genreToEnglish["Policier"] = "Crime";
    genreToEnglish["Documentaire"] = "Documentary";
    genreToEnglish["Drame"] = "Drama";
    genreToEnglish["Famille"] = "Family";
    genreToEnglish["Fantastique"] = "Fantasy";
    genreToEnglish["FilmNoir"] = "FilmNoir";
    genreToEnglish["Historique"] = "History";
    genreToEnglish["Thriller"] = "Thriller";
    genreToEnglish["Romance"] = "Romance";
    genreToEnglish["Science fiction"] = "SciFi";
    genreToEnglish["Horreur"] = "Horror";
    genreToEnglish["Musical"] = "Musical";
    genreToEnglish["Sport"] = "Sport";
    genreToEnglish["Guerre"] = "War";
    genreToEnglish["Western"] = "Western";


    return genreToEnglish[word];
}