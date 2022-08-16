import * as constants from "./constants" 

let MARBLE_DEFAULTS = {
    radius: 5,
    vel: [0, 0],
    texture: (canvasCtx, context) => {
        let gradient = canvasCtx.createRadialGradient(context.pos[0] - (context.radius / 2.5), context.pos[1] - (context.radius / 2.5), 5, context.pos[0], context.pos[1], (context.radius * 2));
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, 'black');
        return gradient;
    }
}


function lowPass(prev, curr, co) {
    return prev * co + curr * (1 - co);
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
        this.mousePosX = constants.GAME_DIMENSION_X / 2;
        this.mousePosY = constants.GAME_DIMENSION_Y / 2;
        // this.alpha = undefined;
        // this.beta = undefined;
        // this.gamma = undefined;
        window.addEventListener('mousemove', (event) => {
            this.mousePosX = event.clientX;
            this.mousePosY = event.clientY;
            //(((constants.GAME_DIMENSION_X / 2) + 10) - this.mousePosX)/((constants.GAME_DIMENSION_X / 2))*-10
        });
        window.addEventListener("deviceorientation",  (event) =>  {
            
            const alpha = event.alpha;
            const beta = event.beta;
            const gamma = event.gamma;
            this.alpha = lowPass(this.alpha, event.alpha, 0.8);
            this.beta = lowPass(this.beta, event.beta, 0.8);
            this.gamma = lowPass(this.gamma, event.gamma, 0.8);

            console.log("alpha:", alpha, "beta:", beta, "gamma:", gamma)
        });

    }

    updateTexture () {
        this.texture = (canvasCtx, context) => {
            let gradient = canvasCtx.createRadialGradient(
                context.pos[0] + (((constants.GAME_DIMENSION_X / 2) + 10) - this.pos[0]) / ((constants.GAME_DIMENSION_X / 2)) * (context.radius / -2),
                context.pos[1] + Math.abs((((constants.GAME_DIMENSION_X / 2) + 10) - this.pos[1]) / ((constants.GAME_DIMENSION_X / 2))) * (context.radius / -2),
                1,//context.radius/20, 
                context.pos[0], 
                context.pos[1], 
                context.radius *1.5
            );
            // gradient.addColorStop(0, 'rgba(0, 255, 0, 1)');
            // gradient.addColorStop(1, 'transparent');
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, 'black');
            return gradient;
        }
        // this.texture2 = (canvasCtx, context) => {
        //     let gradient2 = canvasCtx.createRadialGradient(
        //         context.pos[0] + (((constants.GAME_DIMENSION_X / 2) + 10) - this.pos[0]) / ((constants.GAME_DIMENSION_X / 2)) * (context.radius / 2),
        //         context.pos[1] + Math.abs((((constants.GAME_DIMENSION_X / 2) + 10) - this.pos[1]) / ((constants.GAME_DIMENSION_X / 2))) * (context.radius / -2),
        //         1,//context.radius / 20,
        //         context.pos[0],
        //         context.pos[1],
        //         context.radius * 1.5
        //     );
        //     gradient2.addColorStop(0, 'rgba(255,0, 255, 1)');
        //     gradient2.addColorStop(.5, 'transparent');
        //     return gradient2;
        // }
    }
 
    // translateScreenCoordToGameCoords (position) {
    //     console.log("position:",position) 
    //     console.log([position[0] - document.getElementById("main-app").getBoundingClientRect().left, position[1] - document.getElementById("main-app").getBoundingClientRect().top])
    //         // [
    //         //     position[0] - document.getElementById("main-app").getBoundingClientRect().left, 
    //         //     position[1] - document.getElementById("main-app").getBoundingClientRect().top
    //         // ]
    //         // )
    //     return [position[0] - document.getElementById("main-app").getBoundingClientRect().left, position[1] - document.getElementById("main-app").getBoundingClientRect().top]
    // }
    
    drawVector(ctx) {
        
        
        const relativeMousePosX = this.mousePosX - document.getElementById("main-app").getBoundingClientRect().left 
        const relativeMousePosY = this.mousePosY - document.getElementById("main-app").getBoundingClientRect().top 
        const relativeGameCenter = [constants.GAME_DIMENSION_X / 2, constants.GAME_DIMENSION_Y / 2]
        // console.log(relativeMousePosX, relativeMousePosY)
        ctx.beginPath();
        ctx.strokeStyle = "black"
        ctx.moveTo(relativeGameCenter[0], relativeGameCenter[1]);

       if (this.beta) {
           ctx.lineTo(
               relativeGameCenter[0] + (Math.max(Math.min(this.beta / 2.5, 10), -10) * 10),
               relativeGameCenter[1] + (Math.max(Math.min(this.gamma/2.5, 10), -10) * -10)
           );
       } else {
        ctx.lineTo(
            relativeGameCenter[0] + (((relativeGameCenter[0] - relativeMousePosX) / relativeGameCenter[0]) * -100),
            relativeGameCenter[1] + (((relativeGameCenter[1] - relativeMousePosY) / relativeGameCenter[1]) * -100)
        );
       }
        ctx.lineWidth = 5;

        ctx.stroke();
    }

    draw (ctx) {
        
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1]);
        let objTexture
        if (this.texture) {
            objTexture = this.texture(ctx, this);
        }
        else {
            objTexture = ctx.createRadialGradient(this.pos[0] - (this.radius / 2.5), this.pos[1] - (this.radius / 2.5), 5, this.pos[0], this.pos[1], (this.radius * 2));
            objTexture.addColorStop(0, 'white');
            objTexture.addColorStop(1, 'black');
        }
        
        
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI )
        ctx.fillStyle = "#e0e0e0"
        ctx.fill();
        ctx.fillStyle = objTexture;
        ctx.fill();
        if (this.texture2) {
            ctx.fillStyle = this.texture2(ctx, this);
            ctx.fill();
        }
    }

    move(vector) {
        while (this.colisionDetectedWall(vector)) {
            let xColision = !this.colisionDetectedWall([0, vector[1]])
            let yColision = !this.colisionDetectedWall([vector[0], 0])

            if (!xColision && !yColision) {
                if (vector[0] > 0) {
                    if (!this.colisionDetectedWall([.1 ,0])) {

                        this.pos[1] -= .1;
                        this.move(vector);

                    }
                }
                if (vector[0] < 0) {
                    if (!this.colisionDetectedWall([ -.1, 0])) {

                        this.pos[0] += .1;
                        this.move(vector);
                    }
                }
                if (vector[1] > 0) {
                    if (!this.colisionDetectedWall([ 0, -1])) {

                        this.pos[1] -= .1;
                        this.move(vector);

                    }
                }
                if (vector[1] < 0) {
                    if (!this.colisionDetectedWall([0, -.1])) {

                        this.pos[1] -= .1;
                        this.move(vector);
                    }
                }
                return undefined
            } else {

                if (xColision) {
                    while (this.colisionDetectedWall(vector)) {
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
                    while (this.colisionDetectedWall(vector)) {
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

    

    updateVectorOrientation() {

        this.vel[0] = Math.max(Math.min(this.beta/2.5, 10), -10) ;
        this.vel[1] = Math.max(Math.min(this.gamma / 2.5, 10), -10) * -1 ;
    }
    

    updateVectorMouse(){
        // if (this.mousePosX < constants.GAME_DIMENSION_X + 10 && this.mousePosY < constants.GAME_DIMENSION_Y + 10 ) {
            const horizontalCenter = screen.width / 2;
            const verticalCenter = document.getElementById("main-app").getBoundingClientRect().top + (constants.GAME_DIMENSION_Y / 2)

            this.vel[0] = ((horizontalCenter - this.mousePosX) / horizontalCenter) * -20

            this.vel[1] = ((verticalCenter - this.mousePosY) / verticalCenter) * -20
            
            
        
    }   

    willCollideWall(wall, vel) {
        let aX = this.pos[0] + vel[0];
        let aY = this.pos[1] + vel[1];
        let bX = wall.pos[0];
        let bY = wall.pos[1];
        let aWidth = this.radius * 2;
        let aHeight = this.radius * 2;
        let bWidth = wall.size;
        let bHeight = wall.size;

        
        let output = (aX < (bX + (bWidth*2))) && 
        ((aX + (aWidth/2)) > bX) && 
        (aY < (bY + (bHeight*2))) && 
        ((aY + (aHeight/2)) > bY)  ;
        
        return output; 

    }

    willCollideHole(hole, vel) {
        
        const a = ((this.pos[0] + vel[0]) - hole.pos[0]);
        const b = ((this.pos[1] + vel[1]) - hole.pos[1]);
        console.log(this.radius + (hole.radius / 1.5), Math.sqrt(a ** 2 + b ** 2), this.radius + (hole.radius / 1.5) > Math.sqrt(a ** 2 + b ** 2));
        return this.radius + (hole.radius/10) > Math.sqrt(a ** 2 + b ** 2);


        

    }

    colisionDetectedWall(vel) {
        for (let ele of this.game.walls) {
            if (this.willCollideWall(ele, vel)) {
                return true;
            }
        }
        return false
    }

    colisionDetectedHole(vel) {
        for (let ele of this.game.holes) {
            if (this.willCollideHole(ele, vel)) {
                alert("hole")
                return ele;
                
            }
        }
        return false
    }

}









export default Marble;