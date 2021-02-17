function start() {// the function called when player clicks on the start button ate menu screen

    // creating the stage usind the getContext("2d") method
    let stage = document.getElementById('stage');
    let ctx = stage.getContext("2d");

    // main variables of the game
    const vel = 1; // speed (How many pieces the snake will move each time the game is updated - 80ms)
    let vx = 0; // initial X speed
    let vy = -vel; // initial Y speed
    let px = 12; // snake's starting X point
    let py = 12; // snake's starting Y point
    let tp = 20; // size of each piece (each piece has 500px / 25 pieces = 20 "sizes", that is the tp variable)  
    let qp = 25; // amount of pieces
    let ax = ay = 15; // apple's starting X and Y point

    let trail = []; // the Array the represents the Snake's Trail - Starts empty, with no trail 
    tail = 1; // as the snake eats the apples the Trail is added by 1 tail, adding 1 piece for the snake's trail

    // shows the score of the game, starting in 0
    let score = 0
    document.getElementById('score').style.display = 'block'
    document.getElementById("score").innerHTML = '0'

    // removes the menu screen to the start of the game
    document.getElementById('menu').style.display = 'none'

    // this is the interval in which the game will run, and along with const vel will determinate the speed of the snake
    let intervalo = null

    function interval(flag) {
        if (flag) {
            intervalo = setInterval(game, 90);
        } else {
            clearInterval(intervalo)
        }
    }
    interval(true)

    // the main function of the game, called every 90 millisecond by the interval when the start() function is called
    function game() {

        /* the snake recieves the speed of variables vx and vy, wich recieved their values from the keyPush() function
        triggered by the keyboard arrow's keydown command */
        px += vx;
        py += vy;

        // Game over conditions
        if (px < 0) {
            gameover() // if snake runs into the left edge the game is over
        }
        if (px > qp - 1) {
            gameover() // if snake runs into the right edge the game is over
        }
        if (py < 0) {
            gameover() // if snake runs into the top edge the game is over
        }
        if (py > qp - 1) {
            gameover() // if snake runs into the bottom edge the game is over
        }

        // Observations about the movimentation

        /* If you want the snake to keep moving after hitting an edge instead of gemeover just modify: 
        if (px < 0) {
            px = qp -1
        }
        if (px > qp - 1) {
            px = 0
        }
        if (py < 0) {
            py = qp -1
        }
        if (py > qp - 1) {
            py = 0
        }*/

        // Painting the canvas stage with .fillStyle property
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        // Painting the apple piece at its initial position
        ctx.fillStyle = "red";
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        // Painting the snake
        /* Create an JS Object inside the trail Array that, alog with the "for" loop, will be responsible for the
        movement of the snake */
        for (let i = 0; i < trail.length; i++) {

            if (i == 0) {
                // Paints the head of the snake if it has no trail
                ctx.fillStyle = "#8ead2d";
                ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

            } else {
                // Paints the head of the snake if it has a trail
                ctx.fillStyle = "#8ead2d";
                ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

                // Pains the trail of the snake
                ctx.fillStyle = "#364713";
                ctx.fillRect(trail[i - 1].x * tp, trail[i - 1].y * tp, tp - 1, tp - 1);
            }

            // Another game over condition: if the snake's head goes through its own trail the game is over 
            if (trail[i].x == px && trail[i].y == py && tail != 1) {
                gameover()
            }

            // The winning condition: player has to make the snake occupy the entire screen
            if (i == 624) {
                win()
            }
        }

        trail.push({ x: px, y: py })
        while (trail.length > tail) {
            trail.shift(); // Removes the first element of the array when the trail is higher then tail
        }

        // When the snake "eats" (passes through the apple) its trail is increased by 1 tail (tail++)
        if (ax == px && ay == py) {
            tail++;

            // And a new apple is created in a random position, which is different from snake's current position
            function randomApple() {
                ax = Math.floor(Math.random() * qp);
                ay = Math.floor(Math.random() * qp);
            }
            randomApple()

            /* If the position of the new apple is equal to the actual position of the snake, then a new apple 
            wil be generated*/
            for (let i = 0; i < trail.length; i++) {
                if (trail[i].x == ax && trail[i].y == ay && tail != 1) {
                    randomApple()
                }
            }

            // Finally the score is increased by 10 and is displayed at the game screen in real time
            score += 10
            let finalScore = score
            document.getElementById("score").innerHTML = finalScore
        }

        function gameover() {
            let finalScore = score
            document.getElementById('gameover').style.display = 'flex';
            document.getElementById("final-points-lose").innerHTML = 'You\'ve made ' + finalScore + ' points!'

            interval(false)
            gameisover = true
        }

        function win() {
            let finalScore = score
            document.getElementById('win').style.display = 'flex';
            document.getElementById("final-points-win").innerHTML = 'You\'ve made ' + finalScore + ' points!'

            interval(false)
            gameisover = true
        }

    }

    //How the player will make the snake move
    document.addEventListener("keydown", keyPush);

    //This is the fuction that is called when a "keydown" event is triggered.
    function keyPush(event) {

        switch (event.keyCode) {
            //It compares if the pressed key is one of the arrows of the keyboard.
            //If it is the switch understands wich arrow was pressed and assigns a value to the vx and vy variables
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
            case 80: // "P" key for pausing the game
                pause()
            default:

                break;
        }

    }

    let show = true
    let gameisover = false

    function pause() {

        if (gameisover == false) {
            if (show == true) {
                interval(false)
                document.getElementById('pause-screen').style.display = 'flex'

            } else {

                interval(true)
                document.getElementById('pause-screen').style.display = 'none'

            }

            show = !show
        }
    }
}

//The function that starts the game again after the game is over and the player wants to play again
function reset() {
    document.getElementById('gameover').style.display = 'none';

    start()
}

//The function that goes back to the menu screen when the game is over and the player don't want do play again
function menu() {
    window.location.reload()
}

//The functions to enter and exit the Instructions Screen by clicking at the button on Menu Screen
function showInstructions() {
    document.getElementById('instructions-board').style.display = 'flex'
}
function exitInstructions() {
    document.getElementById('instructions-board').style.display = 'none'
}
