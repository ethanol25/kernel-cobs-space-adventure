import asteroidImage from '../assets/asteroid.png'

export class Asteroid {
    constructor(game) {
        this.game = game;
        this.width = 50 + Math.random() * 50; //random width
        this.height = 50 + Math.random() * 50; //random height

        this.x = this.game.width + Math.random() * this.game.width;//start off screen
        
        this.y = Math.random() * (this.game.height - this.height); // vertical position

        this.speed = 1 + Math.random() * 2; //asteroid random speed
        this.image = new Image();
        this.image.src = asteroidImage; 
    }
    update() {
        this.x -= this.speed + this.game.speed; // move left
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}