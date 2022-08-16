import * as constants from "./scripts/constants"
import Marble from "./scripts/marble";
import Game from "./scripts/game";
import Hole from "./scripts/hole";


function setDPI(canvas, dpi) {
    // Set up CSS size.
    canvas.style.width = canvas.style.width || canvas.width + 'px';
    canvas.style.height = canvas.style.height || canvas.height + 'px';

    // Resize canvas and scale future draws.
    var scaleFactor = dpi / 96;
    canvas.width = Math.ceil(canvas.width * scaleFactor);
    canvas.height = Math.ceil(canvas.height * scaleFactor);
    var ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
}


addEventListener('DOMContentLoaded', (event) => {

    const canvasElement = document.getElementById("main-app");
    canvasElement.width = constants.GAME_DIMENSION_X;
    canvasElement.height = constants.GAME_DIMENSION_Y;
    setDPI(canvasElement, 192)


    const canvasCtx = canvasElement.getContext('2d');


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

    
    
    

    
    const marblio = new Game();
    const marvyn = new Marble({ pos: [constants.MAP_GRID_SIZE * 33.5, constants.MAP_GRID_SIZE * 3], radius: 15, vel: [0, 0] , game: marblio})
    const hole = new Hole({points:42 ,pos: [60, 60], game: marblio})
    marblio.marble = marvyn;
    marblio.holes.push(hole);
    marblio.addWalls();
    

    (function animloop() {
        requestAnimationFrame(animloop);
        canvasCtx.clearRect(0, 0, constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y);
        marblio.drawBackground(canvasCtx)
        hole.draw(canvasCtx, hole.pos, hole.radius, hole.points) 
        marvyn.draw(canvasCtx);
        
        marblio.drawWalls(canvasCtx)
        marvyn.drawVector(canvasCtx)
    })();


    setInterval(()=>{
        marblio.handleVector(marvyn);
        marvyn.drawVector(canvasCtx);
        marvyn.updateTexture();
        marvyn.colisionDetectedHole(marvyn.vel)
        marvyn.move(marvyn.vel);
    }, 1000 / constants.FRAME_RATE)

    

 });