(function() {
		var left = up = right = down = space = pause = false;
		var spritePlayer = new Image();
			spritePlayer.src = "player.png";
		var spriteEnemy = new Image();
			spriteEnemy.src = "enemy.png";
		var canvas = new Canvas(window.innerWidth,300);
		var ctx = canvas.create();

		var stage = new Stage(canvas.width,canvas.height);

		var player = [new Player(10,10,spritePlayer)];
		var playerBullets = [];
		var enemyBullets = [];
		var enemys = [];
		var enemy = [new Enemy(1200,10,spriteEnemy)];
		var timeCreate = 0;

		var levelGame = {
			nextLevelPoints: 40,
			pointsForLevel: 5,
			respawEnemys: 120,
			timeShotEnemys: 150,
			speedEnemys: 3
		}

			var statusPlayer = player[0].status;
			var playerPlane = player[0].plane;
			// EVENTS LEFT, UP, RIGHT , DOWN
			window.addEventListener("keydown",function(e){
				var key = e.keyCode;
					switch(key){
						case 32: space= true;break;
						case 37: left = true;break;
						case 38: up   = true;break;
						case 39: right= true;break;
						case 40: down = true;break;
						case 80: if(pause == false){
								 pause = true;
								 } else{
								 pause = false;
								 }
					}

			},false);

			window.addEventListener("keyup",function(e){
				var key = e.keyCode;
					switch(key){
						case 32: space= false;break;
						case 37: left = false;break;
						case 38: up   = false;break;
						case 39: right= false;break;
						case 40: down = false;break;
					}
			},false);
		function createEnemys(arrayEnemys){
			
			arrayEnemys.push(new Enemy(stage.x + stage.width,Math.floor(Math.random() * 260),spriteEnemy));
			
		}

		function insertBullets(arrayBullets,x,y) {
				arrayBullets.push(new Bullet(x,y,7,3));
		}

		function clearBullets(arrayBullets,index) {
				arrayBullets.splice(index,1);
		}

		function updateBullets(arrayBullets,direction){
				for(i = 0, tam = arrayBullets.length;i < tam;i++){
					arrayBullets[i].updateBullet(direction);
				}
		}

		function drawBullets(arrayBullets,ctx){
				for(i = 0, tam = arrayBullets.length;i < tam;i++){
					arrayBullets[i].drawBullet(ctx);
				}
		}

		function clearPlanes(arrayPlanes,index){
			arrayPlanes.splice(index,1);
		}

		function drawBackground() {
			ctx.fillStyle = "#000";
			ctx.fillRect(stage.x,stage.y,stage.width,stage.height);
		}

		function drawPlanes() {
			// Player
			if(player.length > 0){
				var plane = player[0].plane;
				plane.drawPlane(ctx);
			}
			// Enemy
			
			if(enemys.length > 0){
				for(i = 0, tam = enemys.length;i < tam;i++){
					var e = enemys[i].plane;
					e.drawPlane(ctx);
				}
			}
			

		}

		function updateClearBulletsWall(arrayBullets,direction) {
			//Player
			if(direction == "right"){
				for(i = 0, tam =  arrayBullets.length;i < tam; i++){
					if(arrayBullets[i].x + arrayBullets[i].width > stage.x + stage.width){
						clearBullets(arrayBullets,i);
						tam--;
						i--;
					}
				}
			}else if(direction == "left"){
				for(i = 0, tam =  arrayBullets.length;i < tam; i++){
					if(arrayBullets[i].x < stage.x){
						clearBullets(arrayBullets,i);
						tam--;
						i--;
					}
				}
			}	
		}

		function updateClearBulletsColisionEnemys(arrayBullets,arrayPlanes) {
			for(i = 0, tam = arrayBullets.length; i < tam; i++){
				var bullets = arrayBullets[i];
				for(j = 0, tamj = arrayPlanes.length; j < tamj;j++){
					var planes = arrayPlanes[j];
					if((bullets.x + bullets.width > planes.x &&bullets.x < planes.x + planes.plane.width) && (bullets.y + bullets.height > planes.y && bullets.y < planes.y + planes.plane.width)){
						clearBullets(arrayBullets,i);
						clearPlanes(arrayPlanes,j);
						i--;
						tam--;
						j--;
						tamj--;
						return true;
					}			
				}
			}
		}

		function updateEnemys() {
		
			if(enemys.length){
				for(i = 0, tam = enemys.length;i < tam; i++){
					var plane = enemys[i].plane;
						plane.time = levelGame.timeShotEnemys;
						plane.speed = levelGame.speedEnemys;
						enemys[i].left();
						if(enemys[i].plane.gunCentralShot())
							insertBullets(enemyBullets,enemys[i].plane.gunCentral[0] + enemys[i].x, enemys[i].plane.gunCentral[1] + enemys[i].y)
				}

				for(i = 0, tam = enemys.length;i < tam; i++){
					var plane = enemys[i].plane;
						if(plane.x + plane.width < stage.x){
							clearPlanes(enemys,i);
							tam--;
							i--;

					}
				}
			}
			

		}

		function updatePlayer() {
			
			//Events Move Player
			if(player.length){
				var plane = player[0].plane;

				if(left){
					player[0].left();
				}

				if(right){
					player[0].right();
				}

				if(up){
					player[0].up();
				}

				if(down){
					player[0].down();
				}

				if(space){
					if(plane.gunCentralShot()){
						insertBullets(playerBullets,plane.gunCentral[0] + plane.x,plane.gunCentral[1] + plane.y);
					}
				}

				if(plane.colision("left",stage) || (plane.colision("right",stage))){
					player[0].x = plane.x;
				}
				if(plane.colision("top",stage) || (plane.colision("bot",stage))){
					player[0].y = plane.y;
				}
			}
		}

		function drawAll() {
			drawBackground();
			drawPlanes();
			drawBullets(playerBullets,ctx);
			drawBullets(enemyBullets,ctx);
		}

		function updateAll() {
			updatePlayer();
			updateEnemys();	
			updateBullets(playerBullets,"right");
			updateBullets(enemyBullets,"left");
			updateClearBulletsWall(playerBullets,"right");
			updateClearBulletsWall(enemyBullets,"left");
			var pontos = updateClearBulletsColisionEnemys(playerBullets,enemys);
			if(pontos){
				var element = document.getElementById("pontos");
				player[0].scoreUp(levelGame.pointsForLevel);
				element.innerHTML = player[0].score;
			}

			if(player[0].score > levelGame.nextLevelPoints){
				levelGame.nextLevelPoints = levelGame.nextLevelPoints * 2;
				levelGame.pointsForLevel+= 5;
				levelGame.respawEnemys += -15;
				if(levelGame.speedEnemys != 5)
					levelGame.speedEnemys += 1;
				if(levelGame.timeShotEnemys >= 40) 
					levelGame.timeShotEnemys += -3;

			}
			console.log(levelGame.pointsForLevel);

			updateClearBulletsColisionEnemys(enemyBullets,player);
		}

		function loop() {
				window.requestAnimationFrame(loop);
				if(pause == true){
					return 0;
				} else {
					timeCreate++;
					if(timeCreate > levelGame.respawEnemys){
						createEnemys(enemys);
						timeCreate = 0;
					}
					drawAll();
					updateAll();
				}
		}
		loop();
				
})();