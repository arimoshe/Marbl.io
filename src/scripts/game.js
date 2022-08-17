import * as constants from "./constants"
import * as utils from "./utils"
import Wall from "./wall";
import * as texture from "./texture" 


class Game {
    constructor() {
        this.walls = [];
        this.marble = [];
        this.holes = [];
        this.lives = 3;
        this.levelReached = 1;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.highScore = 0
    }


    

    addWalls() {
        for (let i = 0; i < constants.MAP_GRID_Y; i++) {
            let wallTop = new Wall({ pos: utils.translatePos([0, constants.MAP_GRID_SIZE * i]) });
            this.walls.push(wallTop);
            // console.log(utils.translatePos([0, constants.MAP_GRID_SIZE * i]))
        }
        for (let j = 1; j < constants.MAP_GRID_X; j++) {
            this.walls.push(new Wall({ pos: utils.translatePos([constants.MAP_GRID_SIZE * j, 0]) }))
        }
        for (let k = 0; k < constants.MAP_GRID_X; k++) {
            this.walls.push(new Wall({ pos: utils.translatePos([k * constants.MAP_GRID_SIZE, constants.GAME_DIMENSION_Y - constants.MAP_GRID_SIZE] )}))
        }
        for (let l = 0; l < constants.MAP_GRID_Y; l++) {
            this.walls.push(new Wall({ pos: utils.translatePos([constants.GAME_DIMENSION_X - constants.MAP_GRID_SIZE, l * constants.MAP_GRID_SIZE]) }))
        }
        for (let m = 1; m <= 7; m++) {
            if (m % 2 === 0) {
                for (let n = 0; n <= constants.MAP_GRID_X-15; n++) {
                    this.walls.push(new Wall({ pos: utils.translatePos([n *constants.MAP_GRID_SIZE , m * constants.MAP_GRID_SIZE * 6])}))
                }
            } else {
                for (let n = 15; n < constants.MAP_GRID_X; n++) {
                    this.walls.push(new Wall({ pos: utils.translatePos([n * constants.MAP_GRID_SIZE, m * constants.MAP_GRID_SIZE * 6]) }))
                }
            }
            

        }
        // for (let l = 0; l <= 14; l++) {
        //     this.walls.push(new Wall({ pos: [constants.MAP_GRID_SIZE*30, l * constants.MAP_GRID_SIZE] }))
        // }
        // for (let l = 0; l <= 8; l++) {
        //     this.walls.push(new Wall({ pos: [constants.MAP_GRID_SIZE * 36, l * constants.MAP_GRID_SIZE] }))
        // }
        // for (let l = 0; l <= 8; l++) {
        //     this.walls.push(new Wall({ pos: [constants.MAP_GRID_SIZE * 36 + l * constants.MAP_GRID_SIZE,  constants.MAP_GRID_SIZE * 9] }))
        // }
        // for (let l = 0; l <= 14; l++) {
        //     this.walls.push(new Wall({ pos: [constants.MAP_GRID_SIZE * 30 + l * constants.MAP_GRID_SIZE, constants.MAP_GRID_SIZE *15] }))
        // }
        // for (let l = 0; l <= 14; l++) {
        //     this.walls.push(new Wall({ pos: [constants.MAP_GRID_SIZE * 30, (constants.GAME_DIMENSION_Y - l * constants.MAP_GRID_SIZE) ] }))
        // }
        // for (let l = 0; l <= 14; l++) {
        //     this.walls.push(new Wall({ pos: [constants.MAP_GRID_SIZE * 30, (constants.GAME_DIMENSION_Y - l * constants.MAP_GRID_SIZE)] }))
        // }

    }

    drawBackground(ctx) {
        ctx.beginPath();
        ctx.rect(utils.translatePosX(0), utils.translatePosY(0), constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y);
        ctx.fillStyle = "#efefef";
        ctx.fill();
    }

    drawWalls(ctx) {
        // ctx.beginPath();
        // ctx.rect(constants.GAME_DIMENSION_X / 2, constants.GAME_DIMENSION_Y / 2,3,3)
        // ctx.fill();
        for (let ele of this.walls)
            
            if (ele.texture.image) {

                ctx.drawImage(ele.texture.image, ele.texture.sx, ele.texture.sy, ele.texture.swidth, ele.texture.sheight, ele.pos[0], ele.pos[1], ele.texture.width, ele.texture.height)
            } else {
                ctx.beginPath();
                ctx.rect(ele.pos[0],ele.pos[1], ele.size, ele.size);
                ctx.fill();
            }
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

    renderScore(ctx) {
        ctx.beginPath();
        ctx.font = "16px Silkscreen";
        ctx.fillStyle = "grey";
        ctx.fillText("Score", 3*screen.width/4, 85 );
        ctx.font = "60px Silkscreen";
        ctx.fillText(this.earnedPoints + this.currentLevelScore, 3 * screen.width / 4, 130);

    }
    
    renderLives (ctx) {
        ctx.beginPath();

        
        ctx.font = "16px Silkscreen";
        ctx.fillStyle = "grey";
        ctx.fillText("Lives", screen.width / 4, 85);
        for (let i=0; i<this.lives; i++) {
            
            if (texture.HEART_IMG) {
                ctx.drawImage(texture.HEART_IMG, (screen.width / 4 - this.lives * 35) + 70 * i, 85)
            }
        }
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