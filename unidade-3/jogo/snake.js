// @ts-check

const canvas = document.getElementById('snake');
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
const box = 20;

const snake = [];
snake[0] = {
  x: 10 * box,
  y: 10 * box,
};

let pontos = 0;

const foodRandomPosition = Math.floor(Math.random() * 29 + 1) * box;
let food = {
  x: foodRandomPosition,
  y: foodRandomPosition,
};

let snakeDirection;
const directionEnum = {
  'RIGHT': 39,
  'LEFT': 37,
  'UP': 38,
  'DOWN': 40,
};

document.addEventListener('keydown', (event) => {
  const key = event.keyCode;
  if (key === directionEnum.LEFT && snakeDirection !== 'RIGHT') {
    snakeDirection = 'LEFT';
  } else if (key === directionEnum.UP && snakeDirection !== 'DOWN') {
    snakeDirection = 'UP';
  } else if (key === directionEnum.RIGHT && snakeDirection !== 'LEFT') {
    snakeDirection = 'RIGHT';
  } else if (key === directionEnum.DOWN && snakeDirection !== 'UP') {
    snakeDirection = 'DOWN';
  }
});

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  context.fillStyle = '#dbdbdb';
  context.fillRect(0, 20, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    const snakePart = snake[i];
    context.fillStyle = (i === 0) ? 'green' : 'blue';
    context.fillRect(snakePart.x, snakePart.y, box, box);

    context.strokeStyle = 'red';
    context.strokeRect(snakePart.x, snakePart.y, box, box);
  }

  context.fillStyle = 'black';
  context.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeDirection === 'LEFT') snakeX -= box;
  if (snakeDirection === 'UP') snakeY -= box;
  if (snakeDirection === 'RIGHT') snakeX += box;
  if (snakeDirection === 'DOWN') snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    const randomPosition = Math.floor(Math.random() * 29 + 1) * box;
    food = {
      x: randomPosition,
      y: randomPosition,
    };
    somaPonto();
  } else {
    snake.pop();
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (snakeX < 0
    || snakeX > (canvas.width - box)
    || snakeY < 20
    || snakeY > (canvas.height - box)
    || collision(newHead, snake)) {
    clearInterval(game);
    gravaRecorde();
  }

  snake.unshift(newHead);
}

function somaPonto() {
  pontos += 1;
  mostrarPontos();
}

function gravaRecorde() {
  let record = 0;
  if (localStorage.getItem('pontuacaoSnake') != null) {
    record = parseInt(localStorage.getItem('pontuacaoSnake'));
    if (record < pontos) {
      record = pontos;
    }
  } else {
    record = pontos;
  }
  localStorage.setItem('pontuacaoSnake', record);
  mostrarRecorde();
}

function mostrarRecorde() {
  context.clearRect(canvas.width - 250, 0, canvas.clientWidth, 20);
  let record = 0;
  context.fillStyle = '#0000ff';
  context.font = '20px Arial';
  if (localStorage.getItem('pontuacaoSnake') != null) {
    record = parseInt(localStorage.getItem('pontuacaoSnake'));
  }
  context.fillText(`Recorde: ${record}`, canvas.width - 250, 16, 250);
}

function mostrarPontos() {
  context.clearRect(0, 0, 250, 20);
  context.fillStyle = '#ff0000';
  context.fillText(`Pontos: ${pontos}`, 1, 16, 250);
}

mostrarRecorde();
mostrarPontos();

let game = setInterval(draw, 100);
