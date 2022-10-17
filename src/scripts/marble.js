import * as constants from "./constants"
import * as collision from "./collision"

console.log()
let MARBLE_DEFAULTS = {
    radius: 5,
    vel: [0, 0],
    texture: (ctx, marble) => {
        let gradient = ctx.createRadialGradient(marble.pos[0] + (((constants.GAME_DIMENSION_X / 2) + 10) - marble.pos[0]) / ((constants.GAME_DIMENSION_X / 2)) * (marble.radius / -2),
            marble.pos[1] + Math.abs((((constants.GAME_DIMENSION_X / 2) + 10) - marble.pos[1]) / ((constants.GAME_DIMENSION_X / 2))) * (marble.radius / -2),
            1,
            marble.pos[0],
            marble.pos[1],
            marble.radius < 0 ? 0 : marble.radius * 1.5
        );
        gradient.addColorStop(0, 'cornflowerblue');
        gradient.addColorStop(1, 'blue');
        return gradient;
    }

}




class Marble {
    constructor(optionsHash) {
        this.game = optionsHash.game;
        optionsHash.radius ||= MARBLE_DEFAULTS.radius
        this.radius = optionsHash.radius;
        this.pos = optionsHash.pos;
        this.vel = optionsHash.vel;
        optionsHash.texture ||= MARBLE_DEFAULTS.texture;
        this.texture = optionsHash.texture;
        optionsHash.texture ||= MARBLE_DEFAULTS.texture2;
        this.texture2 = optionsHash.texture2;
        this.hasCollided = false;
        

    }
   

    move(vector) {

        while (collision.collideAnyWall(this.game, vector) && !this.hasCollied) {
            let xColision = !collision.collideAnyWall(this.game, [0, vector[1]])
            let yColision = !collision.collideAnyWall(this.game, [vector[0], 0])

            if (!xColision && !yColision) {
                if (vector[0] > 0) {
                    if (!collision.collideAnyWall(this.game, [.1 ,0])) {

                        this.pos[1] -= .1;
                        this.move(vector);

                    }
                }
                if (vector[0] < 0) {
                    if (!collision.collideAnyWall(this.game, [ -.1, 0])) {

                        this.pos[0] += .1;
                        this.move(vector);
                    }
                }
                if (vector[1] > 0) {
                    if (!collision.collideAnyWall(this.game, [ 0, -1])) {

                        this.pos[1] -= .1;
                        this.move(vector);

                    }
                }
                if (vector[1] < 0) {
                    if (!collision.collideAnyWall(this.game, [0, -.1])) {

                        this.pos[1] -= .1;
                        this.move(vector);
                    }
                }
                return undefined
            } else {

                if (xColision) {
                    while (collision.collideAnyWall(this.game, vector)) {
                        if (vector[0] > .1) {
                            vector[0] -= .1
                        } else if (vector[0] < -.1) {
                            vector[0] += .1
                        } else {
                            vector[0] = 0
                        }
                    }
                }
                if (yColision) {
                    while (collision.collideAnyWall(this.game, vector)) {
                        if (vector[1] > .1) {
                            vector[1] -= .1
                        } else if (vector[1] < -.1) {
                            vector[1] += .1
                        } else {
                            vector[1] = 0
                        }
                    }
                }
            }

        }
        this.pos[0] += vector[0];
        this.pos[1] += vector[1];
    }
    
    

}









export default Marble;