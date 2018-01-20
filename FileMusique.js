var FileMusique = function() {
		this.liste = [];
		this.mutex = true;
		this.passer = false;
		this.vote = 0;
};

FileMusique.prototype.prochaineMusique = function () {
	this.mutex = false;
	this.passer = false;
	this.vote = 0;
	var url = this.liste[0];
	this.liste.shift();
	return url;
};

FileMusique.prototype.ajouterMusique = function (url) {
	this.liste.push(url);
};

FileMusique.prototype.vide = function () {
	if(this.liste.length > 0){
		return false;
	}
	return true;
};

FileMusique.prototype.taille = function () {
	return this.liste.length;
};

FileMusique.prototype.ouvrirMutex = function () {
	this.mutex = true;
};

FileMusique.prototype.passerMusique = function () {
	this.vote += 1;
	if(this.vote > 1){
		this.mutex = true;
		this.passer = true;
		return this.mutex;
	}
	return false;
};

FileMusique.prototype.getPasserMusique = function () {
	return this.passer;
};

FileMusique.prototype.lancerProchaineMusique = function () {
	return this.mutex;
};

module.exports = FileMusique;
