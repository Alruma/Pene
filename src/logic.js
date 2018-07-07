export function initLogic(Juego) {
  function keyDownHandler(e) {
    if (e.keyCode === 39) {
      Juego.rightPressed = true;
    } else if (e.keyCode === 37) {
      Juego.leftPressed = true;
    }
  }
  function keyUpHandler(e) {
    if (e.keyCode === 39) {
      Juego.rightPressed = false;
    } else if (e.keyCode === 37) {
      Juego.leftPressed = false;
    }
  }
  function mouseMoveHandler(e) {
    const relativeWidth = Juego.canvas.width / Juego.canvas.offsetWidth;
    const relativeX = (e.clientX - Juego.canvas.offsetLeft) * relativeWidth;
    if (relativeX > 0 && relativeX < Juego.canvas.width) {
      Juego.paddleX = relativeX - Juego.paddleWidth / 2;
    }
  }


  function handleMove(evt) {
    const primerDedo = evt.touches[0];
    const relativeWidth = Juego.canvas.width / Juego.canvas.offsetWidth;
    const relativeX = (primerDedo.clientX - Juego.canvas.offsetLeft) * relativeWidth;
    if (relativeX > 0 && relativeX < Juego.canvas.width) {
      Juego.paddleX = relativeX - Juego.paddleWidth / 2;
    }
  }

  function mouseClickHandler() {
    const angulo = Math.random() * Math.PI / 4 + Math.PI / 4;
    if (Juego.dead) {
      Juego.click = true;
      Juego.x = Juego.canvas.width / 2;
      Juego.y = Juego.canvas.height - 30;
      Juego.dx = Math.cos(angulo) * 7;
      Juego.dy = Math.sin(angulo) * -7;
      Juego.paddleX = (Juego.canvas.width - Juego.paddleWidth) / 2;
      Juego.dead = false;
    }
  }

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
  document.addEventListener('mousemove', mouseMoveHandler, false);
  document.addEventListener('click', mouseClickHandler, false);
  document.addEventListener('touchmove', handleMove, false);
}
