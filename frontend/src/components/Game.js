import React, { useEffect } from 'react';
import {Player} from './player.js';
import { InputHandler } from './playerInput.js';
import { Background } from './background.js';
import { Asteroid } from './asteroids.js';
import '../css/game.css';
import randomDialogue from '../ai/randomDialogue.js';
import { ACTIONS } from '../data/actions.js';
import { Generate_Warning_Message, Warning_Player_Options } from '../ai/Warning.js';


const Game = ({state, dispatch, setChatLog, setHasPopup}) => {
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
        this.bottomMargin = 70;
        this.velocityX = 0; //general game speed, adds modifier to most classes
        this.velocityY = 0;

        this.background = new Background(this);//space image
        this.player = new Player(this);//spaceship
        this.input = new InputHandler(this);
        this.debug = false;

        //asteroids
        this.asteroids = [];
        //how often asteroids come
        this.asteroidInterval = 2000;
        this.asteroidTimer = 0;

        //asteroid limit, can be adjusted for asteroid field, etc
        this.asteroidLimit = 5;

        this.randomDialogueTimer = 0;
        this.randomDialogueInterval = Math.floor(Math.random() * (70000 - 50000) + 50000);
        this.randomEventInterval = Math.floor(Math.random()*100 + 200);
        this.distanceTimer = 0;
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

        if (this.randomDialogueTimer > this.randomDialogueInterval) {
          // randomDialogue(state, dispatch).then((output) => {
          //   // console.log(output);
          //   setChatLog((log) => [...log, {name: output.role, text: output.speech}])
          // })
          this.randomDialogueTimer = 0;
        } else {
          this.randomDialogueTimer += deltaTime
        }

        let distance = deltaTime*this.velocityX/4000;
        // console.log("distacne: " + distance);
        dispatch({type: ACTIONS.DECREASE_DISTANCE, payload: distance});
        console.log("DECREASE DIST: " + distance)

        /*if (this.randomEventInterval < this.distanceTimer) {
          let randomChoice = Math.floor(Math.random()*5);
          randomChoice = 1
          switch (randomChoice) {
            case 0:
              Generate_Warning_Message(state).then((output) => {
                dispatch({type: ACTIONS.SET_EVENT_IS_BAD, payload: true})
                Warning_Player_Options(state, output.desc).then((secondOutput) => {
                  dispatch({type: ACTIONS.SET_HAS_EVENT, payload: true})
                  dispatch({type: ACTIONS.SET_EVENT_DESCRIPTION, payload: output.desc})
                  dispatch({type: ACTIONS.SET_EVENT_CHOICES, payload: [
                    secondOutput.option1, secondOutput.option2, secondOutput.option3
                  ]})
                  dispatch({type: ACTIONS.SET_EVENT_CONSEQUENCES, payload: [
                    secondOutput.option1_resources, secondOutput.option2_resources, secondOutput.option3_resources
                  ]})
                  setHasPopup(true);
                })
              })
              break;
            default:
              break;
          }
          this.distanceTimer = 0;
        } else {
          if (distance < 50) {
            this.distanceTimer += distance;
          }
        }*/
        

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