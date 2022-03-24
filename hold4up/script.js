const canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
	images = document.querySelector('div'),
	bird = images.appendChild(document.createElement('img')),
	bg = images.appendChild(document.createElement('img')),
	pipeBottom = images.appendChild(document.createElement('img')),
	pipeTop = images.appendChild(document.createElement('img')),
	rsup = images.appendChild(document.createElement('img'));

rsup.src = 'https://raw.githubusercontent.com/Genius6942/Pygame-Flappy-Bird/main/bird1.png'
bird.src = 'bird.png';
bg.src = 'https://raw.githubusercontent.com/Genius6942/Pygame-Flappy-Bird/main/flap_back.png';
pipeBottom.src = 'https://github.com/Genius6942/Pygame-Flappy-Bird/blob/main/pipe_bottom.png?raw=true';
pipeTop.src = 'https://raw.githubusercontent.com/Genius6942/Pygame-Flappy-Bird/main/pipe_top.png';

canvas.width = 700;
canvas.height = 600;
ctx.font = "30px arial";

class Player {
	constructor() {
		this.image = bird;
		this.x = 100;
		this.y = 300;
		this.gravity = -.8;
		this.fallSpeed = 0;
		this.addFallSpeed = 1.6;
		this.maxFallSpeed = 8;
		this.birds = [ bird, rsup ];
		this.birdIndex = 0;
		this.score = 0;
		this.goingUp = false;
	}

	update() {
		this.fallSpeed += this.gravity;
		if(this.goingUp) {
			this.fallSpeed += this.addFallSpeed;
		}
		if(this.fallSpeed > this.maxFallSpeed && this.maxFallSpeed > 0) this.fallSpeed = this.maxFallSpeed;
		if(this.fallSpeed < this.maxFallSpeed && this.maxFallSpeed < 0) this.fallSpeed = this.maxFallSpeed;
		this.y += this.fallSpeed;
		if(this.y > 600-48){
			this.y = 600-48;
			this.fallspeed = 0;
		};
		if(this.y < 0) this.y = 0;
	}
	
	render() {
		ctx.drawImage(this.birds[this.birdIndex % 2], this.x, this.y);
		ctx.fillText(this.score, 30, 30)
	}
}

class Pipe {
	constructor() {
		this.x = 700;
		this.y = possiblePipeYs[player.birdIndex % 2];
		this.gap = 200;
		this.speed = 15;
	}

	detectCollision() {
		if(this.x==player.x) {
			player.addFallSpeed = 0 - player.addFallSpeed;
			player.gravity = 0 - player.gravity;
			player.maxFallSpeed = 0 - player.maxFallSpeed;
			player.birdIndex++;
			player.score++;
		}
		
		if(this.x < player.x + 48 && this.x + 87 > player.x) {
			if(this.y + 381 > player.y) {
				this.handleDie();
			} else if(this.y + 381 + this.gap < player.y + 48) this.handleDie();
		}
	}

	handleDie() {
		alert('you died');
		pipe = new Pipe();
		player = new Player();
	}

	update() {
		this.x -= this.speed;
		return this.x;
	}

	render() {
		ctx.drawImage(pipeTop, this.x, this.y);
		ctx.drawImage(pipeBottom, this.x, this.y + 381 + this.gap);
	}
}

const possiblePipeYs = [260-381, 100-381];
let player = new Player();
let pipe = new Pipe();

function frame() {
	f = window.requestAnimationFrame(frame);
	ctx.drawImage(bg, 0,canvas.height-bg.height);
	player.update();
	player.render();
	if(pipe.update() <= -87) pipe = new Pipe();
	pipe.detectCollision();
	pipe.render();
}

onkeydown = onkeyup = e => {
	player.goingUp = (e.type == "keydown");
}
let f = requestAnimationFrame(frame);