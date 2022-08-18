import * as ctx from "../index"
import Hole from "./hole";

export let PAUSED = false
export const FRAME_RATE = 60;
export let SCALE = window.innerHeight/1080*.9;
export const DPI = 96;
export const MAP_GRID_X = 84;
export const MAP_GRID_Y = 49;
export const MAP_GRID_SIZE = 16;
export const GAME_DIMENSION_X = MAP_GRID_X * MAP_GRID_SIZE;
console.log(GAME_DIMENSION_X);
export const GAME_DIMENSION_Y = MAP_GRID_Y * MAP_GRID_SIZE;
console.log(GAME_DIMENSION_Y);
export let GAME_OFFSET_X = ((window.innerWidth - (GAME_DIMENSION_X * SCALE)) / 2) 
export let GAME_OFFSET_Y = (((window.innerHeight - (GAME_DIMENSION_Y * SCALE)) /2))
export let GAME_REL_CENTER_X = undefined
export let GAME_REL_CENTER_Y = undefined

export let WINDOW_CENTER_X = window.innerWidth / 2;
export let WINDOW_CENTER_Y = window.innerHeight / 2;


export let WINDOW_REL_CENTER_GAME_X = undefined;

addEventListener('DOMContentLoaded', (event) => {

    GAME_REL_CENTER_X = document.getElementById("main-app").width /2
    GAME_REL_CENTER_Y = document.getElementById("main-app").width /2
});
const pauseEvent = new Event('pauseToggle'); 


window.addEventListener("blur", (event) => {
    let tempPause = PAUSED;
    PAUSED = true;
    if (!tempPause) { window.dispatchEvent(pauseEvent); }
})

window.addEventListener("focus", (event) => {
    let tempPause = PAUSED
    PAUSED = false;
    if (tempPause) { window.dispatchEvent(pauseEvent); }
})
document.addEventListener("mouseleave", (event) => {
    if (event.clientY <= 1 || event.clientX <= 1 || (event.clientX >= window.innerWidth-1 || event.clientY >= window.innerHeight-1)) {
        let tempPause = PAUSED;
        PAUSED = true;
        if (!tempPause) { window.dispatchEvent(pauseEvent); }
    }
});
// document.addEventListener("mouseenter", (event) => {
//     PAUSED = false;
//     window.dispatchEvent(pauseEvent);
// });

document.addEventListener("click", event => {
    let tempPause = PAUSED
    PAUSED = false; 
    if (tempPause) {window.dispatchEvent(pauseEvent);}
    console.log(`new Hole([${Math.floor((event.clientX - GAME_OFFSET_X - 10) * (1 / SCALE))}, ${Math.floor((event.clientY - GAME_OFFSET_Y - 10) * (1 / SCALE))}], winner: false },`)
    ctx.marblio.levels[ctx.marblio.levelReached].holes.push(new Hole({ points: 0, pos: [(event.clientX - GAME_OFFSET_X - 10) * (1 / SCALE), (event.clientY - GAME_OFFSET_Y - 10) * (1 / SCALE)], winner: false }))
    
});


// window.addEventListener('resize', (event) => {

//     SCALE = window.innerHeight / 1080 * .9;
//     console.log(ctx.canvasCtx)
//     ctx.canvasCtx.scale(SCALE, SCALE)
//     console.log(ctx.canvasCtx)
//     GAME_OFFSET_X = ((window.innerWidth - (GAME_DIMENSION_X * SCALE)) / 2);
//     GAME_OFFSET_Y = (((window.innerHeight - (GAME_DIMENSION_Y * SCALE)) / 2));
// })
