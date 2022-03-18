const canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
	images = document.querySelector('div');
	bird = images.appendChild(document.createElement('img')),
	bg = images.appendChild(document.createElement('img')),
	pipeBottom = images.appendChild(document.createElement('img')),
	pipeTop = images.appendChild(document.createElement('img'));
bird.src = 'bird.png';
bg.src = 'https://raw.githubusercontent.com/Genius6942/Pygame-Flappy-Bird/main/flap_back.png';
pipeBottom.src = 'https://github.com/Genius6942/Pygame-Flappy-Bird/blob/main/pipe_bottom.png?raw=true';
pipeTop.src = 'https://raw.githubusercontent.com/Genius6942/Pygame-Flappy-Bird/main/pipe_top.png';

canvas.width = 500;
canvas.height = 500;

class Player {
	constructor() {
		this.image = bird;
		this.x = 100;
		this.y = 230;
		this.gravity = 1.2;
		this.fallSpeed = 0;
	}

	update() {
		this.fallSpeed -= this.gravity;
		this.y += this.fallSpeed;
		if(this.y > 500-48){
			this.y = 500-48;
			this.fallSpeed = -this.fallSpeed;
		};
		if(this.y < 0) this.y = 0;
	}
	
	render() {
		ctx.drawImage(bird, this.x, this.y);
	}

	jump() {
		this.fallSpeed = 20;
	}
}

class Pipe {
	constructor() {
		
	}
}

const player = new Player();
let spaceDown = false;

function frame() {
	window.requestAnimationFrame(frame);
	ctx.drawImage(bg, 0,canvas.height-bg.height);
	player.update();
	player.render();
}

window.addEventListener('mousedown', player.jump.bind(player))
onkeydown = e => {
	if((e.key == " ") && !e.repeat) {
		player.jump();
	}
frame();