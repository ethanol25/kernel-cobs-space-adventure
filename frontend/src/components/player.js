import playerImage from '../assets/corn.png';

export class Player {
    constructor(game) {
        this.game = game;

        //size of ship
        this.width = 65;
        this.height = 25;

        this.angle = 0;

        //offput from left
        this.x = this.game.sideMargin;
        this.y = this.game.height - this.height;

        //ship image
        this.image = new Image();
        this.image.src = playerImage;


        this.particles = [];
        //this.speedX = 0;
        //this.speedY = 0;
        //this.maxSpeed = 5;
    }

    //deltatime is here if we want to implement spritesheet/smoother animation later
    update(input, deltaTime) {
        
        //Angle Change
        if (input.includes('ArrowRight')) this.angle +=2;
        else if (input.includes('ArrowLeft')) this.angle -= 2;

        if(this.angle < 0) {
            this.angle = this.angle + 360;
        } else if (this.angle >= 360) {
            this.angle -= 360;
        }


        this.checkCollision();

       /* if (input.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (input.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0;

        this.y += this.speedY;*/

        //space bar listen

        if (input.includes(' ')) {
            this.game.velocityX += Math.cos(this.angle * Math.PI / 180) * 0.05;
            this.game.velocityY += Math.sin(this.angle * Math.PI / 180) * 0.05;

            // Generate fire particles behind the ship
            for (let i = 0; i < 2; i++) {
                this.particles.push(new Particle(this.x + this.width / 2, this.y + this.height / 2, this.angle, this.width, this.height));
            }
        } 

        this.x += this.game.velocityX;
        this.y += this.game.velocityY;

        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.life <= 0) this.particles.splice(index, 1); // Remove dead particles
        });

        //bottom bound
        if (this.y < 0) {
            this.game.velocityY = 0;
            this.y = 0;}


        //top bound
        if (this.y > this.game.height - this.height){
            this.game.velocityY = 0;
            this.y = this.game.height - this.height;
        }

        //left bound
        if (this.x < 0) {
            this.game.velocityX = 0;
            this.x = 0;
        } 

        //right bound
        if (this.x > (this.game.width / 1.9)- this.width) this.x = (this.game.width/1.9) - this.width;

        }
    draw(context) {
        //context.fillStyle = 'red';
        //context.fillRect(this.x, this.y, this.width, this.height);

        //maybe sprite sheet later?

        this.particles.forEach(particle => particle.draw(context));

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
            const collisionPadding = 7; // makes collision area smaller, could probably fine tune this
            if (asteroid.x + collisionPadding < this.x + this.width - collisionPadding &&
            asteroid.x + asteroid.width - collisionPadding > this.x + collisionPadding &&
            asteroid.y + collisionPadding < this.y + this.height - collisionPadding &&
            asteroid.y + asteroid.height - collisionPadding > this.y + collisionPadding
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

class Particle {
    constructor(x, y, angle, shipWidth, shipHeight) {
        // Calculate the particle's initial position based on the ship's angle
        const offsetX = Math.cos(angle * Math.PI / 180) * (shipWidth / 2);
        const offsetY = Math.sin(angle * Math.PI / 180) * (shipHeight / 2);

        this.x = x - offsetX; // Position behind the ship
        this.y = y - offsetY; // Position behind the ship
        this.size = Math.random() * 5 + 2; // Random size
        this.speed = Math.random() * 2 + 1; // Random speed
        this.angle = angle +(Math.random() * 60 - 30); // Random angle
        this.life = 100; // Particle lifespan
        this.opacity = .5; // Initial opacity

        this.color = Math.random() < 0.5 ? 'orange' : 'red';
    }

    update() {
        this.x -= Math.cos(this.angle * Math.PI / 180) * this.speed;
        this.y -= Math.sin(this.angle * Math.PI / 180) * this.speed;
        this.life -= 2; // Decrease lifespan
        this.opacity = this.life / 100; // Fade out
    }

    draw(context) {
        context.save();
        context.globalAlpha = this.opacity;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}