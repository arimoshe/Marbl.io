import * as constants from "./constants"
import * as utils from "./utils"
import Marble from "./marble";
import Wall from "./wall";
import Maze from "./maze";
import * as mazes from "./maze";
import * as index from "../index";
import * as texture from "./texture"
import * as collision from "./collision" 
import * as draw from "./draw"
import Input from "./input";

export let PAUSED = true;

// const handleOrientation = (event) => {
//     alert("beta:",event.beta)
//     this.controls = "orientation"
//     this.input.alpha = event.alpha
//     this.input.beta = event.beta;
//     this.input.gamma = event.gamma;
//     // this.alpha = lowPass(this.alpha, event.alpha, 0.8);
//     // this.beta = lowPass(this.beta, event.beta, 0.8);
//     // this.gamma = lowPass(this.gamma, event.gamma, 0.8);

//     // console.log("alpha:", alpha, "beta:", beta, "gamma:", gamma)
// }

class Game {
    constructor(context) {
        this.levels = { 1: mazes.level1, 2: mazes.level2, 3: mazes.level3}
        this.currentLevel = 1;
        this.lives = 3;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.highScore = 0;
        this.context = context;
        this.context = context;
        this.controls = "mouse"
        this.marble = new Marble({ pos: [...this.levels[this.currentLevel].startPos], radius: 15, vel: [0, 0], game: this });
        this.input = new Input(this,0,0,0,0);
        window.addEventListener('mousemove', (event) => {
            this.input.mousePosX = event.clientX;
            this.input.mousePosY = event.clientY;
        });
        
        
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            alert("requestPermission")
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    if (response === "granted") {
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                    else {
                        alert("Device Orientation permission request was denied. Please allow to play on a mobile device.")
                    }
                })
                .catch(console.error);
        }
        else {
            window.addEventListener('deviceorientation', (event) => {

                // console.log(event)
                this.controls = "orientation"
                this.input.alpha = event.alpha
                this.input.beta = event.beta;
                this.input.gamma = event.gamma;

            });
        }
       


    }

    gameActions = () => {
        if (!PAUSED) {
            
            this.handleInput();
            this.handleHoleHit();
            this.handleLoss();
            this.marble.move(this.marble.vel);
            
        }
    }


    beginGame() {

        let splash = document.getElementById("splash-container")
        let canvas = document.getElementById("main-app")
        splash.style.display = "none";
        canvas.style.display = "inherit";
        const animate = () => {console.log
    
            this.drawGame()
            
            requestAnimationFrame(animate);
        };
        animate();
        
        let gameInterval = setInterval(() =>{
            
            this.gameActions()
            
        }, 1000 / constants.FRAME_RATE);
        // PAUSED = false;
        this.pauseAndStartButton();
        
    };


    drawGame() {
        if (!PAUSED) {
            
            
            draw.drawBackground(this.context);
            draw.drawLevelWalls(this.context, this, this.currentLevel);
            draw.drawLevelHoles(this.context,  this,this.currentLevel);
            draw.drawVector(this.context, this);
            draw.drawMarble(this.context, this.marble);
            draw.drawScore(this.context, this);
            draw.drawName(this.context);
            draw.drawLives(this.context, this);
            draw.updateBoardRotataion(this.marble)
            

        }
    }

    handleInput (){
        if (this.controls === "orientation") {
            this.input.updateVectorOrientation()    
        } else {
            this.input.updateVectorMouse()
        } 
        // this.input.updateVectorOrientation() 

    }

    handleHoleHit(){

        
        let hole = collision.collideAnyHole(this);
        // console.log(hole);
            if (hole && hole.winner) {
            this.earnedPoints += hole.points;
            this.currentLevel += 1;
            this.currentLevelScore = 0;
            this.handleNextLevel()
            
        }
        else if (hole && !hole.winner) {
                
                this.marble.pos = [...this.levels[this.currentLevel].startPos]
            alert("Sorry, You didn't quite make it! ")
            if (hole.points > this.currentLevelScore) { this.currentLevelScore = hole.points;}
            this.lives -= 1;
            this.pauseAndStartButton();
        }
    
    }

    pauseAndStartButton(){
        this.marble.vel = [0,0];
        draw.updateBoardRotataion(this.marble);
        PAUSED = true;
        draw.drawBackground(this.context);
        draw.drawLevelWalls(this.context, this, this.currentLevel);
        draw.drawLevelHoles(this.context, this, this.currentLevel);
        draw.drawMarble(this.context, this.marble);
        draw.drawScore(this.context, this);
        draw.drawName(this.context);
        draw.drawLives(this.context, this);
        
        
        
        draw.drawButton(
            this.context, 
            [(constants.GAME_DIMENSION_X / 2 + constants.MAP_GRID_SIZE * constants.SCALE) - 30, 
            (constants.GAME_DIMENSION_Y / 2 + constants.MAP_GRID_SIZE * constants.SCALE)+10], 
            225, 
            110, 
            20, 
            "Start",
            "grey", 
            "#e0e0e0", 
            "38px", 
            "Silkscreen"
        )
        // this.context.beginPath();
        // this.context.fillStyle = "grey"
        // util.roundRect(constants.GAME_DIMENSION_X / 2 - 112.5, constants.GAME_DIMENSION_Y/2 -55 , 225, 110, 20, true, false);
        // this.context.beginPath();
        // this.context.font = "38px Silkscreen"
        // this.context.fillStyle = "#e0e0e0"
        // this.context.fillText("Start",constants.GAME_DIMENSION_X / 2, constants.GAME_DIMENSION_Y / 2+10)
    }

    

    

    

    handleLoss(){
        if (this.lives === 0) {
            this.earnedPoints += this.currentLevelScore;
            alert(`Game Over \n You Scored ${this.earnedPoints} Points`)
            if (this.earnedPoints > this.highScore) {
                this.highScore = this.earnedPoints
            }
            this.resetGame()
        }
    }
    
    handleNextLevel(){
        if (this.currentLevel < 4) {
            alert("Nice Job!");
            this.marble.pos = [...this.levels[this.currentLevel].startPos];
            this.pauseAndStartButton();
        } else {
            alert("YOU WIN! (This Demo)\n Thanks for playing!")
            this.highScore = this.earnedPoints;
            document.getElementById("high-score").innerText = this.highScore
            this.resetGame();
        }
    }

    resetGame(){ 
        document.getElementById("high-score").innerText = this.highScore

        let splash = document.getElementById("splash-container")
        let canvas = document.getElementById("main-app")
        let ui = document.getElementById("ui")
        splash.style.display = "inherit";
        ui.style.display = "none"
        canvas.style.display = "none";
        this.lives = 3;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.currentLevel = 1;
        console.log([...this.levels[this.currentLevel].startPos]);
        this.marble.pos = [...this.levels[this.currentLevel].startPos]
    }
    

    

}

addEventListener('DOMContentLoaded', (event) => {
    


    document.getElementById("main-app").addEventListener("click", event => {
    
    
        PAUSED = false;     

        
  
    
    // console.log(`new Hole({points: 0, pos:[${Math.floor((event.clientX - GAME_OFFSET_X) * (1 / SCALE) - 10)}, ${Math.floor((event.clientY - GAME_OFFSET_Y) * (1 / SCALE) + 5)}], winner: false }),`)
    // ctx.marblio.levels[ctx.marblio.currentLevel].holes.push(new Hole({ points: 0, pos: [(event.clientX - GAME_OFFSET_X) * (1 / SCALE) - 10, (event.clientY - GAME_OFFSET_Y) * (1 / SCALE) + 5], winner: false }))

});
})






// if (!constants.PAUSED) {



export default Game;