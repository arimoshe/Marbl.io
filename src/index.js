import * as constants from "./scripts/constants"
import Marble from "./scripts/marble";
import Game from "./scripts/game";





addEventListener('DOMContentLoaded', (event) => {

    const canvasElement = document.getElementById("main-app");
    canvasElement.width = constants.GAME_DIMENSION_X;
    canvasElement.height = constants.GAME_DIMENSION_Y;
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
    marblio.marble = marvyn;
    marblio.addWalls();
    

    (function animloop() {
        requestAnimationFrame(animloop);
        canvasCtx.clearRect(0, 0, constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y);
        marblio.drawBackground(canvasCtx)
        marvyn.draw(canvasCtx);
        marblio.drawWalls(canvasCtx)
        marvyn.drawVector(canvasCtx)
    })();


    setInterval(()=>{
        marblio.handleVector(marvyn);
        marvyn.updateTexture();
        marvyn.move(marvyn.vel);
    }, 1000 / constants.FRAME_RATE)

    

 });