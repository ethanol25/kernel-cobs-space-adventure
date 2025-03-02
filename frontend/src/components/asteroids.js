import asteroidImage from '../assets/asteroid.png'

export class Asteroid {
    constructor(game) {
        this.game = game;
        this.width = 50 + Math.random() * 50; //random width
        this.height = 50 + Math.random() * 50; //random height

        this.x = this.game.width + Math.random() * this.game.width;//start off screen at random offset

        this.y = Math.random() * (this.game.height - this.height); // vertical position

        this.speed = 1 + Math.random() * 2; //asteroid random speed
        this.image = new Image();
        this.image.src = asteroidImage; 
        this.markedForDeletion = false;
    }
    update() {
        this.x -= this.speed + this.game.velocityX; // move left

        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context) {
        context.strokeStyle = 'blue';
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}