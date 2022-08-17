import * as constants from "./scripts/constants"
import * as utils from "./scripts/utils"
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
    canvasElement.width = window.innerWidth //1920; //constants.GAME_DIMENSION_X;
    canvasElement.height = window.innerHeight //1080//constants.GAME_DIMENSION_Y;
    setDPI(canvasElement, constants.DPI)

    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.translate(constants.GAME_OFFSET_X, constants.GAME_OFFSET_Y)
    
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

    const marblio = new Game();
    const marvyn = new Marble({ pos: [constants.MAP_GRID_SIZE * 33.5, constants.MAP_GRID_SIZE * 3], radius: 15, vel: [0, 0] , game: marblio})
    const hole = new Hole({points:42 ,pos: [60, 60], game: marblio, winner: false})
    marblio.marble = marvyn;
    marblio.holes.push(hole);
    marblio.addWalls();

    const pauseActions = () => {
        
        canvasCtx.filter = "blur(20px)"
        let imgData = canvasCtx.getImageData(0, 0, window.innerWidth * (constants.DPI / 96), window.innerHeight * (constants.DPI / 96));
        createImageBitmap(imgData)
        .then( result => { 
            canvasCtx.drawImage(result, -constants.GAME_OFFSET_X, -constants.GAME_OFFSET_Y, window.innerWidth, window.innerHeight); 
            canvasCtx.filter = "none"
            canvasCtx.beginPath();
            canvasCtx.font = "100px sans-serif";
            canvasCtx.fillStyle = "#999999";
            canvasCtx.textAlign = "center"
            canvasCtx.fillText("PAUSED", constants.GAME_DIMENSION_X / 2, constants.GAME_DIMENSION_Y / 2);   
        })
        
    };

    const drawActions = () => {
        // console.log("drawloop");
        canvasCtx.clearRect(0, 0, screen.width, screen.height);
        marblio.drawBackground(canvasCtx)
        hole.draw(canvasCtx, hole.pos, hole.radius, hole.points)
        marvyn.draw(canvasCtx);
        marblio.drawScore(canvasCtx);
        marblio.drawLives(canvasCtx);
        marblio.drawName(canvasCtx);
        marblio.drawWalls(canvasCtx);
        marvyn.drawVector(canvasCtx);
    }

    const gameActions = () => {
        marblio.handleVector(marvyn);
        marvyn.updateTexture();
        marblio.handleHoleHit()
        marvyn.move(marvyn.vel);
    }
    
    function animate() {  
       
        if (!constants.PAUSED) {
            drawActions()
            requestAnimationFrame(animate);
            ;
        }
    };
    animate()

    
    let gameInterval ;
    // if (!constants.PAUSED) {
        gameInterval = setInterval(gameActions, 1000 / constants.FRAME_RATE);
    // }
  
    
    window.addEventListener("pauseToggle", (e) => {
        if (constants.PAUSED) {

            pauseActions();
            clearInterval(gameInterval);

        } else {
            console.log("bad bunny")
            animate();
            clearInterval(gameInterval)
            gameInterval = setInterval(gameActions, 1000 / constants.FRAME_RATE)
        }
    })

 });