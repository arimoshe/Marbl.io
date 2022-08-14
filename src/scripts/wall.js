import * as constants from "./constants" 

   const wallPng = new Image();

 const test = new Promise((resolve) => { wallPng.onload = resolve }, wallPng.src = "src/img/Tileset_8.png")
    

test.then((success) => { 
 WALL_DEFAULTS.texture.image = wallPng;
});

let WALL_DEFAULTS = {
    size: constants.GAME_DIMENTION_X / constants.MAP_GRID_X,
    texture: {
         sx: 32, sy: 0, swidth: 16, sheight: 16, width: 16, height: 16
    }
    
}
// console.log(WALL_DEFAULTS.size);

class Wall {
    constructor(optionsHash) {
        this.game = optionsHash.game;
        optionsHash.size ||= WALL_DEFAULTS.size;
        this.size = optionsHash.size;
        this.pos = optionsHash.pos;

        optionsHash.texture ||= WALL_DEFAULTS.texture

        this.texture = optionsHash.texture
        
    }

    

    


}





export default  Wall;




// const grabimage = (src) => {
//     const wallPng = new Image();

//     new Promise(resolve) { wallPng.onload = resolve }
//     wallPng.src = src;

// }