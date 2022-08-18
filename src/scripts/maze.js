import * as constants from "./constants"
import Wall from "./wall";
import Hole from "./hole";


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

let level1Holes = [new Hole({ points: 100, pos: [constants.GAME_DIMENSION_X - (60 * constants.SCALE), constants.GAME_DIMENSION_Y - (60 * constants.SCALE)], winner: true })]

export const level1 = new Maze({ walls: level1Walls, holes: level1Holes, levelNum1: 1, levelName: "An Easy Start", startPos: [60, 60]})
console.log(level1)
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
console.log(level2)


let level3Walls = [].concat(boundryWalls)

let level3Holes = [
    new Hole({ points: 0, pos: [630, 435], winner: false }),
    new Hole({ points: 0, pos: [630, 415], winner: false }),
    new Hole({ points: 0, pos: [630, 360], winner: false }),
    new Hole({ points: 0, pos: [630, 305], winner: false }),
    new Hole({ points: 0, pos: [630, 179], winner: false }),
    new Hole({ points: 0, pos: [630, 129], winner: false }),
    new Hole({ points: 0, pos: [630, 86], winner: false }),
    new Hole({ points: 0, pos: [630, 41], winner: false }),
    new Hole({ points: 0, pos: [670, 435], winner: false }),
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
    
]

export const level3 = new Maze({ walls: level3Walls, holes: level3Holes, levelNum1: 3, levelName: "Getting Harder", startPos: [constants.GAME_DIMENSION_X / 2, constants.GAME_DIMENSION_Y / 2] })
console.log(level2)

export default Maze;