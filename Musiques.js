module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Musiques', {
		id: {
		    type: DataTypes.INTEGER,
			primaryKey: true,
		},
		url: {
			type: DataTypes.TEXT,
		},
		idPlaylist: {
		    type: DataTypes.INTEGER, //foreign key en table mysql
		}
	},{
	  	freezeTableName: true, // Model tableName will be the same as the model name
	  	timestamps: false
	})
}

/*CREATE TABLE Musiques (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	url VARCHAR(100) NOT NULL, 
	idPlaylist INT NOT NULL, 
	CONSTRAINT fk_idPlaylist FOREIGN KEY (idPlaylist) REFERENCES Playlist(id));
*/

