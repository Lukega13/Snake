<img src="./img/snake-banner.jpg">

<h2 align="center">🐍 The old snake game, but in JavaScript!&nbsp;
<img alt="JavaScript" align="center" width="24px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"/>
</h2>

<p align="center">
<a hred="https://github.com/Lukega13/Snake">
<img alt="Version v1.0" src="https://img.shields.io/github/release/Naereen/StrapDown.js.svg">
</a>

<a href="https://github.com/Lukega13/Snake/blob/master/LICENSE.md">
<img alt="Lincese MIT" src="https://img.shields.io/github/license/Naereen/StrapDown.js.svg">
</a>

<a href="http://www.linkedin.com/in/luke-guimaraes">
<img src="https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white">
</a>

<img src="https://img.shields.io/github/stars/Lukega13/Snake.svg?style=social&label=Star&maxAge=2592000">
</p>

<br/>

<p align="center">
<img height="400px" src="/img/1b450870a9594a4d8c59d8e97ee3c50312_14_33.gif" />
</p>

## 📜 Rules and Features
- [X] The snake is controlled by the arrow keys
- [X] Player can pause the game pressing the "P" key
- [X] The snake moves at a constant speed, only in 4 directions: north, south, east, or west
- [X] The snake starts at the center of the board, moving north
- [X] Snake "moves" by adding a square to its head and simultaneously deleting a square from the tip of its tail
- [X] "Apples" appear at random locations and there is always exactly one apple visible
- [X] When the snake eats an apple, it gets (1 square) longer
- [X] A snake dies by either running into the edge of the board, or by running into its own tail
- [X] If the snake dies the game is ended
- [X] The final score is based on the number of apples eaten by the snake: for each apple eated you win 10 points
- [X] If the snake fills the entire window you win!

<br/>

## 🛠 Technologies
<div align="left">
<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
</div>

<br/>

## 🤔 How it works

To build this software I divided the project in 7 steps:

> ✏️ The code is well commented so I strongly recommend reading it!

<br />

**1. Building the Stage**

The stage was built using the HTMLCanvasElement.getContext('2d') method. This leads to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering, that will be our stage.

The stage was painted using the propertys .fillStyle and .fillRect of the CanvasElement

```
// Creating the stage usind the getContext("2d") method

let stage = document.getElementById('stage');
let ctx = stage.getContext("2d");
    
// Painting the canvas stage with .fillStyle property

ctx.fillStyle = "black";
ctx.fillRect(0, 0, stage.width, stage.height);
```

It is composed by 25 * 25 squares, represented by px and py, respectively.

Each piece of the stage has a size (represented by tp), defined by the stage's size (500px) divided by the number of pieces (qp), that I've dicided it's 25.

So, tp = 500 / 25, then tp = 20

This tp variable has great importance for the game operation, because it works like a size determiner of all pieces, and, along with the ax/ay variables and the "for" loop (with the elements of the Trail Array), will determinate coordenates of the stage on wich the apples will apear and also where the snake will appear

> ✏️ It's as if each pixel (square) of the stage has 1 tp. As the canvas has 500px and the game has 25 pieces, so each piece (square) of the board has 20 pixels (or 1 tp)

<br />

**2. Building the Snake and How it Moves**

The snake's movement is determined by 5 factors:

<br />

**1- The vx and vy variables: when player presses the arrows on the keyboard, these variables have their values changed**
```
// How the player will make the snake move
document.addEventListener("keydown", keyPush);

// This is the fuction that is called when a "keydown" event is triggered.
function keyPush(event) {

// It compares if the pressed key is one of the arrows of the keyboard.
// If it is the switch understands wich arrow was pressed and assigns a value to the vx and vy variables

 switch (event.keyCode) {

  case 37: // Left Arrow
    vx = -vel;
    vy = 0;
    break;

  case 38: // Up Arrow
    vx = 0;
    vy = -vel;
    break;

  case 39: // Right Arrow
    vx = vel;
    vy = 0;
    break;

  case 40: // Down Arrow
    vx = 0;
    vy = vel;
    break;

  default:

    break;
  }

}
```

<br />

**2- The interval of 90ms in which the game() function is called**
```
let intervalo = null

function interval(flag) {
 if (flag) {
  intervalo = setInterval(game, 90);
 } else {
  clearInterval(intervalo)
 }
}

interval(true)

```

<br />

**3- The px and py variables, which receives the values of vx and vy for each time the game() function is called**
```
function game() {
 px += vx;
 py += vy;
 
 ...
}
```

<br />

