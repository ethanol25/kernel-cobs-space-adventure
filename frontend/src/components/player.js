import playerImage from '../assets/corn.png';

export class Player {
    constructor(game) {
        this.game = game;

        //size of ship
        this.width = 75;
        this.height = 35;

        this.angle = 0;

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
        
        //Angle Change
        if (input.includes('ArrowRight')) this.angle -=2;
        else if (input.includes('ArrowLeft')) this.angle += 2;

        if(this.angle < 0) {
            this.angle = this.angle +360;
        } else if (this.angle > 360) {
            this.angle -= 360;
        }

        console.log(this.angle)


        this.checkCollision();

        /*if (input.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (input.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0;*/

        //this.y += this.speedY;

        //space bar listen

        if (input.includes(' ')) {
            this.game.velocityX += Math.cos(this.angle) * .2;
            this.game.velocityY += Math.sin(this.angle) * .2;
        } 

        console.log(this.game.velocityX);
        console.log(this.game.velocityY)
        
        if (this.y < 0) {
            this.game.velocityY = 0;
            this.y = 0;}

        if (this.y > this.game.height - this.height){
            this.game.velocityY = 0;
            this.y = this.game.height - this.height;
        }

        if (this.x < 0) {
            this.game.velocityX = 0;
            this.x = 0;
        } 
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //this.x += this.speedX;


    }
    draw(context) {
        //context.fillStyle = 'red';
        //context.fillRect(this.x, this.y, this.width, this.height);

        //maybe sprite sheet later?

        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.angle*Math.PI/180);
        context.translate(-this.x - this.width / 2, -this.y - this.height / 2);


        context.strokeStyle = 'green';
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);


        if (this.image.complete) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
       }
        context.restore();
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