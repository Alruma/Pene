const brickColours = {
  1: '#FF0040',
  2: '#0000FF',
  3: '#000000',
};

function drawBall({
  ctx, ballRadius, x, y,
}) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#FF00FF';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle({
  ctx, paddleX, canvas, paddleHeight, paddleWidth,
}) {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}
function drawBricks({
  bricks,
  brickColumnCount,
  brickRowCount,
  brickWidth,
  brickHeight,
  brickPadding,
  brickOffsetLeft,
  brickOffsetTop,
  ctx,
}) {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r];
      if (brick.status >= 1) {
        const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColours[brick.status];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore({ ctx, score }) {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}
function drawLives({ ctx, lives, canvas }) {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

export function draw(Juego) {
  Juego.ctx.clearRect(0, 0, Juego.canvas.width, Juego.canvas.height);

  drawBricks(Juego);
  drawBall(Juego);
  drawPaddle(Juego);
  drawScore(Juego);
  drawLives(Juego);
}
