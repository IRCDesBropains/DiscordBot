module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Playlist', {
		id: {
		    type: DataTypes.INTEGER,
			primaryKey: true,
		},
		nom: {
			type: DataTypes.TEXT,
		},
		idPersonne: {
		    type: DataTypes.INTEGER, //foreign key en table mysql
		},
		date: {
			type: DataTypes.DATE,
		}
	},{
	  	freezeTableName: true, // Model tableName will be the same as the model name
	  	timestamps: false
	})
}

/*CREATE TABLE Playlist(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	nom VARCHAR(20) NOT NULL, 
	idPersonne INT NOT NULL, 
	date DATETIME, 
	CONSTRAINT fk_idPersonnePlaylist FOREIGN KEY (idPersonne) REFERENCES Personnes(id));
*/
