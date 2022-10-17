import * as constants from "./constants"
import * as utils from "./utils"
import Marble from "./marble";
import Wall from "./wall";
import Maze from "./maze";
import * as mazes from "./maze";
import * as index from "../index";
import * as texture from "./texture"
import * as collision from "./collision" 
import * as draw from "./draw"
import Input from "./input";



export const displayCanvases = (canvasArr) =>{
    Array.from(canvasArr).forEach(ele => ele.style.display = "inherit")
}
export const hideCanvases = (canvasArr)=> {
    Array.from(canvasArr).forEach(ele => ele.style.display = "none")
}



class Game {
    constructor() {
        this.levels = { 1: mazes.level1, 2: mazes.level2, 3: mazes.level3, 4: mazes.level4, 5: mazes.level5}
        this.currentLevel = 1;
        this.lives = 3;
        this.PAUSED = true;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.highScore = 0;
        this.contexts = document.getElementsByTagName("canvas")
        this.controls = "mouse"
        this.marble = new Marble({ pos: [...this.levels[this.currentLevel].startPos], radius: 15, vel: [0, 0], game: this });
        this.input = new Input(this,0,0,0,0);
        this.gameInterval = null;
        window.addEventListener('mousemove', (event) => {
            this.input.mousePosX = event.clientX;
            this.input.mousePosY = event.clientY;
        });
        
        
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
    
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    if (response === "granted") {
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                    else {
                        alert("Device Orientation permission request was denied. Please allow to play on a mobile device.")
                    }
                })
                .catch(console.error);
        }
        else {
            window.addEventListener('deviceorientation', (event) => {

                // console.log(event)
                this.controls = "orientation"
                this.input.alpha = event.alpha
                this.input.beta = event.beta;
                this.input.gamma = event.gamma;

            });
        }
        


    }

    gameActions = () => {
        
        if (!this.PAUSED) {
    
            document.getElementById("main-app").removeEventListener("click", this.handleClick);
            this.handleInput();
            this.handleHoleHit();
            this.marble.move(this.marble.vel);
            
        }
    }

    checkScreenOrientation = () => {
        if (screen.orientation) {
            switch (screen.orientation) {
                case "landscape-primary":
                    
                    break;
                case "landscape-secondary":
                    this.popModal("Please rotate your phone 180 degrees.")
                    break;
                case "portrait-secondary":

                    break
                case "portrait-primary":
                    
                    break;
                default:
                    console.log("The orientation API isn't supported in this browser :(");
            }
        } else {
            switch (window.orientation) {
                
                case 90:
                    
                    break;
                case -90:
                    this.popModal("Please rotate your phone 180 degrees.")
                    break;
                case 180:
                    break
                case 0 :
                    
                    break;
            }
        }
    }

    beginGame() {

        this.checkScreenOrientation()
        let splash = document.getElementById("splash-container")
        splash.style.display = "none";
        
        displayCanvases(document.getElementsByTagName("canvas"))
        draw.drawBackground(this.contexts['background'].getContext('2d'));
        draw.drawName(this.contexts["background"].getContext('2d'));

        const animate = () => {
    
            this.drawGame()
            
            requestAnimationFrame(animate);
        };
        
        if (!this.gameInterval) {
            animate();
            this.gameInterval = setInterval(() =>{
                
                this.gameActions()
                
            }, 1000 / constants.FRAME_RATE);
        }
        this.pauseAndStartButton();
        
    };


    drawGame() {
        if (!this.PAUSED) {
            
            this.contexts['main-app'].getContext('2d').clearRect(0,0, constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y)
            draw.drawVector(this.contexts['main-app'].getContext('2d'), this);
            draw.drawMarble(this.contexts['main-app'].getContext('2d'), this.marble);
            draw.updateBoardRotataion(this.marble)
            

        }
    }

    handleInput (){
        if (this.controls === "orientation") {
            this.input.updateVectorOrientation()    
        } else {
            this.input.updateVectorMouse()
        } 
        // this.input.updateVectorOrientation() 

    }

    handleClick (event) {
        // alert((Math.abs(window.innerWidth/ 2) - event.clientX ))
        if ((Math.abs((window.innerWidth / 2) - event.clientX - 16) < 113) && (Math.abs((window.innerHeight / 2) - event.clientY - 16) < 55))
        this.PAUSED = false;
    }


    handleHoleHit(){
        let hole = collision.collideAnyHole(this)
        if (hole) {
            this.marble.hasCollided = true;
            // this.marble.pos = [this.marble.pos[0] + this.marble.vel[0], this.marble.pos[1] + this.marble.vel[1]] 
            this.marble.vel=[0,0]
            for(let p = 1; p<=14; p++) {
                setTimeout(() => {
                    
                    if (this.marble.radius > 0) {this.marble.radius--;}
                    let xDif = hole.pos[0] - this.marble.pos[0];
                    let yDif = hole.pos[1] - this.marble.pos[1];
                    this.marble.pos = [this.marble.pos[0] + (xDif / 6), this.marble.pos[1] + (yDif / 6)]
                }, (1000 / constants.FRAME_RATE)*p)
            }
            setTimeout(() => {
                
                if (hole.special) {
                    hole.special(this);
                }
                else {
                    
                    if (hole && hole.winner) {
                        this.marble.radius = 15;
                        this.earnedPoints += hole.points;
                        this.currentLevel += 1;
                        this.currentLevelScore = 0;
                        this.handleNextLevel()

                    }
                    else if (hole && !hole.winner) {
                        if (this.lives === 1) {
                            this.lives -= 1;
                            this.marble.radius = 15;
                            this.handleLoss();

                        } else {

                            this.marble.pos = [...this.levels[this.currentLevel].startPos]
                            this.marble.radius = 15;
                            this.popModal("Sorry, You didn't quite make it!")
                            if (hole.points > this.currentLevelScore) { this.currentLevelScore = hole.points; }
                            this.lives -= 1;
                            this.pauseAndStartButton();
                        }
                    }
                }
            }, (1000 / constants.FRAME_RATE) * 15 )
        }
       
    
    }

    popModal(text, width = "40vw", height = "30vh" ) {
        let modal = document.getElementById("modal");
        modal.style.width = width;
        modal.style.height = height;
        let modalText = document.querySelector("#modal p");
        modalText.innerHTML = text 
        document.getElementById("modal-container").style.display = "flex"
        modal.style.display = "flex"
    }

    pauseAndStartButton(){
        this.checkScreenOrientation()
        this.marble.radius = 15;
        this.marble.vel = [0,0];
        this.marble.hasCollided = false
        draw.updateBoardRotataion(this.marble);
        this.PAUSED = true;
        this.contexts['ui'].getContext('2d').clearRect(-1000, -1000, 4000, 4000)
        this.contexts['map'].getContext('2d').clearRect(-1000, -1000, 4000, 4000)
        this.contexts['main-app'].getContext('2d').clearRect(-1000, -1000, 4000, 4000)
        
        draw.drawLevelWalls(this.contexts['map'].getContext('2d'), this, this.currentLevel);
        draw.drawLevelHoles(this.contexts['map'].getContext('2d'), this, this.currentLevel);
        draw.drawMarble(this.contexts['main-app'].getContext('2d'), this.marble);
        draw.drawScore(this.contexts['ui'].getContext('2d'), this);
        draw.drawLives(this.contexts['ui'].getContext('2d'), this);
        
        
        
        draw.drawButton(
            this.contexts['main-app'].getContext('2d'), 
            [(constants.GAME_DIMENSION_X / 2), 
            (constants.GAME_DIMENSION_Y / 2)], 
            225, 
            110, 
            20, 
            "Start",
            "grey", 
            "#e0e0e0", 
            "38px", 
            "Silkscreen"
        )
        document.getElementById("main-app").addEventListener("click", this.handleClick.bind(this));
    }

    

    

    

    handleLoss(){
            this.earnedPoints += this.currentLevelScore;
            this.popModal(`Game Over \n You Scored ${this.earnedPoints} Points`)
            if (this.earnedPoints > this.highScore) {
                this.highScore = this.earnedPoints
            }
            this.resetGame()
    }
    
    handleNextLevel(){
        if (this.currentLevel < 6) {
            this.popModal("Nice Job!");
            this.marble.pos = [...this.levels[this.currentLevel].startPos];
            this.pauseAndStartButton();
        } else {
            
            this.highScore = this.earnedPoints;
            document.getElementById("high-score").innerText = this.highScore
            this.popModal("YOU WIN! (This Demo)\n Thanks for playing!")
            this.resetGame();
        }
    }

    resetGame(){ 
        document.getElementById("high-score").innerText = this.highScore

        let splash = document.getElementById("splash-container")
        splash.style.display = "inherit";
        hideCanvases(document.getElementsByTagName("canvas"));
        this.lives = 3;
        this.earnedPoints = 0;
        this.currentLevelScore = 0;
        this.currentLevel = 1;
        this.marble.pos = [...this.levels[this.currentLevel].startPos]
        this.contexts['ui'].getContext('2d').clearRect(-1000, -1000, 4000, 4000)
        this.contexts['map'].getContext('2d').clearRect(-1000, -1000, 4000, 4000)
        this.contexts['main-app'].getContext('2d').clearRect(-1000, -1000, 4000, 4000)
        this.pauseAndStartButton();
    }
    

    

}








// if (!constants.PAUSED) {



export default Game;