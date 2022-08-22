import * as constants from "./constants";
import * as utils from "./utils";
import * as texture from "./texture"

export const drawBackground = (ctx) =>{
    ctx.rect(-(window.innerWidth - constants.GAME_DIMENSION_X / 2), -(window.innerHeight - constants.GAME_DIMENSION_Y / 2), document.getElementById("main-app").width, document.getElementById("main-app").height);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0, 0, constants.GAME_DIMENSION_X, constants.GAME_DIMENSION_Y);
    ctx.fillStyle = "#efefef";
    ctx.fill();

}

export const drawLevelWalls = (ctx, game, levelNum) => {
    for (let ele of game.levels[levelNum].walls) {

        if (ele.texture.image) {
            ctx.drawImage(ele.texture.image, ele.texture.sx, ele.texture.sy, ele.texture.swidth, ele.texture.sheight, ele.pos[0], ele.pos[1], ele.texture.width, ele.texture.height)
        } else {
            ctx.beginPath();
            ctx.rect(ele.pos[0], ele.pos[1], ele.size, ele.size);
            ctx.fill();
        }
    }
}


export const drawLevelHoles = (ctx,  game, levelNum) => {
    for (let ele of game.levels[levelNum].holes) {
        ele.draw(ctx, ele.pos, ele.radius, ele.points)
    }
}

export const drawMarble = (ctx, marble) => {
    ctx.beginPath();
    ctx.moveTo(marble.pos[0], marble.pos[1]);
    let objTexture
    if (marble.texture) {
        objTexture = marble.texture(ctx, marble);
    }
    else {
        objTexture = ctx.createRadialGradient(marble.pos[0] - (marble.radius / 2.5), marble.pos[1] - (marble.radius / 2.5), 5, marble.pos[0], marble.pos[1], (marble.radius * 2));
        objTexture.addColorStop(0, 'white');
        objTexture.addColorStop(1, 'black');
    }


    ctx.arc(marble.pos[0], marble.pos[1], marble.radius, 0, 2 * Math.PI)
    ctx.fillStyle = "#e0e0e0"
    ctx.fill();
    ctx.fillStyle = objTexture;
    ctx.fill();
    if (marble.texture2) {
        ctx.fillStyle = marble.texture2(ctx, marble);
        ctx.fill();
    }
}

export const drawScore = (ctx, game) => {
    ctx.beginPath();
    ctx.font = "16px Silkscreen";
    ctx.fillStyle = "#e0e0e0";
    ctx.fillText("Score", constants.GAME_DIMENSION_X * .85, - 70);
    ctx.textBaseline = "alphabetic";
    ctx.font = "60px Silkscreen";
    ctx.fillText(game.earnedPoints + game.currentLevelScore, constants.GAME_DIMENSION_X * .85, -20);

}

export const drawLives = (ctx, game) => {
    ctx.beginPath();
    ctx.font = "16px Silkscreen";
    ctx.fillStyle = "#e0e0e0";
    ctx.fillText("Lives", constants.GAME_DIMENSION_X * .15, -70);
    for (let i = 0; i < game.lives; i++) {

        if (texture.HEART_IMG) {
            ctx.drawImage(texture.HEART_IMG, (constants.GAME_DIMENSION_X * .075) + (70 * i), -65)
        }
    }
}

export const drawName = (ctx) => {
    ctx.beginPath();
    ctx.font = "100px Silkscreen";
    ctx.fillStyle = "#202020";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("Marbl.io", (constants.GAME_DIMENSION_X / 2), -30);
}

export const drawButton = (ctx, pos, width, height, cornerRadius, text, backgroundColor, textColor, textSize, font) => {
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    utils.roundRect(ctx, pos[0] - width / 2, pos[1] - height / 2 - (textSize.slice(0, -2) / 2) * constants.SCALE, width, height,cornerRadius, false, false);
    ctx.fill(); 
    ctx.beginPath();
    ctx.font = `${textSize} ${font}`
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center"
    ctx.fillStyle = textColor
    ctx.fillText(text, pos[0], pos[1])
}

export const updateBoardRotataion = (marble) => {
    // console.log(
    // document.getElementById("canvas-container").style.transform = 'rotateY(30deg)'
    document.getElementsByTagName("body")[0].style.transform = 'perspective(2000px) rotateY(' + marble.vel[0] / 2 + 'deg) rotateX(' + -marble.vel[1] / 2 + 'deg'
}

export const drawVector = (ctx, game) => {
    ctx.beginPath();
    ctx.strokeStyle = "black"
    const horizontalCenter = constants.GAME_DIMENSION_X / 2;
    const verticalCenter = constants.GAME_DIMENSION_Y / 2;
    ctx.moveTo(horizontalCenter , verticalCenter);
    ctx.lineTo(
        horizontalCenter + (((horizontalCenter * constants.SCALE - (game.input.mousePosX - constants.GAME_OFFSET_X)) / horizontalCenter) * -100),
        verticalCenter + (((verticalCenter * constants.SCALE - (game.input.mousePosY - constants.GAME_OFFSET_Y)) / verticalCenter) * -100));

    ctx.lineWidth = 5;

    ctx.stroke();
    }