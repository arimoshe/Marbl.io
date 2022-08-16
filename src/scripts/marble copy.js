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

addEventListener('deviceorientation', (event) => { 

    this.alpha = event.alpha;
    this.beta = event.beta; 
    this.gamma = event.gamma

    console.log("alpha:", event.alpha, "beta:", event.beta, "gamma:", event.gamma)
})

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
        this.alpha = undefined;
        this.beta = undefined;
        this.gamma = undefined

        window.addEventListener('mousemove', (event) => {
            this.mousePosx = event.clientX;
            this.mousePosy = event.clientY;
            //(((constants.GAME_DIMENSION_X / 2) + 10) - this.mousePosx)/((constants.GAME_DIMENSION_X / 2))*-10
        });
        // this.mousePosX = 0;//constants.GAME_DIMENSION_X / 2;
        // this.mousePosY = 0;//constants.GAME_DIMENSION_Y / 2;

        
        

    }

    // captureMouse(object) { 
    //     console.log(object)
    //     if (object) {
    //         window.addEventListener('mousemove', (event) => {
    //             this.mousePosX = event.movementX;
    //             this.mousePosY = event.movementY;
    //             console.log(event.movementX, event.movementY)
    //         });
    //     }
    // }

    


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
        // console.log(objTexture);
        
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
    move() {
        
        if (this.colisionDetected(this.vel)) {
            if (!this.colisionDetected([0, this.vel[1]])) {
                this.pos[1] += this.vel[1];
            } 
            if ((!this.colisionDetected([this.vel[0], 0]))) {
                this.pos[0] += this.vel[0];
            } else { 
                this.vel[0] /= 2;
                this.vel[1] /= 2;
                this.move();
            }
        }
        else {
            this.pos[0] += this.vel[0];
            this.pos[1] += this.vel[1];
        }
    }
    
    updateVectorMouse(){

        

        // if ((this.mousePosX - document.getElementById("main-app").getBoundingClientRect().left) < constants.GAME_DIMENSION_X && (this.mousePosY - document.getElementById("main-app").getBoundingClientRect().top) < constants.GAME_DIMENSION_Y + 10 ) {
            
            console.log(this.mousePosX, this.mousePosY)
            this.vel[0] = (((constants.GAME_DIMENSION_X / 2) ) - (this.mousePosX - document.getElementById("main-app").getBoundingClientRect().left)) / ((constants.GAME_DIMENSION_X / 2)) * -10;

            this.vel[1] = (((constants.GAME_DIMENSION_Y / 2) ) - (this.mousePosY - document.getElementById("main-app").getBoundingClientRect().top)) / ((constants.GAME_DIMENSION_Y / 2)) * -10;
            
            console.log(this.vel[0], this.vel[1])
            //  console.log(this.vel)
        // }
        
    }   

    willCollide(wall, vel) {
        let aX = this.pos[0] + vel[0];
        let aY = this.pos[1] + vel[1];
        let bX = wall.pos[0];
        let bY = wall.pos[1];
        let aWidth = this.radius * 2;
        let aHeight = this.radius * 2;
        let bWidth = wall.size;
        let bHeight = wall.size;

        // let distBetween = Math.sqrt(((aX - bX) ** 2) + ((aY - bY) ** 2))

        
        // console.log(`(${aX} < (${bX} + ${bWidth})) `,
        // (aX < (bX + bWidth)), 
        // `((${aX} + ${aWidth}) > ${bX}))`, 
        // ((aX + aWidth) > bX),   
        // `(${aY} < (${bY} + ${bHeight}))`,
        // (aY < (bY + bHeight)),
        // `((${aY} + ${aHeight}) > ${bY})`,
        // ((aY + aHeight) > bY) )

        let output = (aX < (bX + (bWidth*2))) && 
        ((aX + (aWidth/2)) > bX) && 
        (aY < (bY + (bHeight*2))) && 
        ((aY + (aHeight/2)) > bY)  ;
        // let collide =
        // if (collide && Math.abs(aX-bX) < this.radius ) {
        //     output += "x"
        // }
        // if (collide && Math.abs(aY - bY) < this.radius) {
        //     output += "y"
        // }
        // if (!collide) {
        //     output = false
        // }
        return output; 

    }
    
    colisionDetected(vel) {
        for (let ele of this.game.walls) {
            if (this.willCollide(ele, vel)) {
                return true;
            }
        }
        return false
    }

}









export default Marble;