**4- The Trail Array along with the tail variable**
```
let trail = []; // The Array that represents the Snake's Trail - Starts empty, with the snake without a "body"
tail = 1; // The tail starts with 1, which means that the snake will be only 1 square in length

// Creates an JS Object inside the trail Array that, alog with the "for" loop, will be responsible for the movement of the snake 

trail.push({ x: px, y: py })

// Removes the first element of the array when the trail is higher then tail

while (trail.length > tail) {
 trail.shift();
}
```

<br />

**5- The "for" loop that paints the snake and its trail**
```
// Painting the snake

for (let i = 0; i < trail.length; i++) {

 if (i == 0) { 
 
 // Paints the head of the snake if it has no trail (i = 0)
 ctx.fillStyle = "#8ead2d";
 ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

 } else {
 
 // Paints the head of the snake if it has a trail
 ctx.fillStyle = "#8ead2d";
 ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

 // Paints the trail of the snake
 ctx.fillStyle = "#364713";
 ctx.fillRect(trail[i - 1].x * tp, trail[i - 1].y * tp, tp - 1, tp - 1);
}
```

<br />

**I mean**

The snake is the Array Trail, which starts without any objects. Which means, when the game starts the snake doesn't exist yet

When the player presses an arrow on the keyboard, the keyPush() function detects and assigns a value to the variables vx and vy, 
which depends on which key was pressed

The game runs at an interval of 90 to 90ms, determined by the interval() function

When the game is started the values assigned to the variables vx and vy are added to the variables px and py, changing the position
of the snake each time the function game() is called

The snake is painted based on the values of the x and y properties of the Trail Array objects. These x and y values are the snake's
vx and vy values, that were assigned to the Array using the .push() method

However, the first time game() is started, the snake doesn't appear because the Trail Array is empty and the .push() of the variables 
vx and vy is only done after the snake painting, with the "for" loop

The second time that game() is started the snake appears, because the Trail Array already has 1 Object that was added the first time game()
was executed. However, after painting the snake, the variables vx and vy are sent back to the Trail Array as a new Object, through .push()

Then, right after .push() the while method checks if there are more objects in the Trail Array than is necessary for the current tail size.
In this case, while observes that trail.length (2 objects) is greater than the current tail (1), so it activates the trail.shift() method 
that removes the first object of the Array (the object that was just added), causing the snake to remain with only 1 object, until it eats
an apple and the tail variable changes to 2, allowing 2 objects inside the Trail Array

Game starts with the starting positions px and py equal to 12 (approximately in the middle of the board); initial speed vx = 0 and vy = - 1; and the snake starts 
with just 1 square in length, determined by the variable tail = 1

<br />

**3. Building the Apples**

Apples are randomically generated and placed in a position where the snake's body IS NOT occupying

There is always exactly one apple visible, to generate the next apple, the current one must be eaten 

The first apple is always placed at position 15,15 (ax = ay = 15)

When player "eats" an apple another one is randomically generated again

```
 // Apple's starting X and Y point
 
 let ax = ay = 15; 
 
 // Painting the apple's position in canvas
 
 ctx.fillStyle = "red";
 ctx.fillRect(ax * tp, ay * tp, tp, tp);
 
 // When an apples is eaten
 
 if (ax == px && ay == py) {
 
 // Snake's tail gets bigger
 
 tail++; 
 
 // The score is increased by 10 and is displayed at the game screen in real time
 
 score += 10
 let finalScore = score
 document.getElementById("score").innerHTML = finalScore
 
 // And a new apple is created in a random position, which is different from snake's current position
 
 function randomApple() {
  ax = Math.floor(Math.random() * qp);
  ay = Math.floor(Math.random() * qp);
 }
 randomApple()
 
 // If the position of the new apple is equal to the actual position of the snake, then a new apple wil be generated
 
 for (let i = 0; i < trail.length; i++) {
 if (trail[i].x == ax && trail[i].y == ay && tail != 1) {
   randomApple()
  }
 }
```

<br />

**4. Starting Positions**

Snake starts at the middle of the board (1), with a speed of 90ms per square (2) and heading north (3)

The initial size of the snake is 1 square (4) 

```
1- Starting position of the snake
let px = 12; // snake's starting X point
let py = 12; // snake's starting Y point
    
2- Speed of the snake movimentation in milliseconds per square
let intervalo = null

function interval(flag) {
  if (flag) {
  intervalo = setInterval(game, 90);
  } else {
  clearInterval(intervalo)
  }
}
interval(true)

3- Starting direction of the snake
let vx = 0; // initial X speed
let vy = -vel; // initial Y speed

px += vx;
py += vy;

4- Starting size of the snake
tail = 1
```

