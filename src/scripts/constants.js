import * as index from "../index"
import Hole from "./hole";

// export let PAUSED = false






export const FRAME_RATE = 60;
export let SCALE = window.innerHeight/1080*.9;
export const DPI = 96;
export const MAP_GRID_X = 84;
export const MAP_GRID_Y = 49;
export const MAP_GRID_SIZE = 16;
export const GAME_DIMENSION_X = MAP_GRID_X * MAP_GRID_SIZE;

export const GAME_DIMENSION_Y = MAP_GRID_Y * MAP_GRID_SIZE;

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
// const pauseEvent = new Event('pauseToggle'); 


// window.addEventListener("blur", (event) => {
//     let tempPause = PAUSED;
//     PAUSED = true;
//     if (!tempPause) { window.dispatchEvent(pauseEvent); }
// })

// window.addEventListener("focus", (event) => {
//     let tempPause = PAUSED
//     PAUSED = false;
//     if (tempPause) { window.dispatchEvent(pauseEvent); }
// })
// document.addEventListener("mouseleave", (event) => {
//     if (event.clientY <= 1 || event.clientX <= 1 || (event.clientX >= window.innerWidth-1 || event.clientY >= window.innerHeight-1)) {
//         let tempPause = PAUSED;
//         PAUSED = true;
//         if (!tempPause) { window.dispatchEvent(pauseEvent); }
//     }
// });
// document.addEventListener("mouseenter", (event) => {
//     PAUSED = false;
//     window.dispatchEvent(pauseEvent);
// });




window.addEventListener('resize', (event) => {
    index.canvasCtx.restore();
    index.canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    index.canvasElement.width = window.innerWidth ;
    index.canvasElement.height = window.innerHeight ;
    index.canvasElement.style.width = window.innerWidth+ "px"
    index.canvasElement.style.height = window.innerHeight + "px"
    index.setDPI(index.canvasElement, DPI)
    SCALE = window.innerHeight / 1080 * .9;
    GAME_OFFSET_X = ((window.innerWidth - (GAME_DIMENSION_X * SCALE)) / 2);
    GAME_OFFSET_Y = (((window.innerHeight - (GAME_DIMENSION_Y * SCALE)) / 2));
    index.canvasCtx.translate(GAME_OFFSET_X, GAME_OFFSET_Y);
    index.canvasCtx.scale(SCALE, SCALE);
    console.log(index.canvasElement.width, index.canvasElement.height, SCALE, GAME_OFFSET_X, GAME_OFFSET_Y)
    
})
