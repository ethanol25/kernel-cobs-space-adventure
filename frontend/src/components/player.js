import playerImage from '../assets/corn.png';

export class Player {
    constructor(game) {
        this.game = game;

        //size of ship
        this.width = 75;
        this.height = 35;

        //offput from left
        this.x = this.game.sideMargin;
        this.y = this.game.height - this.height;

        //ship image
        this.image = new Image();
        this.image.src = playerImage;


        //this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 5;
    }

    //deltatime is here if we want to implement spritesheet/smoother animation later
    update(input, deltaTime) {
        /*horizontal ?
        if (input.includes('ArrowRight')) this.speedX = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
        else this.speedX = 0;*/

        this.checkCollision();

        if (input.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (input.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0;

        this.y += this.speedY;

        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

        //this.x += this.speedX;


    }
    draw(context) {
        //context.fillStyle = 'red';
        //context.fillRect(this.x, this.y, this.width, this.height);

        //maybe sprite sheet later?
        context.strokeStyle = 'green';
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);


        if (this.image.complete) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    checkCollision() {
        this.game.asteroids.forEach(asteroid => {
            if (asteroid.x < this.x + this.width &&
                asteroid.x + asteroid.width > this.x &&
                asteroid.y < this.y + this.height &&
                asteroid.y + asteroid.height > this.y
            ){
                //collision
                asteroid.markedForDeletion = true;
                //kernel loss

            } else {
                //no collision

            }
        })
    }


}