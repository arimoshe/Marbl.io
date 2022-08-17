
class Maze {
    constructor(optionsHash ) {
        this.levelNum = optionsHash.levelName
        this.levelName = optionsHash.levelName
        this.startPoint = optionsHash.startPoint
        this.walls = [];
        this.holes = [];
    }
}

let boundryWalls = [];


for (let i = 0; i < constants.MAP_GRID_Y; i++) {
    let wallTop = new Wall({ pos: utils.translatePos([0, constants.MAP_GRID_SIZE * i]) });
    boundryWalls.push(wallTop);
    // console.log(utils.translatePos([0, constants.MAP_GRID_SIZE * i]))
}
for (let j = 1; j < constants.MAP_GRID_X; j++) {
    boundryWalls.push(new Wall({ pos: utils.translatePos([constants.MAP_GRID_SIZE * j, 0]) }))
}
for (let k = 0; k < constants.MAP_GRID_X; k++) {
    boundryWalls.push(new Wall({ pos: utils.translatePos([k * constants.MAP_GRID_SIZE, constants.GAME_DIMENSION_Y - constants.MAP_GRID_SIZE] )}))
}
for (let l = 0; l < constants.MAP_GRID_Y; l++) {
    boundryWalls.push(new Wall({ pos: utils.translatePos([constants.GAME_DIMENSION_X - constants.MAP_GRID_SIZE, l * constants.MAP_GRID_SIZE]) }))
}
for (let m = 1; m <= 7; m++) {
    if (m % 2 === 0) {
        for (let n = 0; n <= constants.MAP_GRID_X-15; n++) {
            boundryWalls.push(new Wall({ pos: utils.translatePos([n *constants.MAP_GRID_SIZE , m * constants.MAP_GRID_SIZE * 6])}))
        }
    } else {
        for (let n = 15; n < constants.MAP_GRID_X; n++) {
            boundryWalls.push(new Wall({ pos: utils.translatePos([n * constants.MAP_GRID_SIZE, m * constants.MAP_GRID_SIZE * 6]) }))
        }
    }
}


console.log(12312)

level1Walls = [].concat(boundryWalls)
console.log(level1Walls);


level1 = new Ma