
import Wall from "./wall";


class Game {
    constructor() {
        this.walls = [];
        this.marble = [];

    }

    addWalls() {
        for (let i = 0; i < 40; i++) {
            let wallTop = new Wall({ pos: [0, 16 * i] });
            this.walls.push(wallTop);
        }

        for (let j = 1; j < 70; j++) {
            this.walls.push(new Wall({ pos: [16 * j, 0] }))
        }
        for (let k = 0; k < 70; k++) {
            this.walls.push(new Wall({ pos: [k * 16, 624] }))
        }
        for (let l = 0; l <= 40; l++) {
            this.walls.push(new Wall({ pos: [1104, l * 16] }))
        }
        for (let l = 0; l <= 14; l++) {
            this.walls.push(new Wall({ pos: [500, l * 16] }))
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