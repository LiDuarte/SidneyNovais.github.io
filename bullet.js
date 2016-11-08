function Bullet(X,Y,WIDTH,HEIGHT) {
	this.x = X;
	this.y = Y;
	this.width = WIDTH;
	this.height = HEIGHT;
	this.speed = 15;
   	//METHODS

	this.left = function() {
		this.x += -this.speed;
	}
	this.right = function() {
		this.x += this.speed;
	}

	this.drawBullet = function(ctx) {
		ctx.fillStyle = "#000";
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
		

	this.updateBullet = function(directionX) {
		if(directionX == "left")
			this.left();
		if(directionX == "right")
			this.right();
	}
}
