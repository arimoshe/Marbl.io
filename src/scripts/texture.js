export let HEART_IMG = undefined;
const heart = new Image();
const heartPromise = new Promise((resolve) => { heart.onload = resolve }, heart.src = "src/img/heart.svg")
heartPromise.then((success) => {
    HEART_IMG = heart;
});


export let WALL_TILESET = undefined;
const wallPng = new Image();
const wallPromise = new Promise((resolve) => { wallPng.onload = resolve }, wallPng.src = "src/img/Tileset_8.png")
wallPromise.then((success) => {
    WALL_TILESET = wallPng;
});