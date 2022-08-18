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

]

export const level2 = new Maze({ walls: level2Walls, holes: level2Holes, levelNum1: 1, levelName: "Getting Harder", startPos: [constants.GAME_DIMENSION_X -60, 60] })
console.log(level2)


let level3Walls = [].concat(boundryWalls)

let level3Holes = [
    new Hole({ points: 100, pos: [1283, 729], winner: true }),
    new Hole({ points: 12, pos: [60, 60], winner: false, radius: 35 }),
    new Hole({ points: 12, pos: [205, 111], winner: false, radius: 27 }),
    new Hole({ points: 23, pos: [438, 137], winner: false }),
    new Hole({ points: 28, pos: [788, 173], winner: false }),
    new Hole({ points: 45, pos: [245, 230], winner: false }),
    new Hole({ points: 100, pos: [1283, 729], winner: true }),
    new Hole({ points: 12, pos: [60, 60], winner: false, radius: 35 }),
    new Hole({ points: 12, pos: [205, 111], winner: false, radius: 27 }),
    new Hole({ points: 23, pos: [438, 137], winner: false }),
    new Hole({ points: 28, pos: [788, 173], winner: false }),
    new Hole({ points: 45, pos: [245, 230], winner: false }),
    new Hole({ points: 100, pos: [1283, 729], winner: true }),
    new Hole({ points: 12, pos: [60, 60], winner: false, radius: 35 }),
    new Hole({ points: 12, pos: [205, 111], winner: false, radius: 27 }),
    new Hole({ points: 23, pos: [438, 137], winner: false }),
    new Hole({ points: 28, pos: [788, 173], winner: false }),
    new Hole({ points: 45, pos: [245, 230], winner: false })
]
    
export const level3 = new Maze({ walls: level3Walls, holes: level3Holes, levelNum1: 3, levelName: "Getting Harder", startPos: [constants.GAME_DIMENSION_X - 60, 60] })
console.log(level2)

export default Maze;