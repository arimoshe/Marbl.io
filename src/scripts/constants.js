export const FRAME_RATE =60;
export const MAP_GRID_X = 84;
export const MAP_GRID_Y = 49;
export const MAP_GRID_SIZE = 16;
export const GAME_DIMENSION_X = MAP_GRID_X * MAP_GRID_SIZE;
console.log(GAME_DIMENSION_X);
export const GAME_DIMENSION_Y = MAP_GRID_Y * MAP_GRID_SIZE;
console.log(GAME_DIMENSION_Y);
export let GAME_REL_CENTER_X = undefined
export let GAME_REL_CENTER_Y = undefined

export let WINDOW_CENTER_X = screen.width / 2;
export let WINDOW_CENTER_Y = screen.height / 2;


export let WINDOW_REL_CENTER_GAME_X = undefined;

addEventListener('DOMContentLoaded', (event) => {

    GAME_REL_CENTER_X = document.getElementById("main-app").width /2
    GAME_REL_CENTER_Y = document.getElementById("main-app").width / 2
});

// window.addEventListener('resize', (event) => { 
//    updateVectorOrientation()  WINDOW_CENTER_X 
// })