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

export const displayCanvases = (canvasArr) =>{
    Array.from(canvasArr).forEach(ele => ele.style.display = "inherit")
}
export const hideCanvases = (canvasArr)=> {
    Array.from(canvasArr).forEach(ele => ele.style.display = "none")
}

class Game {
    constructor() {
        this.levels = { 1: mazes.level1, 2: mazes.level2, 3: mazes.level3}
        this.currentLevel = 1;
        this.lives = 3;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.highScore = 0;
        this.contexts = document.getElementsByTagName("canvas")
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
        splash.style.display = "none";
        
        displayCanvases(document.getElementsByTagName("canvas"))
        draw.drawBackground(this.contexts['background'].getContext('2d'));
        draw.drawName(this.contexts["background"].getContext('2d'));

        const animate = () => {
    
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
            
            
            this.contexts['main-app'].getContext('2d').clearRect(0,0, constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y)
            draw.drawVector(this.contexts['main-app'].getContext('2d'), this);
            draw.drawMarble(this.contexts['main-app'].getContext('2d'), this.marble);
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
        this.contexts['ui'].getContext('2d').clearRect(-constants.GAME_OFFSET_X, -constants.GAME_OFFSET_Y, this.contexts['ui'].width, this.contexts['ui'].height)
        this.contexts['map'].getContext('2d').clearRect(-constants.GAME_OFFSET_X, -constants.GAME_OFFSET_Y, this.contexts['map'].width, this.contexts['map'].height)
        this.contexts['main-app'].getContext('2d').clearRect(0, 0, constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y)
        
        draw.drawLevelWalls(this.contexts['map'].getContext('2d'), this, this.currentLevel);
        draw.drawLevelHoles(this.contexts['map'].getContext('2d'), this, this.currentLevel);
        draw.drawMarble(this.contexts['main-app'].getContext('2d'), this.marble);
        draw.drawScore(this.contexts['ui'].getContext('2d'), this);
        draw.drawLives(this.contexts['ui'].getContext('2d'), this);
        
        
        
        draw.drawButton(
            this.contexts['main-app'].getContext('2d'), 
            [(constants.GAME_DIMENSION_X / 2)  , 
            (constants.GAME_DIMENSION_Y / 2)], 
            225, 
            110, 
            20, 
            "Start",
            "grey", 
            "#e0e0e0", 
            "38px", 
            "Silkscreen"
        )
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
        splash.style.display = "inherit";
        hideCanvases(document.getElementsByTagName("canvas"));
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