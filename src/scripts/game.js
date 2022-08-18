import * as constants from "./constants"
import * as utils from "./utils"
import Marble from "./marble";
import Wall from "./wall";
import Maze from "./maze";
import * as mazes from "./maze";
import * as index from "../index";

import * as texture from "./texture" 

export let PAUSED = true;

class Game {
    constructor(context) {
        this.levels = { 1: mazes.level1, 2: mazes.level2, 3: mazes.level3}
        this.levelsStartPos = { 1: mazes.level1.startPos, 2: mazes.level2.startPos, 3: mazes.level3.startPos }
        
        
        this.lives = 3;
        this.levelReached = 1;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.highScore = 0;
        this.context = context;
        this.marble = new Marble({ pos: this.levels[this.levelReached].startPos, radius: 15, vel: [0, 0], game: this });
        this.startButton = undefined
        
    }


    beginGame() {
        let splash = document.getElementById("splash-container")
        let canvas = document.getElementById("main-app")
        splash.style.display = "none";
        canvas.style.display = "inherit";
        PAUSED = false;
        this.pauseAndStartButton()
    }

    drawLevelWalls(levelNum) {
        for (let ele of this.levels[levelNum].walls) {
            
            if (ele.texture.image) {
                this.context.drawImage(ele.texture.image, ele.texture.sx, ele.texture.sy, ele.texture.swidth, ele.texture.sheight, ele.pos[0], ele.pos[1], ele.texture.width, ele.texture.height)
            } else {
                this.context.beginPath();
                this.context.rect(ele.pos[0], ele.pos[1], ele.size, ele.size);
                this.context.fill();
            }
        }
    }


    drawLevelHoles(levelNum){
        for (let ele of this.levels[levelNum].holes) {
            ele.draw(this.context, ele.pos, ele.radius, ele.points)
        }
    }

    drawLevel(levelNum) {
        
        this.drawLevelWalls(levelNum);
        this.drawLevelHoles(levelNum);

    }

    drawBackground(ctx) {
        ctx.beginPath();
        ctx.rect(-constants.GAME_OFFSET_X / constants.SCALE, -constants.GAME_OFFSET_Y / constants.SCALE, window.innerWidth / constants.SCALE, window.innerHeight / constants.SCALE);
        ctx.fillStyle = "grey";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(0, 0, constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y);
        ctx.fillStyle = "#efefef";
        ctx.fill();
        
    }

    

    handleVector (marble){
        // alert(marble.beta)
        if (marble.beta) {
            // alert()
            marble.updateVectorOrientation()    
        } else {

            this.marble.updateVectorMouse()
        } 
    }

    handleHoleHit(){

        
        let hole = this.marble.colisionDetectedHole(this.marble.vel);
        // console.log(hole);
            if (hole && hole.winner) {
            this.earnedPoints += hole.points;
            this.levelReached += 1;
            this.currentLevelScore = 0;
            alert("Nice Job!");
                this.marble.pos = [constants.GAME_DIMENSION_X - 60, 60];
            this.pauseAndStartButton();
        }
        else if (hole && !hole.winner) {
                this.marble.pos = [constants.GAME_DIMENSION_X - 60, 60];
            alert("Sorry, You didn't quite make it! ")
            if (hole.points > this.currentLevelScore) { this.currentLevelScore = hole.points;}
            this.lives -= 1;
            this.pauseAndStartButton();
        }
    
    }

    pauseAndStartButton(){
        index.drawActions()
        PAUSED = true;
        this.context.beginPath();
        this.context.fillStyle = "grey"
        this.context.roundRect(constants.GAME_DIMENSION_X / 2 - 112.5, constants.GAME_DIMENSION_Y/2 -55 , 225, 110, 20)
        console.log()
        this.context.fill()
        this.context.beginPath();
        this.context.font = "38px Silkscreen"
        this.context.fillStyle = "#e0e0e0"
        this.context.fillText("Start",constants.GAME_DIMENSION_X / 2, constants.GAME_DIMENSION_Y / 2+10)
    }

    

    drawScore(ctx) {
        ctx.beginPath();
        ctx.font = "16px Silkscreen";
        ctx.fillStyle = "#e0e0e0";
        ctx.fillText("Score", constants.GAME_DIMENSION_X * .85, - 70 );
        ctx.font = "60px Silkscreen";
        ctx.fillText(this.earnedPoints + this.currentLevelScore, constants.GAME_DIMENSION_X  * .85 , -20);

    }
    
    drawLives (ctx) {
        ctx.beginPath();

        
        ctx.font = "16px Silkscreen";
        ctx.fillStyle = "#e0e0e0";
        ctx.fillText("Lives", constants.GAME_DIMENSION_X * .15, -70);
        for (let i=0; i<this.lives; i++) {
            
            if (texture.HEART_IMG) {
                ctx.drawImage(texture.HEART_IMG, (constants.GAME_DIMENSION_X * .075) + (70 * i), -65)
            }
        }
    }

    drawName(ctx) {
        ctx.beginPath();
        ctx.font = "100px Silkscreen";
        ctx.fillStyle = "#202020";
        ctx.textAlign = "center";
        ctx.fillText("Marbl.io", (constants.GAME_DIMENSION_X / 2), -30);
    }

    

    handleLoss(){
        if (this.lives === 0) {
            this.earnedPoints += this.currentLevelScore;
            alert(`Game Over \n You Scored ${this.earnedPoints} Points`)
            if (this.earnedPoints > this.highScore) {
                this.highScore = this.earnedPoints
            }
            document.getElementById("high-score").innerText = marblio.highScore
            let splash = document.getElementById("splash-container");
            let canvas = document.getElementById("main-app");
            splash.style.display = "inherit";
            canvas.style.display = "none";
            this.resetGame()
        }
    }
    
    handleWin(){
        if (this.levelReached === 4)
        alert("YOU WIN! (This Demo)\n Thanks for playing!")
        this.highScore = this.earnedPoints;
        document.getElementById("high-score").innerText = this.highScore
        this.resetGame();

    }

    resetGame(){ 
        let splash = document.getElementById("splash-container");
        let canvas = document.getElementById("main-app");
        splash.style.display = "inherit";
        canvas.style.display = "none";
        this.lives = 3;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.levelReached = 1;
    }
    

    

}

addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("main-app").addEventListener("click", event => {
    
    
        PAUSED = false;     
  
    
    // console.log(`new Hole({points: 0, pos:[${Math.floor((event.clientX - GAME_OFFSET_X) * (1 / SCALE) - 10)}, ${Math.floor((event.clientY - GAME_OFFSET_Y) * (1 / SCALE) + 5)}], winner: false }),`)
    // ctx.marblio.levels[ctx.marblio.levelReached].holes.push(new Hole({ points: 0, pos: [(event.clientX - GAME_OFFSET_X) * (1 / SCALE) - 10, (event.clientY - GAME_OFFSET_Y) * (1 / SCALE) + 5], winner: false }))

});
})

export default Game;