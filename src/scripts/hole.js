import * as utils from "./utils"

let HOLE_DEFAULTS = {
    radius: 20, 
    winner: false,
    draw: (ctx,pos, radius, points) => {
        ctx.beginPath();
        ctx.moveTo(pos[0], pos[1]);
        ctx.arc(pos[0], pos[1], radius-4, 0, 2 * Math.PI);
        let strokeGradient = ctx.createLinearGradient(pos[0], pos[1] - radius, pos[0], pos[1] + radius) ;
        strokeGradient.addColorStop(0, '#c0c0c0');
        strokeGradient.addColorStop(1, 'white');
        ctx.strokeStyle = strokeGradient;
        ctx.lineWidth = radius/2;
        ctx.stroke();
        let fillGradient = ctx.createRadialGradient(pos[0], pos[1], radius*2, pos[0], pos[1] + radius, 0);
        fillGradient.addColorStop(0, '#000000');
        // fillGradient.addColorStop(1, '#66bbFF');
        fillGradient.addColorStop(1, '#dddddd');
        ctx.fillStyle = fillGradient;
        ctx.fill();
        ctx.font = "16px Silkscreen";
        ctx.textAlign = "center"
        ctx.fillText(points, pos[0], pos[1] + (radius * 2.2))
    }
}

class Hole {
    constructor(optionsHash) {
        this.points = optionsHash.points
        this.game = optionsHash.game;
        optionsHash.radius ||= HOLE_DEFAULTS.radius;
        this.radius = optionsHash.radius;
        this.pos = utils.translatePos(optionsHash.pos);
        optionsHash.winner ||= HOLE_DEFAULTS.winner;
        this.winner = optionsHash.winner 

        optionsHash.draw ||= HOLE_DEFAULTS.draw

        this.draw = optionsHash.draw

    }

   





}

export default Hole;