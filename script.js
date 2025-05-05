
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 80, y: 200, width: 30, height: 30, velocity: 0 };
const gravity = 0.5;
const flapStrength = -8;

let pipes = [];
let pipeGap = 250;
let frame = 0;
let score = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "blue";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipe.width, canvas.height);
  });
}

function updateBird() {
  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver = true;
  }
}

function updatePipes() {
  if (frame % 90 === 0) {
    const top = Math.random() * (canvas.height - pipeGap - 100) + 20;
    pipes.push({ x: canvas.width, width: 50, top });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.top + pipeGap)
    ) {
      gameOver = true;
    }

    if (pipe.x + pipe.width === bird.x) {
      score++;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "48px Arial";
    ctx.fillText("Game Over", 80, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateBird();
  updatePipes();
  drawPipes();
  drawBird();
  drawScore();

  frame++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    bird.velocity = flapStrength;
  }
});

gameLoop();

