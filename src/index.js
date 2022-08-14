const { FRAME_RATE, GAME_DIMENSION_X, GAME_DIMENSION_Y } = require('./scripts/constants');
import Marble from "./scripts/marble";
import Game from "./scripts/game";





addEventListener('DOMContentLoaded', (event) => {

    const canvasElement = document.getElementById("main-app");
    canvasElement.width = GAME_DIMENSION_X;
    canvasElement.height = GAME_DIMENSION_Y;
    const canvasCtx = canvasElement.getContext('2d')
    
    
    const marblio = new Game();
    const marvyn = new Marble({ pos: [600, 300], radius: 15, vel: [0, 0] , game: marblio})
    marblio.marble = marvyn;
    marblio.addWalls();
    

    (function animloop() {
        requestAnimationFrame(animloop);
        canvasCtx.clearRect(0, 0, GAME_DIMENSION_X, GAME_DIMENSION_Y);
        marvyn.draw(canvasCtx);
        marblio.drawWalls(canvasCtx)
    })();


    setInterval(()=>{
        marvyn.updateVectorMouse();
        marvyn.move();
    }, 1000 / FRAME_RATE)

        // (function animloop() {
        //     requestAnimFrame(animloop);
        //     render();
        // })();

 });