module.exports = function(sequelize, DataTypes) {
	return sequelize.define('personne', {
		id: {
		    type: DataTypes.INTEGER, 
		    primaryKey: true,
		    unique: true,
			autoIncrement: true
		},
		prenom: {
			type: DataTypes.STRING
		},
		pseudo: {
			type: DataTypes.STRING
		},
		telephone: {
			type: DataTypes.STRING
		}
	},{
	  	tableName: 'personnes',
	  	timestamps: false,
        underscored: true
	})
};

/*

CREATE TABLE Personnes (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, prenom VARCHAR(50), pseudo VARCHAR(50), telephone VARCHAR(10));
*/