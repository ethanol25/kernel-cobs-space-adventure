class Particle {
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speed + this.game.velocityX;
        this.y -= this.speed + this.game.velocityY;
        this.size *= 0.95;
        if (this.size < 0.5) this.markedForDeletion = true;
    }
}

export class Fire extends Particle {
    constructor(game, x, y, angle){
        super(game);
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 5;
        this.size = 5;
    }
    draw(context){
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}