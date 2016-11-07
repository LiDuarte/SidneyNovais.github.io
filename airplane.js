function Airplane(X,Y,WIDTH,HEIGHT,SPEED,SPRITE,TIME) {
	this.sprite = SPRITE;
	this.x = X;
	this.y = Y;
	this.width = WIDTH;
	this.height = HEIGHT;
	this.speed = SPEED;
	this.time = TIME;
	//ARRAY FOR GUNS [X,Y]
	this.gunCentral = [40,22]; 
	this.gunLeft = [16,10];
	this.gunRight = [16,40];
	this.timeShotCentral = 0;
	this.timeShotLeft = 0;
	this.timeShotRight = 0;


	//ESPECIAL METHODS
	this.getX = function() {
		return this.x;
	}

	this.getY = function() {
		return this.y;
	}

	this.getSprite = function() {
		return this.sprite;
	}

	this.getWidth = function() {
		return this.width;
	}

	this.getHeight = function() {
		return this.height;
	}

	this.getSpeed = function() {
		return this.speed;
	}

	this.setX = function(pX){
		this.x = (this.getX() + pX);
	}

	this.setY = function(pY){
		this.y = (this.getX() + pY);
	}

	this.setSprite = function(pSprite){
		this.sprite.push(pSprite);
	}

	this.setWidth = function(pWidth) {
		this.width = (this.getWidth() + pWidth);
	}

	this.setHeight = function(pHeight) {
		this.height = (this.getHeight() + pHeight); 
	}

	this.setSpeed = function(pSpeed) {
		this.speed = (this.getSpeed() + pSpeed);
	}

	//METHODS

	this.colision = function(colision,stage) {
		if(colision == "left" && this.x < stage.x){
			this.x = stage.x;
			return true;
		}
		if(colision == "right" && this.x + this.width > stage.x + stage.width){
			this.x = stage.width - this.width;
			return true;
		}

		if(colision == "top" && this.y < stage.y){
			this.y = stage.y;
			return true;
		}
		if(colision == "bot" && this.y + this.height > stage.y + stage.height){
			this.y = stage.height - this.height;
			return true;
		}
	}

	this.colisionPlanes = function(plane) {
		if((this.x + this.width >= plane.x && this.x <= plane.x + plane.width) && (this.y + this.height >= plane.y && this.y <= plane.y + plane.height))
		{
			return true;
		}
	}

	this.drawPlane = function(ctx) {
		ctx.drawImage(this.sprite,0,0,this.width,this.height,this.x,this.y,this.width,this.height);
	}

	this.gunCentralShot = function() {
			if(this.timeShotCentral == 0){
				this.timeShotCentral++;
				return true;
			} else {
				this.timeShotCentral++;
				if(this.timeShotCentral > this.time)
					this.timeShotCentral = 0;
				
				return false;
			}
				
	}

	this.gunLeftShot = function() {
			if(this.timeShotLeft == 0){
				this.timeShotLeft++;
				return true;
			} else {
				this.timeShotLeft++;
				return false;
				if(this.timeShotLeft > this.time)
					this.timeShotLeft = 0;
			}
	}

	this.gunRightShot = function() {
			if(this.timeShotRight == 0){
				this.timeShotRight++;
			} else {
				this.timeShotRight++;
				if(this.timeShotRight > this.time)
					this.timeShotRight = 0;
			}
	}
			
			
	
}