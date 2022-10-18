export const willCollideWall = (marble, wall, vel)  => {
    let aX = marble.pos[0] + vel[0];
    let aY = marble.pos[1] + vel[1];
    let bX = wall.pos[0];
    let bY = wall.pos[1];
    let aWidth = marble.radius * 2;
    let aHeight = marble.radius * 2;
    let bWidth = wall.size;
    let bHeight = wall.size;


    return (aX < (bX + (bWidth * 2))) &&
        ((aX + (aWidth / 2)) > bX) &&
        (aY < (bY + (bHeight * 2))) &&
        ((aY + (aHeight / 2)) > bY);

    

}

export const hasCollidedHole = (marble, hole) => {
    const a = (marble.pos[0] - hole.pos[0]);
    const b = (marble.pos[1] - hole.pos[1]);

    return hole.radius > Math.sqrt(a ** 2 + b ** 2);
}


export const collideAnyWall = (game, vel) => {
    for (let ele of game.levels[game.currentLevel].walls) {
        if (willCollideWall(game.marble, ele, vel)) {
            return true;
        }
    }
    return false
}

export const collideAnyHole = (game) => {
    for (let ele of game.levels[game.currentLevel].holes) {
        if (hasCollidedHole(game.marble, ele) && !(game.marble.vel[0] === 0 && game.marble.vel[1] === 0)) {
            return ele;
        }
    }
    return false
}

