import React, { useEffect } from 'react';
import {Player} from './player.js';
import { InputHandler } from './playerInput.js';
import { Background } from './background.js';
import { Asteroid } from './asteroids.js';
import '../css/game.css';


const Game = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;


    //game screen
    class Game {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.sideMargin = 70; //offset from left
        this.speed = 2; //general game speed, adds modifier to most classes

        this.background = new Background(this);//space image
        this.player = new Player(this);//spaceship
        this.input = new InputHandler(this);
        this.debug = true;

        //asteroids
        this.asteroids = [];
        //how often asteroids come
        this.asteroidInterval = 7000;
        this.asteroidTimer = 0;

        //asteroid limit, can be adjusted for asteroid field, etc
        this.asteroidLimit = 5;
      }


      //implement fps for sprites later?
      update(deltaTime) {
        this.background.update();
        this.player.update(this.input.keys);

        //handle asteroids
        //if time for new asteroid, add new asteroid
        if (this.asteroidTimer > this.asteroidInterval && this.asteroids.length < this.asteroidLimit) {
          this.asteroids.push(new Asteroid(this));
          this.asteroidTimer = 0;
        } else {
          this.asteroidTimer += deltaTime;
        }

        this.asteroids.forEach(asteroid => {
          asteroid.update();
          if (asteroid.markedForDeletion) this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
        })

      }

      draw(context) {

        this.background.draw(context);
        this.player.draw(context);
        this.asteroids.forEach(asteroid => asteroid.draw(context));
      }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let lastTime = 0;

    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.update(deltaTime);
      game.draw(ctx);
      requestAnimationFrame(animate);
    }

    animate(0);



    //resizing.
    //i don't know if this works like we want it to
    //
    //
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2;
      game.width = canvas.width;
      game.height = canvas.height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };


  }, []);



  return (
    <canvas id="canvas1"></canvas>
  )
}

export default Game