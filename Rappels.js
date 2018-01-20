module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Rappels', {
		id: {
		    type: DataTypes.INTEGER, 
		    primaryKey: true,
		    unique: true
		},
		description: {
			type: DataTypes.TEXT
		},
		date: {
			type: DataTypes.DATE
		},
		cible: {
			type: DataTypes.INTEGER //foreign key en table mysql (pour id de Personnes)
		},
		actif: {
			type: DataTypes.INTEGER
		},
	},{
	  	freezeTableName: true, // Model tableName will be the same as the model name
	  	timestamps: false
	})
}

/*
 CREATE TABLE Rappels (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, description VARCHAR(200), date DATETIME, cible INT, fait TINYINT NOT NULL DEFAULT 1, CONSTRAINT fk_cible FOREIGN KEY (cible) REFERENCES Personnes(id));

 */