<br />

**5. End Game Conditions**

The game can be ended in 3 ways:

<br />

- User loses by running into one of the four edges of the board:
```
// if snake runs into the left edge the game is over

if (px < 0) {
  gameover() 
}

// if snake runs into the right edge the game is over

if (px > qp - 1) {
  gameover() 
}

// if snake runs into the top edge the game is over

if (py < 0) {
  gameover() 
}

// if snake runs into the bottom edge the game is over

if (py > qp - 1) {
  gameover() 
}
```

<br />

- User loses by running into its own tail: 
```
if (trail[i].x == px && trail[i].y == py && tail != 1) {
  gameover()
}
```

<br />

- User wins if the snake occupies the entire screen
```
if (trail.length == 625) {
  win()
}
```

<br />

When game is ended one of the functions below is called, whether the player wins or loses
```
// If player loses the gameover() function is called

function gameover() {
 let finalScore = score
 document.getElementById('gameover').style.display = 'flex';
 document.getElementById("final-points-lose").innerHTML = 'You\'ve made ' + finalScore + ' points!'

// Stops the interval of the game, stopping the entire game

 interval(false)
 gameisover = true
}

// If player wins the win() function is called

function win() {
 let finalScore = score
 document.getElementById('win').style.display = 'flex';
 document.getElementById("final-points-win").innerHTML = 'You\'ve made ' + finalScore + ' points!'

 interval(false)
 gameisover = true
}
```

<br />

**6. Score**

Score starts at 0 and each "eaten apple" (snake passes through) gives 10 points for the player

It's verified by the code below

```
// When game starts the score is reseted and the score screen is showed along with the game screen

let score = 0
document.getElementById('score').style.display = 'block'
document.getElementById("score").innerHTML = '0'

// When the snake's head position (px,py) is equal to the apple's position (ax,ay)...

if (ax == px && ay == py) {

//The score is increased by 10 
score += 10

// And is displayed at the game screen in real time
let finalScore = score
document.getElementById("score").innerHTML = finalScore
}
```

<br />

**7. Aditional Features**

<br />

- Instructions Screen
```
// The functions to enter and exit the Instructions Screen by clicking at the button on Menu Screen

function showInstructions() {
 document.getElementById('instructions-board').style.display = 'flex'
}

function exitInstructions() {
 document.getElementById('instructions-board').style.display = 'none'
}

```

<br />

- Pause and Resume

When player presses the "P" key on keyboard the pause() function is called and game is paused. When pressed again, the game is unpaused.

```
// 1- The keyPush() function understands when "P" key is pressed and calls the pause() function

document.addEventListener("keydown", keyPush);

function keyPush(event) {

 switch (event.keyCode) {
        
  case 80: // "P" key for pausing the game
   pause()
   break
  
  default:

   break;
 }

}
    
// Show variable is used to make sure that when player presses the "P" key for the 2º time, the game can only be unpaused
let show = true

// The gameisover variable is used to make sure that the game can only be paused and unpaused when game is running
let gameisover = false

// 2- When pause() is called, and Game is not Over, it can do 2 thinks, depending of the situation of the show variables:

function pause() {

 if (gameisover == false) { // Confirms if Game is not Over
 
  if (show == true) { // 1. When "P" is pressed for the first time show will be true and the game will be paused
  interval(false)
  document.getElementById('pause-screen').style.display = 'flex'

  } else { // 2. But, when "P" is pressed for the second time show will be false and the game will be unpaused

   interval(true)
   document.getElementById('pause-screen').style.display = 'none'

  }

  show = !show // Changes the variable show from true to false or false to true
 }
}
```

<br />

- Restart or Back to Menu

After Game Over player can decide either Restart the game or go Back to the Menu Screen

```
// The function calls the start() function of the game again and removes the Game Over Screen
function reset() {
 document.getElementById('gameover').style.display = 'none';

 start()
}

// The function simply reloads the page
function menu() {
 window.location.reload()
}

```
## ☁️ Installation
Try changing the software variables yourself, and modify the game rules as you wish

```
$ git clone https://github.com/Lukega13/Snake.git
```
## 😎 Author
| [<img src="https://avatars.githubusercontent.com/u/68627544?s=460&u=eb801d3c7b0c228bf6ee1d02341d24ddf278589f&v=4" width="155"><br><sub>@Lukega13</sub>](https://github.com/Lukega13) |
| :---: |
