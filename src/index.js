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

    
        
    
    
    
    marblio = new Game(canvasCtx); 
    document.getElementById("high-score").innerText = marblio.highScore

    document.getElementById("new-game").addEventListener("click", (event) => {
        
    marblio.beginGame();

    document.getElementById("main-app").addEventListener("click", event => {
        marblio.PAUSED = false;
    });
    document.getElementById("modal-button").addEventListener("click", event => {
        document.getElementById("modal").style.display = "none"
    })


    })



 });



