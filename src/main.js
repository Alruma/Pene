import { physics } from './physics.js';
import { draw } from './render.js';
import { initLogic } from './logic.js';

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('myCanvas');
const angulo = Math.random() * Math.PI / 4 + Math.PI / 4;
const paddleHeight = canvas.height * 0.020833;
const paddleWidth = canvas.width * 0.15;
const velocidad = canvas.height * 0.014583;

// 480
// 320

const Juego = {
  canvas,
  ctx: canvas.getContext('2d'),
  angulo,
  velocidad,
  ballRadius: paddleHeight,
  x: canvas.width / 2,
  y: canvas.height - paddleHeight * 3,
  dx: Math.cos(angulo) * velocidad,
  dy: Math.sin(angulo) * -velocidad,
  paddleHeight,
  paddleWidth,
  paddleX: (canvas.width - paddleWidth) / 2,
  paddleY: canvas.height - paddleHeight,
  rightPressed: false,
  leftPressed: false,
  brickRowCount: 5,
  brickColumnCount: 3,
  brickWidth: paddleWidth,
  brickHeight: paddleHeight * 2,
  brickPadding: paddleWidth * 0.1,
  brickOffsetTop: paddleHeight * 3,
  brickOffsetLeft: canvas.width * 0.09375,
  score: 0,
  lives: 3,
  bricks: [],
  dead: false,
  delta: 0,
};

for (let c = 0; c < Juego.brickColumnCount; c++) {
  Juego.bricks[c] = [];
  for (let r = 0; r < Juego.brickRowCount; r++) {
    Juego.bricks[c][r] = { x: 0, y: 0, status: 3 };
  }
}

function init() {
  initLogic(Juego);
}

let lastTs = 0;

function loop(ts) {
  Juego.delta = (ts - lastTs) / 1000;
  lastTs = ts;
  physics(Juego);
  draw(Juego);
  requestAnimationFrame(loop);
}

init();
loop();
