<img width="1054" alt="MarblioLogo" src="https://user-images.githubusercontent.com/107275066/185850085-2899f7a7-dec5-49cf-a295-642a681db8ff.png">

<br>

# Marbl.io
Ⓜ️ A Marble Based Game Ⓜ️

<br>

# Screenshot

![Marblio](https://user-images.githubusercontent.com/107275066/185848605-19c21427-8a1e-4666-9c2e-cf507d6786bd.gif)


<br>

# Description

In Marbl.io, the player guides Marvyn the marble through a treacherous maze to reach it's Home-Sweet-Hole'me. Marvyn must avoid perilous pits by navigating via their mobile device's tilt or via their mouse's position. The closer the player gets to home, the higher the score gets. 


# Play Now

[Play Me!](https://arimoshe.github.io/Marbl.io)

<br>

---

# Features

- Custom Physics and collision detection engine
- Dynamic levels with the option for special holes with custom functions.
- Uses Object Oriented coding principals, creating semantic objects and classes for each aspect of the game 

```javascript

```

```javascript 
class Hole {
    constructor(optionsHash) {
        this.points = optionsHash.points
        this.game = optionsHash.game;
        optionsHash.radius ||= HOLE_DEFAULTS.radius;
        this.radius = optionsHash.radius;
        this.pos = optionsHash.pos;
        optionsHash.winner ||= HOLE_DEFAULTS.winner;
        this.winner = optionsHash.winner;
        this.special = undefined;
        optionsHash.draw ||= HOLE_DEFAULTS.draw;
        this.draw = optionsHash.draw

    }
```
```javascript

let specialFunction = (game) => { 
    if (game.lives < 4) game.lives++;
    game.marble.pos = [650, 415];
    draw.drawLives(game.contexts['ui'].getContext('2d'), game);
    game.marble.radius = 15;
    game.marble.isCollided = false;
    game.pauseAndStartButton();
     }
```
```javascript
new Hole({
        special: specialFunction,
        points: "?", pos: [1160, 150], winner: false, radius: 80, 
        draw: (ctx, pos, radius, points) => {
            ctx.beginPath();
            ctx.moveTo(pos[0], pos[1]);
            ctx.arc(pos[0], pos[1], radius - 4, 0, 2 * Math.PI);
            let strokeGradient = ctx.createLinearGradient(pos[0], pos[1] - radius, pos[0], pos[1] + radius);
            strokeGradient.addColorStop(0, '#c0c0c0');
            strokeGradient.addColorStop(1, 'white');
            ctx.strokeStyle = strokeGradient;
            ctx.lineWidth = radius / 2;
            ctx.stroke();
            let fillGradient = ctx.createRadialGradient(pos[0], pos[1], radius * 2, pos[0], pos[1] + radius, 0);
            fillGradient.addColorStop(0, '#990000');
            fillGradient.addColorStop(1, '#dddddd');
            ctx.fillStyle = fillGradient;
            ctx.fill();
            ctx.fillStyle = '#efefef';
            ctx.beginPath();
            ctx.ellipse(pos[0], pos[1] + (radius * 1.4), 10, 30, Math.PI / 2, 0, Math.PI * 2);
            ctx.filter = 'blur(5px)';
            ctx.fill();
            ctx.filter = 'none'
            ctx.fillStyle = 'black';
            ctx.font = "22px Silkscreen";
            ctx.textAlign = "center"
            ctx.fillText(points, pos[0], pos[1] + (radius * 1.45));
        }
})
```



# Technologies, Libraries, APIs

- The `Canvas API` to render the game board
- `Webpack` and `Babble`to bundle and transpile the source JavaScript code





 
