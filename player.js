function Player(X,Y,SPRITE) {
	this.x = X;
	this.y = Y;
	this.status = 1; // 0 DEAD 1 LIVE
	this.score = 0;
	this.plane = new Airplane(this.x,this.y,50,50,3,SPRITE,30);

	//ESPECIAL METHODS
	this.getX = function() {
		return this.x;
	}

	this.getY = function() {
		return this.y;
	}

	this.getStatus = function() {
		return this.status;
	}

	this.getScore = function() {
		return this.score;
	}

	this.setX = function(pX) {
		this.x = (this.getX() + pX);
	}

	this.setY = function(pY) {
		this.y = (this.getY() + pY);
	}

	this.setStatus = function(pStatus) {
		this.status = (this.getStatus() + pStatus);
	}

	this.setScore = function(pScore) {
		this.score = (this.getScore() + pScore);
	}

	//METHODS

	this.scoreUp = function(pPoints) {
		this.setScore(pPoints);
	}

	this.left = function(){
		var plane = this.plane;
			this.x += -plane.speed;
			plane.x = this.x;
	}

	this.right = function() {
		var plane = this.plane;
			this.x += plane.speed;
			plane.x = this.x;
	}

	this.up = function() {
		var plane = this.plane;
			this.y += -plane.speed;
			plane.y = this.y;
	}

	this.down = function() {
		var plane = this.plane;
			this.y += plane.speed;
			plane.y = this.y;
	}
}