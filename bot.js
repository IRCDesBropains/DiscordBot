const Discord = require("discord.js");
const Sequelize = require("sequelize");
const YoutubeStream = require('youtube-audio-stream');
const request = require("request");
const allocine = require('allocine-api');
const bnet = require('battlenet-api')("evv4r5tffjxejrxyms7nhkbvhczupe99");
const promise = require('promise');
const TransloaditClient = require('transloadit');
const transloadit = new TransloaditClient({
    authKey: "fe9d664087d911e6ad7409a9cf8138d8",
    authSecret: "14e0e2b77fc5dabb9459550fbf71b64becc86812"
});
const express = require("express");
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const app = express();
var channel;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('dist'));

app.get('/', function (req, res) {
    console.log("req");
    res.send('Hello World!');
});

app.post('/', function (req, res) {
    console.log(req.body);
    var json = JSON.parse(req.body.transloadit);
    if(json.http_code == 200 && channel != undefined)
    {
        var url = json.results.text_step[0].url;
        console.log(url);
        var file = fs.createWriteStream('./files/temp/doodle.png');
        request(url).pipe(file.on('finish', function() {
            file.close(function(){
                channel.sendFile("./files/temp/doodle.png",null,"coucou");
            });  // close() is async, call cb after close completes.

        }));


    }
    res.sendStatus(200);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//Connexion à mysql
const sequelize = new Sequelize('discord', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    //storage: 'path/to/database.sqlite'
});

/*********************************************************************************************************
 *									CREATION DES MODELES / CLASSES										 *
 *																										 *
 *********************************************************************************************************/

var Joueurs = sequelize.import(__dirname +"/Joueurs.js");
var Personne = sequelize.import(__dirname +"/Personnes.js");
var Rappels = sequelize.import(__dirname +"/Rappels.js");
var Bibliotheque = sequelize.import(__dirname +"/Bibliotheque.js");
var Jeux = sequelize.import(__dirname +"/Jeux.js");
var SessionJeux = sequelize.import(__dirname +"/SessionJeux.js");
var Messages = sequelize.import(__dirname +"/Messages.js");
var Playlist = sequelize.import(__dirname +"/Playlist.js");
var Musiques = sequelize.import(__dirname +"/Musiques.js");
const IdJeu = sequelize.import(__dirname + "/IdsJeux.js");

var FileMusique = require(__dirname +"/FileMusique.js");

// Associations
Personne.hasOne(IdJeu,{as:'ListeIds',foreignKey: 'id_personne'});

sequelize.sync().then(function (t) {
    console.log("sync OK");
    Personne.find({where:{
        pseudo:'Josstoh'
    }}).then(function (p) {
        console.log(p.getListeIds().then(function(ids){
            console.log(ids.id_lol);
        }));
    });
});

var fileMusique = new FileMusique();
var bot = new Discord.Client();


/*********************************************************************************************************
 *  BOUCLE PRINCIPALE : CHERCHE DES RAPPELS, AJOUTE DES JEUX ET ACTUALISE LES TEMPS DE JEUX DES JOUEURS,	 *
 *												LANCE LES MUSIQUES										 *
 *********************************************************************************************************/

/*bot.on('ready', () => {
	setInterval(function(){
	//Cherche des rappels passés, les affiche et les supprime.
	Rappels.findAll({
		attributes: ['id', 'description', 'cible', 'date', 'actif']
	}).then(function(r) {
   		var ojd = new Date();
   		for(var i = 0; i < r.length; i++){


   			if(r[i].dataValues.actif == 1 && r[i].dataValues.date.getTime() - ojd.getTime() <= 0){
   				var description = r[i].dataValues.description;
   				var id = r[i].dataValues.id;
   				var cible = r[i].dataValues.cible;
				Personne.findAll({
					attributes: ['pseudo'],
					where: {
						id: cible
					}
				}).then(function(r) {
			   		bot.sendMessage(bot.channels.get("name", "general").id, bot.users.get("name", r[0].dataValues.pseudo).mention()
			   			+ "\nVoici un rappel :\n"
			   			+ description);
					Rappels.update({
					  	actif: 0,
					}, {
				  		where: {
					    	id: id
				  		}
					});
				});
   			}
   		}
	});
	//Lance les musiques
	if(!fileMusique.vide() && fileMusique.lancerProchaineMusique()){
		bot.joinVoiceChannel(bot.channels.get("name", "Général").id).then(function(r){
	    	if (bot.voiceConnection) {
				var request = require("request");
				// Get the voice connection...
				var connection = bot.voiceConnection;

				if(fileMusique.getPasserMusique()){
					console.log("STOP PLAYING");
					bot.voiceConnection.stopPlaying();
				}

				// ...get the request module which will be used to load the URL...
				// ...get the stream from the URL...
				var url = fileMusique.prochaineMusique();
				if(url != undefined){

					var stream = request(url);
					// ...and play it back
					try{
						connection.playRawStream(getAudio(url)).then(intent => {
						// If the playback has started successfully, reply with a "playing"
						intent.on("end", () => {
							// Edit the "playing" message to say that the song has finished
							fileMusique.ouvrirMutex();
						});
						}).catch(function(error){
							console.log("Erreur playRawStream : " + error);
						});
					}
					catch(ex){
						console.log("Erreur playRawStream : " + error);
					}

				}
			}
		}).catch(function(error){
			console.log("Erreur joinVoiceChannel : " + error);
		});
	}

	//Vérifie si les personnes jouent à de nouveaux jeux
	Personne.findAll({
		attributes: ['pseudo', 'id']
	}).then(function(r) {
		//Pour tous les pseudo voir à quoi ils jouent
		r.forEach(function(el){
			var nomJeu = bot.users.get("name", el.dataValues.pseudo).game;
			var idP = el.dataValues.id;
			if(nomJeu != null){
				nomJeu = nomJeu.name;
				Jeux.findAndCountAll({
					attributes: ['nom'],
					where: {
				    	nom: nomJeu
				  	}
				}).then(function(r) {
					//Si le jeu n'existe pas dans Jeux alors on l'ajoute
					var pseudo = el.dataValues.pseudo;
					if(r.count == 0){
						Jeux.sync().then(function() {
							var data = {
								nom: nomJeu,
							};
							Jeux.create(data).then(function(p){
								Jeux.findAll({
									attributes: ['id'],
									where: {
										nom: nomJeu
									}
								}).then(function(r) {
									var idJeu = r[0].dataValues.id
									//Puis on l'actualise dans la Bibliothèque avec la personne concernée
									Personne.findAll({
										attributes: ['id'],
										where: {
											pseudo: pseudo
										}
									}).then(function(r) {
										var idPersonne = r[0].dataValues.id;
										Bibliotheque.sync().then(function() {
											var data = {
												idJeu: idJeu,
												idPersonne: idPersonne,
											};
											Bibliotheque.create(data).then(function(p){
											})
										}).catch(function(error) {
											console.log("Le couple Bibliotheque n'a pas pu etre ajoutée : " + error);
										});
									});
								});
							})
						}).catch(function(error) {
							//console.log(error);
						});
					}
					//Si le jeu existe
					else{
						//On vérifie qu'il soit associé au joueur concerné dans la Bibliothèque
						Personne.findAll({
							attributes: ['id'],
							where: {
								pseudo: pseudo
							}
						}).then(function(r) {
							var idPersonne = r[0].dataValues.id;
							Bibliotheque.findAndCountAll({
								attributes: ['idJeu'],
								where: {
									idPersonne: idPersonne
								}
							}).then(function(r) {
								//S'il n'existe pas on doit l'ajouter
								if(r.count == 0){
									Jeux.findAll({
										attributes: ['id'],
										where: {
											nom: nomJeu
										}
									}).then(function(r) {
										var idJeu = r[0].dataValues.id
										Bibliotheque.sync().then(function() {
											var data = {
												idJeu: idJeu,
												idPersonne: idPersonne,
											};
											Bibliotheque.create(data).then(function(p){
											})
										}).catch(function(error) {
											console.log("Le couple Bibliotheque n'a pas pu etre ajoutée : " + error);
										});
									});

								}
								//Sinon s'il existe il faut actualiser les temps de jeu
								else{
									Jeux.findAll({
										attributes: ['id'],
										where: {
											nom: nomJeu
										}
									}).then(function(r) {
										var idJeu = r[0].dataValues.id;
										SessionJeux.findAndCountAll({
											attributes: ['id', 'idJeux', 'tempsJeux', 'enTrainDeJouer'],
											where: {
												idPersonne: idPersonne,
												idJeux: idJeu,
												enTrainDeJouer: 1
											}
										}).then(function(r) {
											//Si la session de jeu n'existe pas, on l'ajoute
											var dateheure = avoirDateHeure();
											if(r.count == 0){
												SessionJeux.sync().then(function() {
													var data = {
														idJeux: idJeu,
														idPersonne: idPersonne,
														date: dateheure,
														tempsJeux: 0,
														enTrainDeJouer: 1
													};
													SessionJeux.create(data).then(function(p){
													})
												}).catch(function(error) {
													console.log("La session de jeu n'a pas pu être ajoutée : " + error);
												});
											}
											//Si la session de jeu existe il faut vérifier que le jeu joué soit toujours le même (multi fenetrage)
											else{
												SessionJeux.findAll({
													attributes: ['id', 'idJeux', 'tempsJeux', 'enTrainDeJouer', 'date'],
													where: {
														idPersonne: idPersonne,
														idJeux: idJeu,
														enTrainDeJouer: 1
													}
												}).then(function(r) {
													var dateDebut = r[0].dataValues.date;
													var ojd = new Date();
													var tempsJeu = ((ojd.getTime() - dateDebut.getTime()) / 1000) / 60;
													//Si c'est le même jeu il faut ajouter du temps au compteur
													if(r[0].dataValues.idJeux == idJeu){
														SessionJeux.update({
															tempsJeux: tempsJeu,
														}, {
															where: {
																idJeux: idJeu,
																idPersonne: idPersonne,
																enTrainDeJouer: 1
															}
														});
													}
													//Sinon on ferme simplement la session de jeu
													else{
														SessionJeux.update({
															enTrainDeJouer: 0,
														}, {
															where: {
																idJeux: r[0].dataValues.idJeux,
																idPersonne: idPersonne,
																enTrainDeJouer: 1
															}
														});
													}
												})
											}
										})
									});
								}
							});
						});
					}
				}).catch(function(error) {
					//Sinon on ajoute le jeu aux jeux, puis à la bibliotheque, puis à la session

					/*Bibliotheque.findAndCountAll().then(function(result) {
					    console.log(result.count);
					    var nbJeux = result.count;
					    Bibliotheque.sync().then(function() {
							var data = {
								idJeux: nomJeu,
								idPersonne:
							};
							Bibliotheque.create(data).then(function(p){
							})
						}).catch(function(error) {
							console.log(error);
						});
					});*/
/*				});
			}
			//Si la personne ne joue pas il faut regarder pour fermer une éventuelle ancienne session de jeu
			else{
				SessionJeux.findAll({
					attributes: ['id', 'idJeux', 'tempsJeux', 'enTrainDeJouer', 'date'],
					where: {
						idPersonne: idP,
						enTrainDeJouer: 1
					}
				}).then(function(r) {
					SessionJeux.update({
						enTrainDeJouer: 0,
					}, {
						where: {
							idPersonne: idP,
							enTrainDeJouer: 1
						}
					});
				})
			}
		})
	});
//Actualisation toutes les 5 secondes, pour la version finale il faudra le passer à 30sc / 1mn
}, 5000);
});
*/

/*********************************************************************************************************
 *										ENREGISTRER LES MESSAGES										 *
 *																										 *
 *********************************************************************************************************/

bot.on("message", msg => {
    var pseudo = msg.author.username;
    var contenu= msg.content;
    var commande = 0;
    if(contenu[0] == "/"){
        commande = 1;
    }
    var date = new Date();

    Personne.findAll({
        attributes: ['id'],
        where: {
            pseudo: pseudo
        }
    }).then(function(r) {
        Messages.sync().then(function() {
            var data = {
                idPersonne: r[0].dataValues.id,
                contenu: contenu,
                commande: commande,
                date: date
            };
            Messages.create(data).then(function(p){
            })
        }).catch(function(error) {
            console.log("Le message n'a pas pu être enreigstré !" + error);
        });
    })
});

/*********************************************************************************************************
 *												HELP   													 *
 *																										 *
 *********************************************************************************************************/

bot.on("message", msg => {
    if (msg.content.startsWith("/help")) {
        msg.channel.sendMessage("```Les commandes disponibles sont : \n/help : affiche le menu d'aide"
            + "\n/man + commande : indique comment utiliser une commande (syntaxe, options...)"
            + "\n/rappel : envoie un message personnalisé de rappel à une personne à l'heure voulue"
            + "\n/musique : lance une musique à partir d'un lien youtube"
            + "```");
    }
});

/*********************************************************************************************************
 *											LANCER DE LA MUSIQUE										 *
 *																										 *
 *********************************************************************************************************/

bot.on("message", msg => {
    if (msg.content.startsWith("/man musique")) {
        msg.channel.sendMessage("``` "
            + " Option(s) :  volume (entre 0 et 1)"
            + " /musique lien_youtube"
            + " /musique volume 0.5"
            + "```");
    }
});

bot.on("message", msg => {
    if (msg.content.startsWith("/musique passer")) {
        var pass = fileMusique.passerMusique();
        if(pass){
            msg.channel.sendMessage("La musique est passée !");
        }
    }
    else if (msg.content.startsWith("/musique volume")) {
        var chaine = msg.content.split(" ");
        bot.voiceConnection.setVolume(chaine[2]);
    }
    else if (msg.content.startsWith("/musique")) {
        var chaine = msg.content.split(" ");
        var url = chaine[1];
        var nom = chaine[1];
        Playlist.findAndCountAll({
            attributes: ['id'],
            where: {
                nom: nom
            }
        }).then(function(r) {
            //Il existe une Playlist, on diffuse la musique !
            if(r.count > 0){
                Playlist.findAll({
                    attributes: ['id'],
                    where: {
                        nom: nom
                    }
                }).then(function(r) {
                    var idPlay = r[0].dataValues.id;
                    Musiques.findAll({
                        attributes: ['url'],
                        where: {
                            idPlaylist: idPlay
                        }
                    }).then(function(r) {
                        r.forEach(function(el){
                            fileMusique.ajouterMusique(el.dataValues.url);
                        });
                    });
                });
            }
            //Il n'existe pas de playlist, il faut voir si le lien est valide
            else{
                var rege = /^https:\/\/www.youtube.com\/.*/;
                if(rege.test(url)){
                    fileMusique.ajouterMusique(url);
                }
                else{
                    msg.channel.sendMessage("La playlist ou musique (lien youtube obligatoire) demandée est introuvable.");
                }
            }
        });
    }
});


/*********************************************************************************************************
 *											GERER DES PLAYLISTS											 *
 *																										 *
 *********************************************************************************************************/

bot.on("message", msg => {
    if (msg.content.startsWith("/playlist creer")) {
        var pseudo = msg.author.username;
        Personne.findAll({
            attributes: ['id'],
            where: {
                pseudo: pseudo
            }
        }).then(function(r) {
            var idP= r[0].dataValues.id;
            var date = new Date();
            var chaine = msg.content.split(" ");
            var nom = chaine[2];
            //Ajouter la Playlist
            Playlist.sync().then(function() {
                var data = {
                    nom: nom,
                    idPersonne: idP,
                    date: date
                };
                Playlist.create(data).then(function(p){
                })
                msg.channel.sendMessage("La playlist " + nom + " a été créée !");
            }).catch(function(error) {
                console.log("La Playlist ne peut pas etre enregistrée : " + error);
            });
        });
    }
    else if (msg.content.startsWith("/playlist supprimer")) {
        var pseudo = msg.author.username;
        Personne.findAll({
            attributes: ['id'],
            where: {
                pseudo: pseudo
            }
        }).then(function(r) {
            var idP= r[0].dataValues.id;
            var date = new Date();
            var chaine = msg.content.split(" ");
            var nom = chaine[2];
            //Obligation de supprimer toutes les musiques d'abord puis la Playlist
            //Récupération de l'id de la Playlist à supprimer
            Playlist.findAll({
                attributes: ['id'],
                where: {
                    nom: nom
                }
            }).then(function(r) {
                var id = r[0].dataValues.id;
                Musiques.destroy({
                    where: {
                        idPlaylist: id
                    }
                }).then(function(){
                    Playlist.destroy({
                        where: {
                            nom: nom
                        }
                    }).then(function(){
                        msg.channel.sendMessage("La playlist " + nom + " a été supprimée !");
                    });
                });
            });
        });
    }
    else if (msg.content.startsWith("/playlist")) {
        var chaine = msg.content.split(" ");
        //Ici l'utilisateur demande l'ajout d'une musique a une playlist existante
        if(chaine.length >= 2){
            var pseudo = msg.author.username;
            Personne.findAll({
                attributes: ['id'],
                where: {
                    pseudo: pseudo
                }
            }).then(function(r) {
                var idP= r[0].dataValues.id;
                var date = new Date();
                var chaine = msg.content.split(" ");
                var musique = chaine[2];
                //Récupération de l'id de la playlist puis ajout de la musique
                Playlist.findAll({
                    attributes: ['id'],
                    where: {
                        idPersonne: idP
                    }
                }).then(function(r) {
                    var idPlay = r[0].dataValues.id;
                    var url = chaine[3];
                    Musiques.sync().then(function() {
                        var data = {
                            url: url,
                            idPlaylist: idPlay
                        };
                        Musiques.create(data).then(function(p){
                        });
                        msg.channel.sendMessage("La musique a été ajoutée à la playlist !");
                    }).catch(function(error) {
                        console.log("La Musique ne peut pas etre enregistrée : " + error);
                    });
                });
            });
        }
        //Sinon on affiche les playlists disponibles
        else{
            Personne.findAll({
                attributes: ['id'],
                where: {
                    pseudo: msg.author.username
                }
            }).then(function(r) {
                var idP= r[0].dataValues.id;
                Playlist.findAll({
                    attributes: ['id', 'nom'],
                    where: {
                        idPersonne: idP
                    }
                }).then(function(r) {
                    var cpt = 0;
                    var chaine = "Playlists de " + msg.author + " : \n";
                    r.forEach(function(el){
                        chaine += cpt + ". " + el.dataValues.nom + "\n";
                    });
                    msg.channel.sendMessage(chaine);
                });
            });
        }
    }
});

/*********************************************************************************************************
 *											GERER LES RAPPELS											 *
 *																										 *
 *********************************************************************************************************/

bot.on("message", msg => {
    if (msg.content.startsWith("/man rappel")) {
        msg.channel.sendMessage("```/rappel pseudo_discord \"description_du_rappel\" jj/mm/aa hh:mm```");
    }
});

bot.on("message", msg => {
    if (msg.content.startsWith("/rappel")) {
        var cibles = [];
        var description = "";
        var date = "";
        var i = 1;
        var str = msg.content.split(" ");
        //Récupération de la cible
        while(str[i][0] != "\""){
            cibles.push(str[i]);
            i++;
        }
        if(cibles.length >  1){
            msg.channel.sendMessage("Erreur de syntaxe, vérifiez la syntaxe sur /man rappel");
            return;
        }
        //Récupération du message
        while(str[i][str[i].length - 1] != "\""){
            description += str[i] + " ";
            i++;
        }
        description += str[i];
        i++;
        //Récupération de la date
        while(i < str.length){
            date += str[i] + " ";
            i++;
        }
        var date_ar = date.split("/");
        var sub = date_ar[2].split(" ");
        if(sub[0] < 16 || date_ar[1] > 12 || date_ar[1] < 0 || date_ar[0] > 31 || date_ar[0] < 0){
            msg.channel.sendMessage("Les valeurs passées en paramètres sont incohérentes !");
            return;
        }
        var date_format = "20" + sub[0] + "-" + date_ar[1] + "-" +  date_ar[0] + " " + sub[1] + ":00";
        //Recherche de l'indentifiant de la cible
        Personne.findAll({
            attributes: ['id'],
            where: {
                pseudo: cibles[0]
            }
        }).then(function(r) {
            //Insertion du rappel dans la bdd
            Rappels.sync().then(function() {
                var data = {
                    date: date_format,
                    description: description,
                    cible: r[0].dataValues.id
                };
                msg.channel.sendMessage("Le rappel est pour " + cibles + " :\n" + description + "\n=> à rappeler le " + date);
                Rappels.create(data).then(function(p){
                })
            }).catch(function(error) {
                msg.channel.sendMessage("La personne que vous demandez vous cherche actuellement au Guatemala");
                console.log(error);
            });
        });
    }
});

/*********************************************************************************************************
 *										FONCTIONS Stats LoL et OW									 *
 *																										 *
 *********************************************************************************************************/
var isValide = function (commande) {
    return (commande != null && commande != "");
};
//LoL
// * = caractère à remplacer
var api_key = "?api_key=f1f7f146-c2e1-4e4e-bfc4-b59ff8c0c452";
var urlSummoner = "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/*"+ api_key;
var urlLeague = "https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/*/entry" + api_key;

var manLol = function(){
    return("----------------------------------------------------------------------\n" +
        "/lol rang **pseudo**\n" +
        "/lol maitrises **pseudo**\n" +
        "/lol historique **pseudo**\n"+
        "/lol lier **pseudo** [**mention_discord**]\n" +
        "----------------------------------------------------------------------");
};

var manLolLier = function(){
    return("----------------------------------------------------------------------\n" +
        "`/lol lier pseudo` \n" +
        "Pour lier son compte LoL à son compte Discord.\n"+
        "`/lol lier pseudo [mention_discord]`\n" +
        "Pour lier son compte LoL à un compte Discord spécifique.\n"+
        "----------------------------------------------------------------------");
};

var errRequeteLol = function (code) {
    var message = "";
    switch(code)
    {
        case 400: message += "Mauvaise requête";break;
        case 401: message += "Reqûete non autorisée";break;
        case 404: message += "Cette personne n'est pas classé. Honte sur & pour des générations !";break;
        case 429: message += "Quota dépassé !";break;
        case 500: message += "Erreur interne du serveur...";break;
        case 503: message += "Service indisponible";break;
    }
    return message;
};

/**
 * Fonction pour obtenir l'id sur LoL à partir de son pseudo sur ce jeu
 *
 * @param pseudo le pseudo LoL dont on veut l'id
 * @returns {Promise} resolve(pseudo,id) ou reject(code erreur)
 */
var getIdLol = function(pseudo) {
    return new Promise(function (resolve, reject) {
        request({
            url: urlSummoner.replace("*",pseudo),
            json: true
        }, function (error, response, json) {
            if (!error && response.statusCode === 200) {
                for (var key in json) {
                    if (json.hasOwnProperty(key)) {
                        resolve({pseudo:json[key].name,id:json[key].id});
                    }
                }
            }
            else{
                reject(response.statusCode);
            }
        });
    });

};

var getRangLol = function(id){
    return new Promise(function (resolve, reject) {
        request({
            url: urlLeague.replace("*",id),
            json: true
        }, function (error, response, data) {
            var message = "";
            if (!error && response.statusCode === 200) {
                console.log(data);
                var row = data[id];
                console.log(id);
                var leagues = {};
                for(var i = 0; i < row.length;i++)
                {
                    leagues[row[i].queue] = {};
                    leagues[row[i].queue].tier = row[i].tier;
                    var entries = row[i].entries[0];
                    leagues[row[i].queue].division = entries.division;
                    leagues[row[i].queue].PL = entries.leaguePoints;
                    leagues[row[i].queue].victoires = entries.wins;
                    leagues[row[i].queue].defaites = entries.losses;
                    if(row[i].queue.localeCompare("RANKED_SOLO_5x5"))
                        leagues[row[i].queue].playstyle = entries.playstyle;
                    if(entries.miniSeries != null)
                    {
                        var bo = entries.miniSeries.progress;
                        bo = bo.replace(/W/g,":heavy_check_mark:");
                        bo = bo.replace(/L/g,":heavy_multiplication_x:");
                        bo = bo.replace(/N/g,":heavy_minus_sign:");
                        leagues[row[i].queue].bo = bo;
                    }
                }

                message = "Classement de **" + commande[2] + "** : \n\n";

                for (var queue in leagues) {
                    if (leagues.hasOwnProperty(queue)) {
                        switch(queue)
                        {
                            case "RANKED_SOLO_5x5": message += "\t- __File Solo/Duo :__ ";
                                break;
                            case "RANKED_TEAM_3x3": message += "\t- __Classé Equipe 3c3 :__ ";
                                break;
                            case "RANKED_FLEX_SR": message += "\t- __File Dynamique :__ ";
                                break;
                        }
                        message += "`";
                        switch(leagues[queue].tier)
                        {
                            case "SILVER": message += "Argent ";
                                break;
                            case "GOLD": message += "Or ";
                                break;
                            case "PLATINUM": message += "Platine ";
                                break;
                            case "DIAMOND": message += "Diamant ";
                                break;
                            case "MASTER": message += "Maître ";
                                break;
                            default: message += leagues[queue].tier + " ";
                        }
                        var partiesTot = parseInt(leagues[queue].victoires) + parseInt(leagues[queue].defaites);
                        var winrate = Number(parseFloat(leagues[queue].victoires)/parseFloat(partiesTot)*100).toFixed(1);
                        message += leagues[queue].division + " " + leagues[queue].PL + " PL`\n\t**" + partiesTot + "** parties " +
                            leagues[queue].victoires + "V/" + leagues[queue].defaites + "D, Taux de victoire : **" +
                            winrate + "%**\n";
                        if(leagues[queue].bo != null)
                        {
                            message += "\tBo en cours : " + leagues[queue].bo + ".\n";
                        }
                        else
                        {
                            message += "\tPas de BO en cours.\n";
                        }
                    }
                }
                resolve(message);
            }
            else{
                reject(response.statusCode);
            }
        });
    });

};

var getRangLolByPersonne = function (pseudo) {
    return new Promise(function (resolve, reject) {
        Personne.find({
            where: {
                pseudo: pseudo
            }
        }).then(function(p) {
            p.getListeIds().then(function (listeIds) {
                if(listeIds.id_lol !== undefined)
                {
                    getRangLol(listeIds.id_lol).then(mess => resolve(mess))
                        .catch(reject);
                }
                else
                {
                    reject('undefined');
                }
            });
        }).catch(function(){console.log("Personne non trouvée...")});
    });
};

var modifIdLolPersonne = function (user,pseudo){
    return new Promise(function (resolve, reject) {
        getIdLol(pseudo)
            .then(function (lol) {
                Personne.find({
                    attributes: ['id', 'id_lol'],
                    where: {
                        pseudo: user.username
                    }
                }).then(function (p) {
                    if (p.id_lol !== lol.id) {
                        p.update({id_lol: lol.id})
                            .then(() => resolve({user: user, pseudo_lol: lol.pseudo}));
                    }
                    else {
                        reject("egaux");
                    }
                }).catch(err => console.log(err));
            }).catch(code => reject(errRequeteLol(code)));
    });
};

// OW
var owUrlProfile = "http://localhost:3000/profile/pc/eu/*";
var owUrlHeros = "http://localhost:3000/stats/pc/eu/*";


//cine
var chainesDates = ["Mercredi\t","Jeudi\t\t  ","Vendredi  ","Samedi\t ","Dimanche","Lundi\t\t ","Mardi\t\t"];
/**
 * Affiche les séances pour un film dans le salon textuel.
 * @param channel le salon textuel
 * @param film un objet contenant le code du film et le titre
 */
var afficheSeances = function(channel,film){
    allocine.api('showtimelist', {movie: film.code, theaters : 'P0671,P0035'}, function(error, results) {
        if(error)
        {
            console.log('Error : '+ error);
            return;
        }

        var theaterShowtimes,message = "";
        var embed = new Discord.RichEmbed();
        embed.setTitle("Séances pour __"+film.titre+"__")
            .setColor("#fa9c1e")
            .setAuthor("Allociné","https://images-na.ssl-images-amazon.com/images/I/41lA5y8GumL.jpg")
            .setImage(film.poster)
            .setURL("http://google.fr")
            .addField("Synopsis","une histoire intéressante",true)
            .addField("Durée","longtemps",true);
        channel.sendEmbed(embed);

        var embedSeances;
        // parcours des cinémas
        for(var i =0; i<2;i++)
        {
            theaterShowtimes = results.feed.theaterShowtimes[i];

            var nomCinema = theaterShowtimes.place.theater.name;

            if(theaterShowtimes.movieShowtimes == undefined)
            {
                // ce film n'est pas prog
                channel.sendMessage("Oops","Désolé mais ce film n'est pas programmé à "+nomCinema+"... :frowning:");
            }
            else
            {
                var nbMovieShowtimes = theaterShowtimes.movieShowtimes.length;

                embedSeances = new Discord.RichEmbed();
                embedSeances.setTitle(nomCinema)
                    .setColor("#fa9c1e")
                    .setURL("http://google.fr");

                var movieShowtimes;
                // parcours différentes projections
                for(var j =0;j<nbMovieShowtimes;j++)
                {
                    movieShowtimes = theaterShowtimes.movieShowtimes[j];

                    var VO = (movieShowtimes.version.original.localeCompare("true") == 0);
                    embedSeances.addField("Version",((VO)?"Origiale":"Française"),false);
                    var dates = movieShowtimes.scr.length;
                    var idJour = 7 - dates;
                    var scr;
                    for(var k=0;k<dates;k++)
                    {
                        scr = movieShowtimes.scr[k];
                        var nbT= scr.t.length;
                        var t,horaires ="";
                        for(var l=0;l<nbT;l++)
                        {
                            t = scr.t[l];
                            horaires += t.$;
                            if(l+1 != nbT)
                                horaires += "h/";
                            else
                                horaires += "h";
                        }
                        embedSeances.addField(chainesDates[idJour],horaires,true);
                        horaires = "";
                        idJour++;
                    }
                    channel.sendEmbed(embedSeances);
                }

            }
        }


    });
};

// wow
var urlJeton = "https://wowtoken.info/snapshot.json";
var params = {origin:"eu",locale:"fr_FR"};

//Puissance 4
var p4 = {};
p4.lignes = 6;
p4.colonnes = 7;
p4.direction = {HAUT_GAUCHE:0,BAS_DROIT:1};
p4.orientation = {HORIZONTAL:0,VERTICAL:1,DIAGONAL1:2,DIAGONAL2:3};

var grille = undefined;
var checkVictoire = function (couleur,courant,ligne,direction) {
    if(!isIn(courant))
        return 0;
    else if(checkCase(courant,couleur))
    {
        return 1 + checkVictoire(couleur,getSuivant(courant,ligne,direction),ligne,direction);
    }
    else
        return 0;
};
var checkCase = function (pion,couleur) {
    return grille[pion.x][pion.y] === couleur;

};
var isIn = function (pion) {
    if(0<=pion.x && pion.x < p4.lignes)
        if(0<=pion.y && pion.y <p4.colonnes) return true;
    return false;
};
var getSuivant = function (c,ligne,direction) {
    var suivant;
    switch (ligne){
        case orientation.HORIZONTAL:{
            if(direction === direction.HAUT_GAUCHE)
                suivant = {x:c.x+1,y:c.y};
            else
                suivant = {x:c.x-1,y:c.y};
            break;
        }
        case orientation.VERTICAL:{
            if(direction === direction.HAUT_GAUCHE)
                suivant = {x:c.x+1,y:c.y-1};
            else
                suivant = {x:c.x-1,y:c.y}+1;
            break;
        }
        case orientation.DIAGONAL1:{
            if(direction === direction.HAUT_GAUCHE)
                suivant = {x:c.x,y:c.y-1};
            else
                suivant = {x:c.x,y:c.y+1};
            break;
        }
        case orientation.DIAGONAL2:{
            if(direction === direction.HAUT_GAUCHE)
                suivant = {x:c.x-1,y:c.y-1};
            else
                suivant = {x:c.x+1,y:c.y+1};
            break;
        }
    }
    return suivant;
};

var commande = "";
var regexMention = /<@\d*>/;
bot.on("message", msg => {
    commande = msg.content.split(" ");
    switch(commande[0]){
        case "/lol": {
            if(commande[1] != null && commande[1] != "")
            {
                switch (commande[1])
                {
                    case "rang":{
                        if(commande[2] != null && commande[2] != "" && !regexMention.test(commande[2]))
                        {
                            // pseudo en paramètre
                            getIdLol(commande[2]).then(lol => getRangLol(lol.id)).then(function (message) {
                                msg.channel.sendMessage(message);
                            }).catch(function (code) {
                                msg.channel.sendMessage(errRequeteLol(code));
                            });
                        }
                        else
                        {
                            if(msg.mentions.users.array().length == 0)
                            {
                                //check pour soi
                                getRangLolByPersonne(msg.author.username)
                                    .then(mess => msg.channel.sendMessage(mess))
                                    .catch(function (erreur) {
                                        var message = "";
                                        if(erreur === 'undefined')
                                            message = "Veuillez lier votre **pseudo LoL** à votre compte ou renseignez un nom d'invocateur en paramètre.\n"+ manLol(msg);
                                        else
                                            message = errRequeteLol(erreur);
                                        msg.channel.sendMessage(message);
                                    });

                            }
                            else if(msg.mentions.users.array().length == 1)
                            {
                                console.log();
                                getRangLolByPersonne(msg.mentions.users.first().username)
                                    .then(mess => msg.channel.sendMessage(mess))
                                    .catch(function (erreur) {
                                        var message = "";
                                        if(erreur === 'undefined')
                                            message = "Veuillez lier cette personne à un **pseudo LoL** ou renseignez un nom d'invocateur en paramètre.\n"+ manLol(msg);
                                        else
                                            message = errRequeteLol(erreur);
                                        msg.channel.sendMessage(message);
                                    });
                            }
                            else
                                msg.channel.sendMessage("Juste une mention s'il-te-plaît, pas plus ! :pray:");


                        }
                        break;
                    }
                    case "maitrises":{
                        if(commande[2] != null && commande[2] != "")
                        {

                        }
                        break;
                    }
                    case "historique":{
                        if(commande[2] != null && commande[2] != "")
                        {

                        }
                        break;
                    }
                    case "lier": {
                        if(commande[2] != null && commande[2] != "")
                        {
                            if(commande[3] != null && commande[3] != "")
                            {
                                //liaison à un autre compte
                                if(msg.mentions.users.array().length == 0)
                                {
                                    msg.channel.sendMessage(`Il faut renseigner un pseudo LoL *ET* mentionner le compte `+
                                        `auquel lier ou ne rien rajouter. :confused:\n${manLolLier()}`);
                                }
                                else if(msg.mentions.users.array().length == 1)
                                {
                                    modifIdLolPersonne(msg.mentions.users.first(),commande[2])
                                        .then(ids => msg.channel.sendMessage(`Comptes ${ids.user} et ${ids.pseudo_lol} liées ! :thumbsup:`))
                                        .catch(function (erreur) {
                                            if(erreur === "egaux"){
                                                msg.channel.sendMessage("Ce compte LoL est déjà lié à ce compte Discord... :confused:");
                                            }
                                            else
                                                msg.channel.sendMessage(`${erreur}\n${manLolLier()}`);
                                        });
                                }
                                else
                                    msg.channel.sendMessage(`Juste une mention s'il-te-plaît, pas plus ! :pray:\n${manLolLier()}`);
                            }
                            else
                            {
                                //liaison à ce compte
                                modifIdLolPersonne(msg.author,commande[2])
                                    .then(ids => msg.channel.sendMessage(`Comptes ${ids.user} et ${ids.pseudo_lol} liées ! :thumbsup:`))
                                    .catch(function (erreur) {
                                        if(erreur === "egaux"){
                                            msg.channel.sendMessage("Ce compte LoL est déjà lié à votre compte Discord... :confused:");
                                        }
                                        else
                                            msg.channel.sendMessage(`${erreur}\n${manLolLier()}`);
                                    });
                            }
                        }
                        else
                        {
                            msg.channel.sendMessage(`J'ai besoin d'un pseudo LoL\n${manLolLier()}`);
                        }
                        break;
                    }
                    default:
                        manLol(msg);
                        break;
                }
            }
            else
            {
                manLol(msg);
            }
            break;
        }
        /** OVERWATCH **/
        case "/ow": {
            if(commande[1] != null && commande[1] != "") {
                switch (commande[1]) {
                    case "profil":{
                        if(commande[2] != null && commande[2] != "") {
                            let nom = commande[2].replace("#","-");
                            request({
                                url: owUrlProfile.replace("*",nom),
                                json: true
                            }, function (error, response, json) {
                                let message = "";
                                if (!error && response.statusCode === 200) {
                                    console.log(json);

                                    if(json.username){
                                        let pseudo = json.username;
                                        let level = json.level;
                                        let cote,rangImg,tier;
                                        if(json.competitive.rank != null)
                                        {
                                            cote = parseInt(json.competitive.rank);
                                            if(cote < 1500)
                                                tier = "Bronze";
                                            else if(cote < 2000)
                                                tier = "Argent";
                                            else if(cote < 2500)
                                                tier = "Or";
                                            else if(cote < 3000)
                                                tier = "Platine";
                                            else if(cote < 3500)
                                                tier = "Diamant";
                                            else if(cote < 4000)
                                                tier = "Maître";
                                            else
                                                tier = "Grand Maître"
                                            rangImg = json.competitive.rank_img;
                                        }
                                        else
                                        {
                                            cote = "Non classé";
                                            tier = "...";
                                        }
                                        let competitiveWins = json.games.competitive.wins;
                                        let competitiveTotal = json.games.competitive.played;
                                        let competitiveLosses = competitiveTotal - competitiveWins;
                                        let quickWins = json.games.quickplay.wins;
                                        let tpsRapide = parseInt(json.playtime.quickplay.split(" ")[0]);
                                        let tpsComp = parseInt(json.playtime.competitive.split(" ")[0]);
                                        let avatar = json.avatar;

                                        let embed = new Discord.RichEmbed();
                                        embed.setTitle("Profil de " + pseudo)
                                            .setColor("#fa9c1e")
                                            .setAuthor("Overwatch","https://images-na.ssl-images-amazon.com/images/I/41lA5y8GumL.jpg")
                                            .setThumbnail(avatar)
                                            .setURL("http://google.fr")
                                            .addField("Niveau",level,true)
                                            .addField("Temps de jeu",(tpsComp+tpsRapide)+"h",true);
                                        var embed2 = new Discord.RichEmbed();
                                        embed2.setTitle("Partie rapide")
                                            .setColor("#fa9c1e")
                                            .setURL("http://google.fr")
                                            .addField("Temps de jeu",tpsRapide+"h",true)
                                            .addField("Victoires",quickWins,true);
                                        var embed3 = new Discord.RichEmbed();
                                        embed3.setTitle("Partie compétitive")
                                            .setColor("#fa9c1e")
                                            .setURL("http://google.fr")
                                            .setThumbnail(rangImg)
                                            .addField("Palier",tier,true)
                                            .addField("Côte",cote,true)
                                            .addField("Temps de jeu",tpsComp+"h",true)
                                            .addField("Victoires",competitiveWins,true)
                                            .addField("Défaites",competitiveLosses,true)
                                            .addField("Total",competitiveTotal,true)
                                            .setFooter("BB-8","https://pbs.twimg.com/profile_images/680053476500631552/Yvw3yGfe.jpg");
                                        msg.channel.sendEmbed(embed);
                                        msg.channel.sendEmbed(embed2);
                                        msg.channel.sendEmbed(embed3);
                                        /*console.log(rangImg);
                                         if(rangImg != "")
                                         msg.channel.sendFile(rangImg,null,message);
                                         else
                                         msg.channel.sendMessage(message);*/
                                    }

                                }
                                else{
                                    message ="";
                                    switch(response.statusCode)
                                    {
                                        case 400: message += "Mauvaise requête";break;
                                        case 401: message += "Reqûete non autorisée";break;
                                        case 404: message += "Cette personne n'est pas classé. Honte sur " + commande[2] + " pour des générations !";break;
                                        case 429: message += "Quota dépassé !";break;
                                        case 500: message += "Erreur interne du serveur...";break;
                                        case 503: message += "Service indisponible";break;
                                    }
                                    console.log(message);
                                    msg.channel.sendMessage(message);
                                }
                            });

                        }
                        break;
                    }
                    case "heros":{
                        if(commande[2] != null && commande[2] != "") {
                            switch (commande[2])
                            {
                                case "classe":{
                                    if(commande[3] != null && commande[3] != "") {
                                        nom = commande[3].replace("#","-");
                                        var url = owUrlHeros.replace("*",nom).replace("*","competitive");
                                        console.log(url);
                                        request({
                                            url: url,
                                            json: true
                                        }, function (error, response, json) {
                                            var message = "";
                                            if (!error && response.statusCode === 200) {
                                                console.log(json);

                                                for(var i=0;i<json.length;i++)
                                                {
                                                    message = "";
                                                    var heros = unescapeHtml(json[i].name);
                                                    var duree = json[i].playtime;
                                                    if(duree.localeCompare("--") == 0)
                                                        duree = "0 temps";
                                                    var image = json[i].image;

                                                    message += "**"+heros+"** : **"+duree+"** de jeu.  "+image +"\n";
                                                    msg.channel.sendMessage(`${message}`);
                                                }
                                            }
                                            else{
                                                message ="";
                                                switch(response.statusCode)
                                                {
                                                    case 400: message += "Mauvaise requête";break;
                                                    case 401: message += "Reqûete non autorisée";break;
                                                    case 404: message += "Cette personne n'est pas classé. Honte sur " + nom + " pour des générations !";break;
                                                    case 429: message += "Quota dépassé !";break;
                                                    case 500: message += "Erreur interne du serveur...";break;
                                                    case 503: message += "Service indisponible";break;
                                                }
                                                console.log(message);
                                                msg.channel.sendMessage(message);
                                            }
                                        });

                                    }
                                    break;
                                }
                                case "normal":{
                                    break;
                                }
                            }
                        }
                        break;
                    }

                    default: msg.channel.sendMessage("Erreur syntaxe");
                }
            }
            else
            {
                console.log("ezaea");
                msg.channel.sendMessage("Erreur syntaxe");
            }
            break;
        }
        case "/cine": {
            var idFilm="";
            if(commande[1] != null && commande[1] != "")
            {
                if(commande[1].localeCompare("choix") != 0)
                {
                    // Recherche d'un film
                    commande.splice(0,1);
                    var query = commande.join(" ");
                    console.log("Recherche pour le film "+ query);
                    allocine.api('search', {q: query, filter: 'movie'}, function(error, results) {
                        if(error) { console.log('Erreur avec l\'API Allociné : '+ error); return; }

                        var message = "" ;
                        if(results.feed.movie != undefined)
                        {
                            var movie,film = {};
                            var nbResultats = results.feed.totalResults;
                            // 1 Résultat ou un film de l'année actuelle
                            if(nbResultats == 1 || results.feed.movie[0].productionYear == new Date().getFullYear())
                            {
                                if(results.feed.movie[0].title != undefined)
                                    film.titre = results.feed.movie[0].title;
                                else
                                    film.titre = results.feed.movie[0].originalTitle;
                                film.code = results.feed.movie[0].code;
                                if(results.feed.movie[0].poster != undefined)
                                    film.poster = results.feed.movie[0].poster.href;
                                else
                                    film.poster = "http://monpiano.free.fr/construction.jpg";
                                afficheSeances(msg.channel,film);
                            }
                            else
                            {
                                // plusieurs choix
                                var min = Math.min(results.feed.movie.length,10);
                                msg.channel.sendMessage("Voci les résultas pour **" + query + "** :");

                                for(var i=0;i<min;i++)
                                {
                                    message = "";
                                    movie = results.feed.movie[i];

                                    var title;
                                    if(movie.title != undefined)
                                        title = movie.title;
                                    else
                                        title = movie.originalTitle;
                                    var code = movie.code;
                                    var année = movie.productionYear;
                                    //console.log(movie.poster.href);
                                    var poster ="";
                                    if(movie.poster != undefined)
                                        poster = movie.poster.href;
                                    message = "\t("+(i+1)+") **" + title +"** (*"+année+"*) - "+poster+" ;";
                                    msg.channel.sendMessage(message);

                                }
                                msg.channel.sendMessage("Faites un choix en envoyant : **/cine choix** `numéro_associé_au_film` au 3639 ! Choix, au 3639 !");
                            }

                        }
                        else
                        {
                            msg.channel.sendMessage("Pas de résultats, veuillez réessayer plus tard...");
                        }

                    });
                }

            }

            allocine.api('showtimelist', {movie: idFilm, theaters : 'P0671,P0035'}, function(error, results) {
                if(error) { console.log('Error : '+ error); return; }

                /*console.log('Voici les données retournées par l\'API Allociné:');
                console.log(results.feed.theaterShowtimes[0].place.theater.name);
                console.log(results.feed.theaterShowtimes.length);//nb cinémas
                console.log(results.feed.theaterShowtimes[0].movieShowtimes.length);//nb version diffusez
                console.log(results.feed.theaterShowtimes[0].movieShowtimes[0].scr.length);//nb jours de prog
                console.log(results.feed.theaterShowtimes[0].movieShowtimes[0].scr[0]);
                console.log(results.feed.theaterShowtimes[0].movieShowtimes[0]);*/
                var theaterShowtimes,message = "";
                for(var i =0; i<2;i++)
                {
                    theaterShowtimes = results.feed.theaterShowtimes[i];

                    var nbMovieShowtimes = theaterShowtimes.movieShowtimes.length;
                    if(nbMovieShowtimes == 0)
                    {
                        // ce film n'est pas prog
                        msg.channel.sendMessage("Désolé mais ce film n'est pas programmé dans cette salle... :(");
                    }
                    else
                    {
                        var titre = theaterShowtimes.movieShowtimes[0].onShow.movie.title;
                        var poster = theaterShowtimes.movieShowtimes[0].onShow.movie.poster.href;
                        var nomCinema = theaterShowtimes.place.theater.name;
                        if(i == 0)
                            message += "Séances pour **"+titre+"** : "+poster+" \n\n";
                        message += "\t__**- "+nomCinema+"** :__\n";
                        var movieShowtimes;
                        for(var j =0;j<nbMovieShowtimes;j++)
                        {
                            movieShowtimes = theaterShowtimes.movieShowtimes[j];

                            var VO = (movieShowtimes.version.original.localeCompare("true") == 0);
                            message += "\t\t- **"+((VO)?"VO":"VF")+"** :\n";
                            var dates = movieShowtimes.scr.length;
                            var idJour = 7 - dates;
                            var scr;
                            for(var k=0;k<dates;k++)
                            {
                                scr = movieShowtimes.scr[k];
                                message += "\t\t\t->"+chainesDates[idJour]+" : ";
                                var nbT= scr.t.length;
                                var t;
                                for(var l=0;l<nbT;l++)
                                {
                                    t = scr.t[l];
                                    message += t.$;
                                    if(l+1 != nbT)
                                        message += "/";
                                    else
                                        message += ";\n";
                                }
                                idJour++;
                            }
                        }

                    }
                }
                msg.channel.sendMessage(message);
            });
            break;
        }
        case "/wow":{
            if(commande[1] != null && commande[1] != "")
            {
                switch (commande[1])
                {
                    case "jeton":{
                        request({
                            url: urlJeton,
                            json: true
                        }, function (error, response, json) {
                            if (!error && response.statusCode === 200) {
                                console.log(json);
                                var eu = json.EU;
                                var prix = eu.raw.buy;
                                var prixMin24 = eu.raw['24min'];
                                var prixMax24 = eu.raw['24max'];
                                var dateMaj = eu.formatted.updated;
                                var chart = eu.formatted.sparkurl;

                                var message = "";
                                message += "Prix actuel : **"+ prix+"** PO - min: **" + prixMin24 +"**/max :**"+prixMax24+"** dans les dernière 24h - MAJ : "+dateMaj+" "+
                                    chart;
                                msg.channel.sendMessage(message);
                            }
                            else{
                                msg.channel.sendMessage("ERREUR");
                            }
                        });
                        break;
                    }

                }
            }

            break;
        }
        case "/sc2":{
            if(commande[1] != null && commande[1] != "")
            {
                switch (commande[1])
                {
                    case "profil":{
                        bnet.sc2.profile.profile({origin: 'eu',locale:'fr_FR', id: 2985215, region: 1, name: 'Nilou'}, function (error,body,res) {
                            if(error == null)
                            {
                                var nom = body.displayName;
                                var clan = body.clanName;
                                var terranWins = body.career.terranWins;
                                var protossWins = body.career.protossWins;
                                var zergWins = body.career.zergWins;
                                var meilleurRangSolo = body.career.highest1v1Rank;
                                var meilleurRangTeam = body.career.highestTeamRank;
                                var totaleVictoiresSaison = body.career.seasonTotalGames;
                                var totaleMatchesCarriere = body.career.careerTotalGames;
                                var niveauSwarm = body.swarmLevels.level;
                                var vic1v1,vic2v2,vic3v3,vic4v4,tot1v1 = 0,tot2v2 = 0,tot3v3=0,tot4v4=0;
                                for(var i = 0;i<body.season.stats.length;i++)
                                {
                                    switch (body.season.stats.type)
                                    {
                                        case "1v1":vic1v1 = body.season.stats.wins;tot1v1 = body.season.stats.games;break;
                                        case "2v2":vic2v2 = body.season.stats.wins;tot2v2 = body.season.stats.games;break;
                                        case "3v3":vic3v3 = body.season.stats.wins;tot3v3 = body.season.stats.games;break;
                                        case "4v4":vic4v4 = body.season.stats.wins;tot4v4 = body.season.stats.games;break;
                                    }
                                }
                                var totGames = tot1v1+tot2v2+tot3v3+tot4v4;
                                var message ="";
                                message += "Profil de **"+nom+"**("+clan+") Victoires cette saison : **"+totaleVictoiresSaison+"** [Terran:**"+terranWins+
                                    "**,Zerg:**"+zergWins+"**,Protoss:**"+
                                    protossWins+"**] Totale matches carrière : **"+totaleMatchesCarriere+"**\n";
                                message += "Meilleur rang solo : **"+ meilleurRangSolo+"** ,Meilleur rang en équipe : **"+meilleurRangTeam+"**.";
                                msg.channel.sendMessage(message);
                            }
                            else
                            {
                                console.log(error);
                                msg.channel.sendMessage("Erreur : "+res.statusCode);
                            }

                        });
                        break;
                    }
                    case "historique":{
                        break;
                    }
                    default:msg.channel.sendMessage("mauvaise syntaxe");
                }
            }
            break;
        }
        case "/p4" : {
            if(isValide(commande[1]))
            {

            }
            else
            {
                //EERREUR SYNTAXE
            }
            break;
        }
        case "/test":{
            channel = msg.channel;
            commande.splice(0,1);
            var text = commande.join(" ");
            transloadit.addFile("base", "./files/lol/fonds/fond.png");
            transloadit.addFile("dynamic", "./files/lol/icones/bronze/5.png");
            transloadit.addFile("3c3", "./files/lol/icones/or/2.png");
            transloadit.addFile("5c5", "./files/lol/icones/autres/maitre.png");
            var options = {
                params: {
                    steps: {
                        "dyn_step": {
                            "use": {
                                steps : [
                                    { name: ":original", fields: "base", as: "base" },
                                    { name: ":original", fields: "dynamic", as: "watermark "}
                                ]
                            },
                            "robot": "/image/resize",
                            "result": true,
                            "watermark_position": "bottom",
                            "watermark_size":"65%",
                            "watermark_position_y":-3

                        },
                        "3c3_step": {
                            "use": {
                                steps : [
                                    { name: "dyn_step", as: "base" },
                                    { name: ":original", fields: "3c3", as: "watermark "}
                                ]
                            },
                            "robot": "/image/resize",
                            "result": true,
                            "watermark_position": "bottom-left",
                            "watermark_size":"55%",
                            "watermark_position_x":19,
                            "watermark_position_y":17

                        },
                        "5c5_step": {
                            "use": {
                                steps : [
                                    { name: "3c3_step", as: "base" },
                                    { name: ":original", fields: "5c5", as: "watermark "}
                                ]
                            },
                            "robot": "/image/resize",
                            "result": true,
                            "watermark_position": "bottom-right",
                            "watermark_size":"55%",
                            "watermark_position_x":14,
                            "watermark_position_y":19

                        },
                        "text_step": {
                            "use": {
                                steps : [
                                    { name: "5c5_step", as: "base" }
                                ]
                            },
                            "robot": "/image/resize",
                            "result": true,
                            "text": [
                                {
                                    "text": "Or I",
                                    "size": 16,
                                    "font": "Calibri",
                                    "color": "#000000",
                                    "align": "center",
                                    "x_offset": 0,
                                    "y_offset": 20
                                }
                            ]

                        }
                    },
                    notify_url: "176.149.126.232:3000",
                    result:true
                }
            };
            var id;
            transloadit.createAssembly(options, function(err, result) {
                if (err) {
                    throw new Error(err);
                }
                id = result.assembly_id;
                console.log(result);

            });
        }
    }


});


/*********************************************************************************************************
 *										FONCTIONS DE FACTORISATION										 *
 *																										 *
 *********************************************************************************************************/

function avoirDateHeure(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mn = today.getMinutes();
    var sc = today.getSeconds();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn + ':' + sc;
    return today
}

function error(e) {
    console.log(e.stack);
    process.exit(0);
}

var getAudio = function (url) {
    var requestUrl = url;
    try {
        return YoutubeStream(requestUrl);
    } catch (exception) {
        console.log(exception);
    }
};

function unescapeHtml(text) {
    return text.replace(/&#xFA;/g, "ú").replace(/&#xF6;/g, "ö");
}

var decodeHtmlEntity = function(str) {
    return str.replace(/&#(\s+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
};

/*********************************************************************************************************
 *											INTERACTIONS RARES											 *
 *																										 *
 *********************************************************************************************************/

//Acceuillir et virer les nouveaux/anciens membres
bot.on("serverNewMember", (server, user) => {
    server.defaultChannel.sendMessage(`Bienvenue sur le serveur, ${user.username} !`);
});

bot.on("serverMemberRemoved", (server, user) => {
    server.defaultChannel.sendMessage(`${user.username} a été viré du serveur !`);
});

var connexion = function(error, token) {
    if (error) {
        console.log('There was an error logging in: ' + error);
        return;
    } else
        console.log('Logged in. Token: ' + token);
};

//Clef API du bot
//bot.loginWithToken("MjE5ODEwNTk1MTE1ODkyNzM4.CqXRzQ.OsfNHzr5XLWalIUcKhUZpr4KjpA");
bot.login("MjIxMDQ4ODk2NDA5OTYwNDQ5.Crsr2w.tg9yH_uQtYryu7X54_h6Qz6AhW4").then(token => {
    console.log("Connecté avec le token : " + token);
}).catch(function(){console.log("erreur");});

