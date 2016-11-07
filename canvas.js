function Canvas(WIDTH,HEIGHT) {
	this.width = WIDTH;
	this.height = HEIGHT;

	this.create = function() {
		var canvas = document.createElement("canvas");
			canvas.width = this.width;
			canvas.height = this.height;
			document.body.appendChild(canvas);
			
		var ctx = canvas.getContext("2d");
			return ctx;
	}
}