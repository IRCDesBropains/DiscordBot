#Personnes.js
CREATE TABLE Personnes (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, prenom VARCHAR(50), pseudo VARCHAR(50), telephone VARCHAR(10),id_lol VARCHAR(25));

#Jeux.js
CREATE TABLE Jeux (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, nom VARCHAR(50));

#Playlist.js
CREATE TABLE Playlist(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nom VARCHAR(20) NOT NULL,
	idPersonne INT NOT NULL,
	date DATETIME,
	CONSTRAINT fk_idPersonnePlaylist FOREIGN KEY (idPersonne) REFERENCES Personnes(id));

#Bibliotheque.js
create table Bibliotheque (idJeu INT, idPersonne INT, CONSTRAINT fk_jeuB FOREIGN KEY (idJeu) REFERENCES Jeux(id),
CONSTRAINT fk_personneB FOREIGN KEY (idPersonne) REFERENCES Personnes(id));

#Messages.js
CREATE TABLE Messages(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, idPersonne INT, contenu VARCHAR(200),
commande TINYINT NOT NULL, date DATETIME, CONSTRAINT fk_personneM FOREIGN KEY (idPersonne) REFERENCES Personnes(id));

#Musiques.js
CREATE TABLE Musiques (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	url VARCHAR(100) NOT NULL,
	idPlaylist INT NOT NULL,
	CONSTRAINT fk_idPlaylist FOREIGN KEY (idPlaylist) REFERENCES Playlist(id));

#Rappels.js
CREATE TABLE Rappels (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, description VARCHAR(200), date DATETIME, cible INT,
fait TINYINT NOT NULL DEFAULT 1, CONSTRAINT fk_cible FOREIGN KEY (cible) REFERENCES Personnes(id));

#SessionJeux.js
create table SessionJeux (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, idJeux INT, idPersonne INT, date DATETIME, tempsJeux INT, enTrainDeJouer TINYINT(1) DEFAULT 1, CONSTRAINT fk_jeuxS FOREIGN KEY (idJeux) REFERENCES Jeux(id), CONSTRAINT fk_personneS FOREIGN KEY (idPersonne) REFERENCES Personnes(id));

INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Mickael', 'milow', '0683113041');
INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Rémi', 'Shadowera', '0685775447');
INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Jocelyn', 'Josstoh', '0677279174');
INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Corentin', 'drallco', '0624000775');
INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Erwan', 'Scrat', '0676167060');
INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Charles', 'Nilou', '0650012970');
INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Vincent', 'Zouk', '0684931745');
INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Maximilien', 'Maxou', '0684931745');
INSERT INTO Personnes (prenom, pseudo, telephone) VALUES ('Clément', 'Straw', 'NONE');

ALTER TABLE Personnes add score INT DEFAULT 0;
UPDATE Personnes SET score = 254 where pseudo = "Nilou";
UPDATE Personnes SET score = 471 where pseudo = "drallco";
UPDATE Personnes SET score = 459 where pseudo = "Josstoh";
UPDATE Personnes SET score = 10 where pseudo = "Maxou";
UPDATE Personnes SET score = 191 where pseudo = "milow";
UPDATE Personnes SET score = 374 where pseudo = "Shadowera";
UPDATE Personnes SET score = 125 where pseudo = "Zouk";
UPDATE Personnes SET score = 40 where pseudo = "Scrat";
CREATE TABLE Questions (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    postePar INT,
    titre VARCHAR(20),
    texte BLOB(500),
    reponse VARCHAR(100),
    valeur INT,
    gagnant INT,
    date DATETIME,
    active TINYINT NOT NULL DEFAULT 1,
    CONSTRAINT fk_personneQ1 FOREIGN KEY (postePar) REFERENCES Personnes(id),
    CONSTRAINT fk_personneQ2 FOREIGN KEY (gagnant) REFERENCES Personnes(id)
);


ALTER TABLE `personnes` ADD `id_lol` VARCHAR(25) NOT NULL AFTER `score`;