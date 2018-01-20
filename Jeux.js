module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Jeux', {
		id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    unique: true
		},
		nom: {
			type: DataTypes.TEXT
		}
	},{
	  	freezeTableName: true, // Model tableName will be the same as the model name
	  	timestamps: false
	})
}

/*
CREATE TABLE Jeux (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, nom VARCHAR(50));

*/