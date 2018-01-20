module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Joueurs', {
		num: {
		    type: DataTypes.INTEGER, 
		    primaryKey: true,
		    unique: true
		},
		pseudo: {
			type: DataTypes.TEXT
		},
		score: {
			type: DataTypes.INTEGER
		},
		role: {
			type: DataTypes.TEXT
		},
		nbBonneRep: {
			type: DataTypes.INTEGER
		},
		nbReponseTotale: {
			type: DataTypes.INTEGER
		}
	},{
	  	freezeTableName: true, // Model tableName will be the same as the model name
	  	timestamps: false
	})
}