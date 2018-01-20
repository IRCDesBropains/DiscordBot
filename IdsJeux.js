/**
 * Created by Joss on 25/05/2017.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('id_jeu', {
        id_personne: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true
        },
        id_lol: {
            type: DataTypes.STRING
        }
    },{
        tableName: 'ids_jeux',
        timestamps: false,
        underscored: true
    })
};