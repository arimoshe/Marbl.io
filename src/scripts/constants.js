import * as index from "../index"
import Hole from "./hole";
import * as draw from './draw'





export const FRAME_RATE = 60;
export let SCALE = window.innerHeight/1080*.9;
export const DPI = 192;
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
    // console.log(index.canvasCtx)
    if (document.readyState !== "loading") { 
        SCALE = window.innerHeight / 1080 * .9;
        GAME_OFFSET_X = ((window.innerWidth - (GAME_DIMENSION_X * SCALE)) / 2);
        GAME_OFFSET_Y = (((window.innerHeight - (GAME_DIMENSION_Y * SCALE)) / 2));
        Array.from(document.getElementsByTagName("canvas")).forEach(canvas => {
            let context = canvas.getContext('2d');
            context.restore();
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.width = window.innerWidth + "px"
            canvas.style.height = window.innerHeight + "px"
            index.setDPI(canvas, DPI)
            context.translate(GAME_OFFSET_X, GAME_OFFSET_Y);
            context.scale(SCALE, SCALE);
        })
        const contexts = document.getElementsByTagName("canvas");
        draw.drawBackground(contexts['background'].getContext('2d'));
        draw.drawName(contexts["background"].getContext('2d'));
        draw.drawLevelWalls(contexts['map'].getContext('2d'), index.marblio, index.marblio.currentLevel);
        draw.drawLevelHoles(contexts['map'].getContext('2d'), index.marblio, index.marblio.currentLevel);
        draw.drawMarble(contexts['main-app'].getContext('2d'), index.marblio.marble);
        draw.drawScore(contexts['ui'].getContext('2d'), index.marblio);
        draw.drawLives(contexts['ui'].getContext('2d'), index.marblio);
        if (index.marblio.PAUSED) {
            draw.drawButton(
                contexts['main-app'].getContext('2d'),
                [(GAME_DIMENSION_X / 2),
                (GAME_DIMENSION_Y / 2)],
                225,
                110,
                20,
                "Start",
                "grey",
                "#e0e0e0",
                "38px",
                "Silkscreen"
            )
        }
    }
    
})
