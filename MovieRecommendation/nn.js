/************************************************* 
 *             NEURAL NETWORK WRITER             *
*************************************************/

var nn = require('nn')
var csv = require("fast-csv");
const writeFile = require('write-file')

//Rate by genre to train the network
var genreRating = {
    "Action": 0.2,
    "Adult": 0,
    "Adventure": 0.15,
    "Animation": 0.15,
    "Biography": 0,
    "Comedy": 0.08,
    "Crime": 0,
    "Documentary": 0,
    "Drama": 0,
    "Family": 0,
    "Fantasy": 0.15,
    "FilmNoir": 0,
    "GameShow": 0,
    "History": 0,
    "Horror": 0,
    "Music": 0,
    "Musical": 0,
    "Mystery": 0.15,
    "News": 0.08,
    "RealityTV": 0,
    "Romance": 0,
    "SciFi": 0.15,
    "Short": 0,
    "Sport": 0,
    "TalkShow": 0,
    "Thriller": 0.08,
    "War": 0,
    "Western": 0.15,
    "Rating": 0,
};
var directors = {};
var file = [];

csv.fromPath("../Datasets/imdb.csv", { delimiter: "," })
    .on("data", function (data) {
        if (data[16] != "Action")
            file.push({
                "Action": data[16],
                "Adult": data[17],
                "Adventure": data[18],
                "Animation": data[19],
                "Biography": data[20],
                "Comedy": data[21],
                "Crime": data[22],
                "Documentary": data[23],
                "Drama": data[24],
                "Family": data[25],
                "Fantasy": data[26],
                "FilmNoir": data[27],
                "GameShow": data[28],
                "History": data[29],
                "Horror": data[30],
                "Music": data[31],
                "Musical": data[32],
                "Mystery": data[33],
                "News": data[34],
                "RealityTV": data[35],
                "Romance": data[36],
                "SciFi": data[37],
                "Short": data[38],
                "Sport": data[39],
                "TalkShow": data[40],
                "Thriller": data[41],
                "War": data[42],
                "Western": data[43],
                "Rating": 0
            });
    })
    .on("end", function () {
        var cpt_dir = 0;
        for (var i = 0; i < file.length; i++) {
            var rating = 0;

            var index = [];
            // build the index
            for (var x in file[i]) {
                index.push(x);
            }
            // sort the index
            index.sort(function (a, b) {
                return a == b ? 0 : (a > b ? 1 : -1);
            });

            for (var j = 0; j < index.length; j++) {
                if (file[i][index[j]] == 1)
                    file[i].Rating += genreRating[index[j]];
            }
        }
        neural_network(file);
    });


function neural_network(file) {
    var data = [];
    for (var i = 0; i < file.length; i++) {
        data.push({
            input: [file[i].Action, file[i].Adventure, file[i].Animation, file[i].Biography,
            file[i].Comedy, file[i].Crime, file[i].Documentary, file[i].Drama, file[i].Family, file[i].Fantasy,
            file[i].History, file[i].Horror, file[i].Musical,
            file[i].Romance, file[i].SciFi, file[i].Thriller, file[i].War, file[i].Western
            ], output: [file[i].Rating]
        });
    }
    var test = [];
    for (var i = 500; i < 14000; i++) {
        test.push({
            input: [file[i].Action, file[i].Adventure, file[i].Animation, file[i].Biography,
            file[i].Comedy, file[i].Crime, file[i].Documentary, file[i].Drama, file[i].Family, file[i].Fantasy,
            file[i].History, file[i].Horror, file[i].Musical,
            file[i].Romance, file[i].SciFi, file[i].Thriller, file[i].War, file[i].Western
            ], output: [file[i].Rating]
        });
    }
    var net = nn({
        // hidden layers eg. [ 4, 3 ] => 2 hidden layers, with 4 neurons in the first, and 3 in the second. 
        layers: [4, 3],
        // maximum training epochs to perform on the training data 
        iterations: 15000,
        // maximum acceptable error threshold 
        errorThresh: 0.0014,
        // activation function ('logistic' and 'hyperbolic' supported) 
        activation: 'logistic',
        // learning rate 
        learningRate: 0.1,
        // learning momentum 
        momentum: 0.4,
        // logging frequency to show training progress. 0 = never, 10 = every 10 iterations. 
        log: 10
    });

    net.train(data);

    //Write the NN into a json file to use it later for recommendation
    writeFile('neural_network.json', net.toJson(), function (err) {
        // if not `err`, file is written
    })
}