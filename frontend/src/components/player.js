import playerImage from '../assets/corn.png';

export class Player {
    constructor(game) {
        this.game = game;

        //size of ship
        this.width = 100;
        this.height = 75;

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
        if (this.image.complete) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }


}