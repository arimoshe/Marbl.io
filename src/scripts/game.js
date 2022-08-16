import * as constants from "./constants"
import Wall from "./wall";


class Game {
    constructor() {
        this.walls = [];
        this.marble = [];
        this.holes = []

    }


    

    addWalls() {
        for (let i = 0; i < constants.MAP_GRID_Y; i++) {
            let wallTop = new Wall({ pos: [0, constants.MAP_GRID_SIZE * i] });
            this.walls.push(wallTop);
        }
        for (let j = 1; j < constants.MAP_GRID_X; j++) {
            this.walls.push(new Wall({ pos: [constants.MAP_GRID_SIZE * j, 0] }))
        }
        for (let k = 0; k < constants.MAP_GRID_X; k++) {
            this.walls.push(new Wall({ pos: [k * constants.MAP_GRID_SIZE, constants.GAME_DIMENSION_Y - constants.MAP_GRID_SIZE] }))
        }
        for (let l = 0; l <= constants.MAP_GRID_Y; l++) {
            this.walls.push(new Wall({ pos: [constants.GAME_DIMENSION_X - constants.MAP_GRID_SIZE, l * constants.MAP_GRID_SIZE] }))
        }
        for (let m = 1; m <= 7; m++) {
            if (m % 2 === 0) {
                for (let n = 0; n <= constants.MAP_GRID_X-15; n++) {
                    this.walls.push(new Wall({ pos: [n *constants.MAP_GRID_SIZE , m * constants.MAP_GRID_SIZE * 6] }))
                }
            } else {
                for (let n = 15; n <= constants.MAP_GRID_X; n++) {
                    this.walls.push(new Wall({ pos: [n * constants.MAP_GRID_SIZE, m * constants.MAP_GRID_SIZE * 6] }))
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
        ctx.rect(0,0, constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y);
        ctx.fillStyle = "white";
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
                ctx.rect(ele.pos[0], ele.pos[1], ele.size, ele.size);
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

    

    

}


export default Game;