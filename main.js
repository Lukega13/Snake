function reset() {
    document.getElementById('gameover').style.display = 'none';

    start()
}

function menu() {
    window.location.reload()
}

function showInstructions() {
    document.getElementById('instructions-board').style.display = 'flex'
}

function exitInstructions() {
    document.getElementById('instructions-board').style.display = 'none'
}



function start() {

    let stage = document.getElementById('stage');
    let ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);

    let intervalo = setInterval(game, 90);

    const vel = 1; //velocidade (Quantas casas a cobra vai andar a cada vez que o jogo for atualizado - 80ms)

    let vx = 0; //velocidade x inicial
    let vy = -vel; //velocidade y inicial
    let px = 12; //ponto de início
    let py = 12; //ponto de início
    let tp = 20; //tamanho da peça, ou seja, cada peça tem 500 / 25 (20) de tamanho 
    let qp = 25; //quantidade de peças
    let ax = ay = 15; //posição inicial da maçã

    let trail = []; //começa com um array vazio - sem nenhum elementro no rastro
    tail = 1;

    let pontuation = 0
    document.getElementById('pontuation').style.display = 'block'
    document.getElementById("pontuation").innerHTML = '0'

    document.getElementById('menu').style.display = 'none'


    function game() {

        px += vx; //a cobra recebe a velocidade de vx e vy, recebidas da function disparada pelo comando keydown
        py += vy;

        if (px < 0) { //condiçoes para gameover
            gameover()
        }
        if (px > qp - 1) {
            gameover()
        }
        if (py < 0) {
            gameover()
        }
        if (py > qp - 1) {
            gameover()
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height); //pinta o canvas

        ctx.fillStyle = "red";
        ctx.fillRect(ax * tp, ay * tp, tp, tp); //pinta o tamanho da peça de vermelho na posição inicial da maça

        ctx.fillStyle = "gray";
        for (let i = 0; i < trail.length; i++) {

            if (i == 0) {
                ctx.fillStyle = "#8ead2d";
                ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1); //pinta a cabeça da cobra
            } else {
                ctx.fillStyle = "#8ead2d";
                ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1); //pinta a cabeça da cobra qnd tem rastro

                ctx.fillStyle = "#364713";
                ctx.fillRect(trail[i - 1].x * tp, trail[i - 1].y * tp, tp - 1, tp - 1); //pinta o rastro da cobra
            }

            if (trail[i].x == px && trail[i].y == py && tail != 1) { //Se a cauda encontrar com a cabeça da gameover
                gameover()
            }

            if (i == 624) {
                win()
            }
        }

        trail.push({ x: px, y: py })
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) { //Come a maça
            tail++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);

            pontuation += 10
            finalPontuation = pontuation
            document.getElementById("pontuation").innerHTML = finalPontuation
        }

        finalPontuation = pontuation

        function gameover() {
            document.getElementById('gameover').style.display = 'flex';
            document.getElementById("final-points-lose").innerHTML = 'You\'ve made ' + finalPontuation + ' points!'

            clearInterval(intervalo)
        }

        function win() {
            document.getElementById('win').style.display = 'flex';
            document.getElementById("final-points-win").innerHTML = 'You\'ve made ' + finalPontuation + ' points!'

            clearInterval(intervalo)
        }

    }



    function keyPush(event) {


        switch (event.keyCode) {
            case 37: // Left
                vx = -vel;
                vy = 0;
                break;
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;
            case 40: // down
                vx = 0;
                vy = vel;
                break;
            default:

                break;
        }


    }

}
