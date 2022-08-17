import * as constants from "./constants"

export function translatePos(pos) {
    return [
        ((screen.width / 2) - (constants.GAME_DIMENSION_X / 2)) + pos[0],
        ((screen.height / 2) - (constants.GAME_DIMENSION_Y / 2)) + pos[1]
    ];
}



export function translatePosX(pos) {
    return pos + ((screen.width / 2) - (constants.GAME_DIMENSION_X / 2));
}

export function translatePosY(pos) {
    return pos + ((screen.height / 2) - (constants.GAME_DIMENSION_Y / 2));
}