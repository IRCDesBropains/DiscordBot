module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Messages', {
		id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    unique: true
		},
		idPersonne: {
			type: DataTypes.INTEGER //foreign key en table mysql
		},
		contenu: {
			type: DataTypes.TEXT
		},
		commande: {
			type: DataTypes.INTEGER
		},
		date: {
			type: DataTypes.DATE
		}
	},{
	  	freezeTableName: true, // Model tableName will be the same as the model name
	  	timestamps: false
	})
}

/*
CREATE TABLE Messages(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, idPersonne INT, contenu VARCHAR(200), commande TINYINT NOT NULL, date DATETIME, CONSTRAINT fk_personneM FOREIGN KEY (idPersonne) REFERENCES Personnes(id));

*/