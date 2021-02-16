# Snake
The old snake game, but in JavaScript!


## How it works (OU COMENTANDO O CÓDIGO)
- O tabuleiro é composto por 25 (px, que vai de 0 a 24) * 25 (py, que vai de 1 a 25) quadrados (625)
  Cada peça do tabuleiro tem um tamanho (tp) definido pelo tamanho do canvas (500px de heigh e width) / quantidade de peças (qp)
  Esse tp é importante porque ele, juntamente do ax/ay e do loop "for" com os elementos do array Trail, vão determinar cada coordenada do canvas em que as maçãs aparecerão e a cobra aparecerá, respectivamente 
  [é como se cada pixel do tabuleiro tivesse 1 tp. No caso, como o canvas tem 500px e o jogo tem 25peças, entao cada peça possui 20 pixels (1tp)] 

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

