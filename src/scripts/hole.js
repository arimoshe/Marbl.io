

let HOLE_DEFAULTS = {
    radius: 18, 
    draw: (ctx,pos, radius) => {
        ctx.beginPath();
        ctx.moveTo(pos[0], pos[1]);
        ctx.arc(pos[0], pos[1], radius-4, 0, 2 * Math.PI);
        let strokeGradient = ctx.createLinearGradient(pos[0], pos[1] - radius, pos[0], pos[1] + radius) ;
        strokeGradient.addColorStop(0, '#c0c0c0');
        strokeGradient.addColorStop(1, 'white');
        ctx.strokeStyle = strokeGradient;
        ctx.lineWidth = radius/3;
        ctx.stroke();
        let fillGradient = ctx.createRadialGradient(pos[0], pos[1], radius*2, pos[0], pos[1] + radius, 0);
        fillGradient.addColorStop(0, '#000000');
        fillGradient.addColorStop(1, '#66bbFF');
        ctx.fillStyle = fillGradient;
        ctx.fill();
    }
}

class Hole {
    constructor(optionsHash) {
        this.game = optionsHash.game;
        optionsHash.radius ||= HOLE_DEFAULTS.radius;
        this.radius = optionsHash.radius;
        this.pos = optionsHash.pos;

        optionsHash.draw ||= HOLE_DEFAULTS.draw

        this.draw = optionsHash.draw

    }

}

export default Hole;