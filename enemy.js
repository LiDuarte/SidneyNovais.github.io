function Enemy(X,Y,SPRITE) {
	this.x = X;
	this.y = Y;
	this.status = 1; // 0 DEAD 1 LIVE
	this.plane = new Airplane(this.x,this.y,50,50,3,SPRITE,150);

	this.left = function() {
		var plane = this.plane;
			this.x += -plane.speed;
			plane.x = this.x;
	}

	this.right = function() {
		var plane = this.plane;
			this.x += plane.speed;
			plane.x = this.x
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