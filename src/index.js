import * as constants from "./scripts/constants"
import Marble from "./scripts/marble";
import Game from "./scripts/game";
import * as vars from "./scripts/game"
import Hole from "./scripts/hole";


export function setDPI(canvas, dpi) {
    // Set up CSS size.
    canvas.style.width = canvas.style.width || canvas.width + 'px';
    canvas.style.height = canvas.style.height || canvas.height + 'px';

    // Resize canvas and scale future draws.

    var scaleFactor = dpi / 96;
    if (Math.ceil(canvas.width * scaleFactor) / Math.min(Math.ceil(canvas.width * scaleFactor), 3840) !== 1) {
        scaleFactor = canvas.width/3840
    }

    canvas.width = Math.ceil(canvas.width * scaleFactor);
    canvas.height = Math.ceil(canvas.height * scaleFactor);
    var ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
}
export let canvasCtx;
export let canvasCtxUI;
export let marblio;
export let canvasElement;
export let canvasElementUI;
export let drawActions;

addEventListener('DOMContentLoaded', (event) => {

    Array.from(document.getElementsByTagName("canvas")).forEach(canvas =>{
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        setDPI(canvas, constants.DPI)

    })

    Array.from(document.getElementsByTagName("canvas")).forEach(canvas => {
        let context = canvas.getContext('2d');
        context.save();
        context.translate(constants.GAME_OFFSET_X, constants.GAME_OFFSET_Y);
        context.scale(constants.SCALE, constants.SCALE);
    })

    
        
    
    
    // canvasCtxUI = canvasElementUI.getContext('2d');
    // canvasCtxUI.translate(constants.GAME_OFFSET_X, constants.GAME_OFFSET_Y)
    // canvasCtxUI.scale(constants.SCALE, constants.SCALE)

    // if (screen.width<1000) {
    //     canvasCtx.translate(300,160)
    // canvasCtx.scale(.45,.45);
    // }
    
    // function openFullscreen() {
    //     if (canvasElement.requestFullscreen) {
    //         canvasElement.requestFullscreen();
    //     } else if (canvasElement.webkitRequestFullscreen) { /* Safari */
    //         canvasElement.webkitRequestFullscreen();
    //     } else if (canvasElement.msRequestFullscreen) { /* IE11 */
    //         canvasElement.msRequestFullscreen();
    //     }
    // }
    // document.getElementById("fullscreen").addEventListener("click", function () {
    //     openFullscreen();
    //     canvasElement.requestPointerLock();
    // });
    marblio = new Game(canvasCtx); 
    document.getElementById("high-score").innerText = marblio.highScore

    document.getElementById("new-game").addEventListener("click", (event) => {
        
    marblio.beginGame();

    document.getElementById("main-app").addEventListener("click", event => {
        marblio.PAUSED = false;
        // console.log(`new Hole({points: 0, pos:[${Math.floor((event.clientX - GAME_OFFSET_X) * (1 / SCALE) - 10)}, ${Math.floor((event.clientY - GAME_OFFSET_Y) * (1 / SCALE) + 5)}], winner: false }),`)
        // ctx.marblio.levels[ctx.marblio.currentLevel].holes.push(new Hole({ points: 0, pos: [(event.clientX - GAME_OFFSET_X) * (1 / SCALE) - 10, (event.clientY - GAME_OFFSET_Y) * (1 / SCALE) + 5], winner: false }))
    });
    document.getElementById("modal-button").addEventListener("click", event => {
        document.getElementById("modal").style.display = "none"
    })


    })



 });



