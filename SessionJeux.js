module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SessionJeux', {
		id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    unique: true
		},
		idJeux: {
			type: DataTypes.INTEGER //foreign key en table mysql
		},
		idPersonne: {
			type: DataTypes.INTEGER //foreign key en table mysql
		},
		date: {
			type: DataTypes.DATE
		},
		tempsJeux: {
			type: DataTypes.INTEGER
		},
		enTrainDeJouer: {
			type: DataTypes.INTEGER
		}
	},{
	  	freezeTableName: true, // Model tableName will be the same as the model name
	  	timestamps: false
	})
}

/*

create table SessionJeux (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, idJeux INT, idPersonne INT, date DATETIME, tempsJeux INT, enTrainDeJouer TINYINT(1) DEFAULT 1, CONSTRAINT fk_jeuxS FOREIGN KEY (idJeux) REFERENCES Jeux(id), CONSTRAINT fk_personneS FOREIGN KEY (idPersonne) REFERENCES Personnes(id));
*/