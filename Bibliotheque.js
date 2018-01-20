module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Bibliotheque', {
		idJeu: {
		    type: DataTypes.INTEGER, //foreign key en table mysql
			primaryKey: true,
		},
		idPersonne: {
			type: DataTypes.INTEGER, //foreign key en table mysql
		    primaryKey: true,
		}
	},{
	  	freezeTableName: true, // Model tableName will be the same as the model name
	  	timestamps: false
	})
}

/*
create table Bibliotheque (idJeu INT, idPersonne INT, CONSTRAINT fk_jeuB FOREIGN KEY (idJeu) REFERENCES Jeux(id), CONSTRAINT fk_personneB FOREIGN KEY (idPersonne) REFERENCES Personnes(id));
*/