# Snake
The old snake game, but in JavaScript!

## How it works
To build this software I divided the project in 6 steps:
OBS: The code is well comented so I strongly recomend reading it!

- Building the Stage
The stage was built using the HTMLCanvasElement.getContext('2d') method. This leads to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering, that will be our stage.

It is composed by 25 * 25 squares, represented by px and py, respectively.

Each piece of the stage has a size (represented by tp), defined by the stage's size (500px) divided by the number of pieces (qp), that I've dicided it's 25.

So, tp = 500 / 25, then tp = 20

This tp variable has great importance for the game operation, because it works like a size determiner of all pieces, and, along with the ax/ay variables and the "for" loop (with the elements of the Trail Array), will determinate coordenates of the stage on wich the apples will apear and also where the snake will appear

-> It's as is each pixel of the stage has 1 tp. As the canvas has 500px and the game has 25 pieces, so each piece of the board has 20 pixels (or 1 tp)


- Building the Snake and How it Moves
- Build the Apples
- Start Positions
- End Game Conditions
- Pontuation






  Esse tp é importante porque ele, juntamente do ax/ay e do loop "for" com os elementos do array Trail, vão determinar cada coordenada do canvas em que as maçãs aparecerão e a cobra aparecerá, respectivamente 
 

- A cobra começa no meio do tabuleiro (posição px e py = 12), com velocidade de 90milissegundos por quadrado (setInterval(game,90))
e direção para norte (vy = -vel), o tamanho inicial da cobra é so 1 quadrado porque o tail = 1

- A cauda da cobra é um Array, e esse Array começa sem nenhum elemento, quando ela come uma maça é adicional +1 nesse Array por meio
da variavel let tail = 1

->>>> Como a cobra anda? (A função document.addEventListener("keydown", keyPush) possui um Switch para cada tecla que atribuem uma vel(direção) à cobra alterando a posição px e py da cobra pelas variaveis vx, e o loop....)

- Maças: geradas randomicamente e sao colocadas em uma posição em que o corpo da cobra NÃO ESTEJA
         a primeira maça é sempre colocada na posição 15 (ax e ay = 15)
- Pontuation: cada maça 'comida' (que a cobra passa por cima) o jogador ganha 10 pontos
              a pontuação começa em 0 (let pontuation)
- Fim de jogo: O jogador perde caso... Isso é verificado dessa forma...
               O jogador ganha caso... Isso é verificado dessa forma....


## Download
Try changing the software variables yourself, and modify the game rules as you wish

- Downloading...
????Como fazer o download