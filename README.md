# Marbl.io
Ⓜ️ A Marble Based Game Ⓜ️

<br>

# Background

In Marbl.io, the player guides Marvyn the marble through a treacherous maze to reach it's Home-Sweet-Hole'me. Marvyn must avoid perilous pits by navigating via their mobile device's tilt or via their mouse's position. The closer the player gets to home, the higher the score gets. 

Keep an eye out for special holes and you might just find yourself in a "hole" new world or even meet some friends.



# Functionality & MVP 

In Marbl.io, users will be able to:

- View a fully rendered maze, with holes and a marble
- Navigate through the maze via input from the device accelerometer or via the relative positioning of the user's mouse to the center of the screen
- Collide with walls and fall into holes
- Keep track of current score and high score on a per device basis

In addition, this project will include:

-  "How To Play" Button triggering a modal with background and rules of the game
- A production README
- Funky fresh, toggle-able music

Stretch Goals:

- Special holes that trigger:
	- Bonus stage
		- With oposite gravity
	- Multiple balls
- Multiplayer time race

<br>

---

# Wireframes

https://wireframe.cc/3XTEuf

<img src="https://user-images.githubusercontent.com/107275066/184312469-2bf4aa04-2608-406d-bb8c-9d706d3e8780.png" alt="wireframe" width="400"/>


<img src="https://user-images.githubusercontent.com/107275066/184412353-7c7dd65d-4ccb-4faf-86b0-701d3ef84b53.png" alt="wireframe2" width="400"/>


<img src="https://user-images.githubusercontent.com/107275066/184412334-f66f6f40-0f4c-4a54-b8d7-359aacb5616d.png" alt="wireframe3" width="400"/>


https://wireframe.cc/sCEHuG


---

# Technologies, Libraries, APIs

- The `Canvas API` to render the game board
- 'Webpack' to bundle and transpile the source JavaScript code
- `socket.io` to handle multiplayer (if stretch goal reached)


# Implementation Timeline

- **Friday Afternoon and Weekend**: Setup project and get webpack ready. Design primary maze. Create `maze` `marble` and `hole` and `game` classes. Get maze and marble rendered. Create basic start page. Work out all game logic at a high level and document.
- **Monday**: Get core game functionality working including collision detection and accelerometer and mouse inputs.
- **Tuesday**: Verify core game working as desired. Add game end and game win and score keeping. If begin coding stretch goals.
- **Wednesday**: Polish game visuals, UI. Add animations. If extra time is available, finish implementation of special stage/maze and finish implementing multiplayer if started on Tuesday
- **Thursday**:  Deploy to GitHub pages. If time, rewrite this proposal as a production README.
 
