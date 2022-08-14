const { FRAME_RATE, GAME_DIMENTION_X, GAME_DIMENTION_Y } = require('./scripts/constants');
import Marble from "./scripts/marble";
import Game from "./scripts/game";





addEventListener('DOMContentLoaded', (event) => {

    const canvasElement = document.getElementById("main-app");
    canvasElement.width = GAME_DIMENTION_X;
    canvasElement.height = GAME_DIMENTION_Y;
    const canvasCtx = canvasElement.getContext('2d')
    
    
    const marblio = new Game();
    const marvin = new Marble({ pos: [600, 300], radius: 15, vel: [0, 0] , game: marblio})
    marblio.marble = marvin;
    marblio.addWalls();
    


    // requestAnimationFrame(run);
    
    // run = () => {
    //     canvasCtx.clearRect(0, 0, GAME_DIMENTION_X, GAME_DIMENTION_Y);
    //     marvin.updateVectorMouse();
    //     marvin.move();
    //     marvin.draw(canvasCtx);
    //     marblio.drawWalls(canvasCtx)
    //     requestAnimationFrame(run)
    // }

    (function animloop() {
        requestAnimationFrame(animloop);
        canvasCtx.clearRect(0, 0, GAME_DIMENTION_X, GAME_DIMENTION_Y);
        marvin.updateVectorMouse();
        marvin.move();
        marvin.draw(canvasCtx);
        marblio.drawWalls(canvasCtx)
    })();


    // setInterval(()=>{
    //     canvasCtx.clearRect(0, 0, GAME_DIMENTION_X, GAME_DIMENTION_Y);
    //     marvin.updateVectorMouse();
    //     marvin.move();
    //     marvin.draw(canvasCtx);
    //     marblio.drawWalls(canvasCtx)
    // }, 1000 / FRAME_RATE)

        // (function animloop() {
        //     requestAnimFrame(animloop);
        //     render();
        // })();

 });