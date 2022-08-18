import * as constants from "./constants"
import * as utils from "./utils"
import Wall from "./wall";
import Maze from "./maze";
import * as mazes from "./maze";

import * as texture from "./texture" 


class Game {
    constructor(context) {
        this.levels = { 1: mazes.level1, 2: mazes.level2 }
        this.marble = [];
        
        this.lives = 3;
        this.levelReached = 2;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.highScore = 0;
        this.context = context;
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
        let hole = this.marble.colisionDetectedHole(this.marble.vel)
        if (hole && hole.winner) {
            this.earnedPoints += hole.points;
            this.levelReached += 1;
            alert("Nice Job!");
            this.marble.pos = utils.translatePos([constants.GAME_DIMENSION_X - 60, 60]);
        }
        else if (hole && !hole.winner) {
            alert("Sorry, You didn't quite make it! ")
            if (hole.points > this.currentLevelScore) { this.currentLevelScore = hole.points;}
            this.lives -= 1;
            this.marble.pos = utils.translatePos([constants.GAME_DIMENSION_X - 60, 60]);
        }
        else {

        };
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
            this.resetGame()
        }
    }
    
    resetGame(){ 
        this.lives = 3;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.levelReached = 1;
    }
    

    

}


export default Game;