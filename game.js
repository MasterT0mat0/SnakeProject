const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = 20;
let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 10 };
let score = 0;
let direction = 'right';

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.forEach((segment) => {
    context.fillStyle = '#333';
    context.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
  });

  context.fillStyle = 'red';
  context.fillRect(apple.x * boxSize, apple.y * boxSize, boxSize, boxSize);

  context.fillStyle = '#333';
  context.font = '16px Arial';
  context.fillText('Score: ' + score, 10, 20);
}

function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === 'right') head.x += 1;
  else if (direction === 'left') head.x -= 1;
  else if (direction === 'up') head.y -= 1;
  else if (direction === 'down') head.y += 1;

  if (head.x === apple.x && head.y === apple.y) {
    score++;
    generateApple();
  } else {
    snake.pop();
  }

  snake.unshift(head);

  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize ||
    checkCollision(head)
  ) {
    // Game over
    alert('Game over! Your score is ' + score);
    snake = [{ x: 10, y: 10 }];
    score = 0;
    direction = 'right';
  }
}

function checkCollision(head) {
  // Check for collision with self
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function generateApple() {
  // Generate a new random apple location
  apple = {
    x: Math.floor(Math.random() * canvasSize),
    y: Math.floor(Math.random() * canvasSize),
  };

  // Check if the new apple is on top of the snake, if so, regenerate it
  if (checkCollision(apple)) {
    generateApple();
  }
}

function addToScoresTable(playerName, playerScore) {
  const table = document.getElementById('scoresTable');
  const row = document.getElementById('newScoreRow');
  const nameCell = document.getElementById('newScoreName');
  const scoreCell = document.getElementById('newScoreValue');
  nameCell.textContent = playerName;
  scoreCell.textContent = playerScore;
}

document.addEventListener('keydown', (event) => {
  // Update the direction based on the arrow keys
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  else if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  else if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  else if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

function gameLoop() {
  moveSnake();
  draw();
}

setInterval(gameLoop, 200);
