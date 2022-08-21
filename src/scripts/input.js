import * as constants from "./constants"

class Input {
    constructor(game, mousePosX, mousePosY, beta, gamma){
        this.game = game;
        this.mousePosX = mousePosX;
        this.mousePosY = mousePosY;
        this.beta = beta;
        this.gamma = gamma;
    }
    updateVectorMouse = () => {
        if (!this.beta) {
            const horizontalCenter = window.innerWidth / 2;
            const verticalCenter = constants.GAME_OFFSET_Y + ((constants.GAME_DIMENSION_Y * constants.SCALE) / 2)
            this.game.marble.vel[0] = ((horizontalCenter - this.mousePosX) / horizontalCenter) * -20

            this.game.marble.vel[1] = ((verticalCenter - this.mousePosY) / verticalCenter) * -20
        }
    }   
    
    updateVectorOrientation = () => {
        if (this.beta) {
            // alert(this.beta)
            this.vel[0] = Math.max(Math.min(this.beta / 2.5, 10), -10);
            this.vel[1] = Math.max(Math.min(this.gamma / -2.5, 10), -10);
        }
    }


}

export default Input;