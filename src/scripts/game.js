import * as constants from "./constants"
import Wall from "./wall";


class Game {
    constructor() {
        this.walls = [];
        this.marble = [];

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
        for (let l = 0; l <= 14; l++) {
            this.walls.push(new Wall({ pos: [500, l * constants.MAP_GRID_SIZE] }))
        }
    }

    drawWalls(ctx) {
        
        for (let ele of this.walls)
            
            if (ele.texture.image) {

                ctx.drawImage(ele.texture.image, ele.texture.sx, ele.texture.sy, ele.texture.swidth, ele.texture.sheight, ele.pos[0], ele.pos[1], ele.texture.width, ele.texture.height)
            } else {
                ctx.beginPath();
                ctx.rect(ele.pos[0], ele.pos[1], ele.size, ele.size);
                ctx.fill();
            }
    }

    

}


export default Game;