import * as constants from "./constants"
import Wall from "./wall";
import Hole from "./hole";
import * as draw from "./draw"

let specialFunction = (game) => { 
    game.lives++;
    game.marble.pos = [650, 415]
    draw.drawLives(game.contexts['ui'].getContext('2d'), game);
    game.pauseAndStartButton();
     }

class Maze {
    constructor(optionsHash ) {
        this.levelNum = optionsHash.levelName
        this.levelName = optionsHash.levelName
        this.startPos = optionsHash.startPos
        this.walls = optionsHash.walls;
        this.holes = optionsHash.holes;
    }
}

let boundryWalls = [];


for (let i = 0; i < constants.MAP_GRID_Y; i++) {
    let wallTop = new Wall({ pos: [0, constants.MAP_GRID_SIZE * i] });
    boundryWalls.push(wallTop);
}
for (let j = 1; j < constants.MAP_GRID_X; j++) {
    boundryWalls.push(new Wall({ pos: [constants.MAP_GRID_SIZE * j, 0] }))
}
for (let k = 0; k < constants.MAP_GRID_X; k++) {
    boundryWalls.push(new Wall({ pos: [k * constants.MAP_GRID_SIZE, constants.GAME_DIMENSION_Y - constants.MAP_GRID_SIZE] }))
}
for (let l = 0; l < constants.MAP_GRID_Y; l++) {
    boundryWalls.push(new Wall({ pos: [constants.GAME_DIMENSION_X - constants.MAP_GRID_SIZE, l * constants.MAP_GRID_SIZE] }))
}





let level1Walls = [].concat(boundryWalls)

let level1Holes = [new Hole({ points: 100, pos: [constants.GAME_DIMENSION_X - 50, constants.GAME_DIMENSION_Y - 50 ], winner: true })]

export const level1 = new Maze({ walls: level1Walls, holes: level1Holes, levelNum1: 1, levelName: "An Easy Start", startPos: [60, 60]})

let level2Walls = [].concat(boundryWalls)

for (let m = 1; m <= 7; m++) {
    if (m % 2 === 0) {
        for (let n = 0; n <= constants.MAP_GRID_X - 15; n++) {
            level2Walls.push(new Wall({ pos: [n * constants.MAP_GRID_SIZE, m * constants.MAP_GRID_SIZE * 6] }))
        }
    } else {
        for (let n = 15; n < constants.MAP_GRID_X; n++) {
            level2Walls.push(new Wall({ pos: [n * constants.MAP_GRID_SIZE, m * constants.MAP_GRID_SIZE * 6] }))
        }
    }
}

let level2Holes = [
    new Hole({ points: 100, pos: [1283, 729], winner: true }),
    new Hole({ points: 12, pos: [60, 60], winner: false, radius: 35 }),
    new Hole({ points: 12, pos: [205, 111], winner: false , radius: 27}),
    new Hole({ points: 23, pos: [438, 137], winner: false }),
    new Hole({ points: 28, pos: [788, 173], winner: false }),
    new Hole({ points: 45, pos: [245, 230], winner: false }),
    new Hole({ points: 52, pos: [215, 302], winner: false }), 
    new Hole({ points: 54, pos: [55, 291], winner: false, radius: 30 }),
    new Hole({ points: 60, pos: [560, 358], winner: false }),
    new Hole({ points: 65, pos: [1078, 329], winner: false }),
    new Hole({ points: 71, pos: [1223, 384], winner: false ,radius:40}),
    new Hole({ points: 76, pos: [792, 449], winner: false }),
    new Hole({ points: 80, pos: [40, 482], winner: false }),
    new Hole({ points: 80, pos: [41, 535], winner: false }),
    new Hole({ points: 83, pos: [40, 432], winner: false }),
    new Hole({ points: 87, pos: [689, 534], winner: false }),
    new Hole({ points: 91, pos: [1100, 550], winner: false }),
    new Hole({ points: 91, pos: [1143, 584], winner: false }),
    new Hole({ points: 91, pos: [1100, 616], winner: false }),
    new Hole({ points: 95, pos: [179, 680], winner: false, radius: 50 }),
]

