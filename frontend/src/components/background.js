import layer1Image from '../assets/stars2.jpg';

class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = new Image();
        this.image.src = image;
        this.x = 0;
        this.y = 0;
    }

    update() {
        this.x -= this.game.velocityX * this.speedModifier;
        if (this.x <= -this.width) {
            this.x += this.width;
        } else if (this.x >= this.width) {
            this.x -= this.width;
        }
    }
    draw(context) {        
        context.drawImage(this.image, this.x - this.width, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + 2 * this.width, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + 3 * this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 750;
        this.height = 500;
        this.layer1 = new Layer(this.game, this.width, this.height, 1, layer1Image);
        this.backgroundLayers = [this.layer1];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}