export const level2 = new Maze({ walls: level2Walls, holes: level2Holes, levelNum1: 1, levelName: "Getting Harder", startPos: [constants.GAME_DIMENSION_X -60, 60] })



let level3Walls = [].concat(boundryWalls)

let level3Holes = [
    new Hole({ points: 0, pos: [595, 415], winner: false }),
    new Hole({ points: 0, pos: [595, 360], winner: false }),
    new Hole({ points: 0, pos: [595, 305], winner: false }),
    new Hole({ points: 0, pos: [595, 250], winner: false }),
    new Hole({ points: 0, pos: [595, 195], winner: false }),
    new Hole({ points: 0, pos: [595, 140], winner: false }),
    new Hole({ points: 0, pos: [595, 85], winner: false }),
    new Hole({ points: 0, pos: [595, 36], winner: false, radius: 18 }), 
    new Hole({ points: 0, pos: [705, 415], winner: false }),
    new Hole({ points: 0, pos: [705, 360], winner: false }),
    new Hole({ points: 0, pos: [705, 305], winner: false }),
    new Hole({ points: 0, pos: [705, 250], winner: false }),
    new Hole({ points: 0, pos: [705, 195], winner: false }),
    new Hole({ points: 0, pos: [705, 140], winner: false }),
    new Hole({ points: 0, pos: [705, 85], winner: false }),
    new Hole({ points: 0, pos: [760, 85], winner: false }),
    new Hole({ points: 0, pos: [815, 85], winner: false }),
    new Hole({ points: 0, pos: [870, 85], winner: false }),
    new Hole({ points: 0, pos: [870, 140], winner: false }),
    new Hole({ points: 0, pos: [870, 195], winner: false }),
    new Hole({ points: 0, pos: [870, 250], winner: false }),
    new Hole({ points: 0, pos: [870, 305], winner: false }),
    new Hole({ points: 0, pos: [870, 360], winner: false }),
    new Hole({ points: 0, pos: [870, 415], winner: false }),
    new Hole({ points: 0, pos: [870, 470], winner: false }),
    new Hole({ points: 0, pos: [870, 580], winner: false }),
    new Hole({ points: 0, pos: [870, 635], winner: false }),
    new Hole({ points: 0, pos: [870, 690], winner: false }),
    new Hole({ points: 0, pos: [815, 690], winner: false }),
    new Hole({ points: 0, pos: [760, 690], winner: false }),
    new Hole({ points: 0, pos: [705, 690], winner: false }),
    new Hole({ points: 0, pos: [650, 690], winner: false }),
    new Hole({ points: 0, pos: [760, 580], winner: false }),
    new Hole({ points: 0, pos: [815, 580], winner: false }),
    new Hole({ points: 0, pos: [705, 580], winner: false }),
    new Hole({ points: 0, pos: [650, 580], winner: false }),
    new Hole({ points: 0, pos: [595, 580], winner: false }),
    new Hole({ points: 0, pos: [595, 690], winner: false }),
    new Hole({ points: 0, pos: [595, 635], winner: false }),
    // new Hole({ points: 0, pos: [980, 745], winner: false }),
    new Hole({ points: 0, pos: [980, 690], winner: false }),
    new Hole({ points: 0, pos: [980, 635], winner: false }),
    new Hole({ points: 0, pos: [980, 580], winner: false }),
    new Hole({ points: 0, pos: [980, 525], winner: false }),
    new Hole({ points: 0, pos: [980, 470], winner: false }),
    new Hole({ points: 0, pos: [980, 415], winner: false }),
    new Hole({ points: 0, pos: [980, 360], winner: false }),
    new Hole({ points: 0, pos: [980, 305], winner: false }),
    new Hole({ points: 0, pos: [980, 250], winner: false }),
    new Hole({ points: 0, pos: [980, 195], winner: false }),
    new Hole({ points: 0, pos: [980, 140], winner: false }),
    new Hole({ points: 0, pos: [980, 85], winner: false }),
    new Hole({ points: 0, pos: [980, 36], winner: false , radius: 18}),
    new Hole({ points: 0, pos: [705, 470], winner: false }),
    new Hole({ points: 0, pos: [760, 470], winner: false }),
    new Hole({ points: 0, pos: [815, 470], winner: false }),
    new Hole({ points: 0, pos: [870, 470], winner: false }),
    new Hole({ points: 0, pos: [650, 470], winner: false }),
    new Hole({ points: 0, pos: [595, 470], winner: false }),
    new Hole({ points: 0, pos: [815, 470], winner: false }),
    new Hole({ points: 0, pos: [870, 470], winner: false }),
    new Hole({ points: 0, pos: [485, 745], winner: false }),
    new Hole({ points: 0, pos: [485, 690], winner: false }),
    new Hole({ points: 0, pos: [485, 635], winner: false }),
    new Hole({ points: 0, pos: [485, 580], winner: false }),
    new Hole({ points: 0, pos: [485, 525], winner: false }),
    new Hole({ points: 0, pos: [485, 470], winner: false }),
    new Hole({ points: 0, pos: [485, 415], winner: false }),
    new Hole({ points: 0, pos: [485, 360], winner: false }),
    new Hole({ points: 0, pos: [485, 305], winner: false }),
    new Hole({ points: 0, pos: [485, 250], winner: false }),
    new Hole({ points: 0, pos: [485, 195], winner: false }),
    new Hole({ points: 0, pos: [485, 140], winner: false }),
    new Hole({ points: 0, pos: [485, 85], winner: false }),
    new Hole({ points: 0, pos: [365, 33], winner: false, radius: 18 }),
    new Hole({ points: 0, pos: [365, 690], winner: false }),
    new Hole({ points: 0, pos: [365, 635], winner: false }),
    new Hole({ points: 0, pos: [365, 580], winner: false }),
    new Hole({ points: 0, pos: [365, 525], winner: false }),
    new Hole({ points: 0, pos: [365, 470], winner: false }),
    new Hole({ points: 0, pos: [365, 415], winner: false }),
    new Hole({ points: 0, pos: [365, 360], winner: false }),
    new Hole({ points: 0, pos: [365, 305], winner: false }),
    new Hole({ points: 0, pos: [365, 250], winner: false }),
    new Hole({ points: 0, pos: [365, 195], winner: false }),
    new Hole({ points: 0, pos: [365, 140], winner: false }),
    new Hole({ points: 0, pos: [365, 85], winner: false }),
    new Hole({ points: 100, pos: [185, 150], winner: true , radius:80}),
    new Hole({
        special: specialFunction,
        points: "?", pos: [1160, 150], winner: false, radius: 80, 
        draw: (ctx, pos, radius, points) => {
            ctx.beginPath();
            ctx.moveTo(pos[0], pos[1]);
            ctx.arc(pos[0], pos[1], radius - 4, 0, 2 * Math.PI);
            let strokeGradient = ctx.createLinearGradient(pos[0], pos[1] - radius, pos[0], pos[1] + radius);
            strokeGradient.addColorStop(0, '#c0c0c0');
            strokeGradient.addColorStop(1, 'white');
            ctx.strokeStyle = strokeGradient;
            ctx.lineWidth = radius / 2;
            ctx.stroke();
            let fillGradient = ctx.createRadialGradient(pos[0], pos[1], radius * 2, pos[0], pos[1] + radius, 0);
            fillGradient.addColorStop(0, '#990000');
            fillGradient.addColorStop(1, '#dddddd');
            ctx.fillStyle = fillGradient;
            ctx.fill();
            ctx.fillStyle = '#efefef';
            ctx.beginPath();
            ctx.ellipse(pos[0], pos[1] + (radius * 1.4), 10, 30, Math.PI / 2, 0, Math.PI * 2);
            ctx.filter = 'blur(5px)'
            ctx.fill();
            ctx.filter = 'none'
            ctx.fillStyle = 'black';
            ctx.font = "22px Silkscreen";
            ctx.textAlign = "center"
            ctx.fillText(points, pos[0], pos[1] + (radius * 1.45))
        }
})
]

export const level3 = new Maze({ walls: level3Walls, holes: level3Holes, levelNum1: 3, levelName: "Not Easy", startPos: [650, 415] })
level3.holes[87].special = specialFunction;

export default Maze;