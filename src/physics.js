function collisionDetection(Juego) {
  for (let c = 0; c < Juego.brickColumnCount; c++) {
    for (let r = 0; r < Juego.brickRowCount; r++) {
      const b = Juego.bricks[c][r];
      if (b.status >= 1) {
        if (Juego.x > b.x && Juego.x < b.x + Juego.brickWidth
          && Juego.y > b.y && Juego.y < b.y + Juego.brickHeight) {
          Juego.dy = -Juego.dy;
          b.status -= 1;
          Juego.score++;
          if (Juego.score === (Juego.brickRowCount * Juego.brickColumnCount) * 3) {
            alert(`Has ganado consiguiendo ${Juego.score} puntos, Felicidades!`);
            document.location.reload();
          }
        }
      }
    }
  }
}

export function physics(Juego) {
  collisionDetection(Juego);
  if (Juego.x + Juego.dx > Juego.canvas.width - Juego.ballRadius
    || Juego.x + Juego.dx < Juego.ballRadius) {
    Juego.dx = -Juego.dx;
  }
  if (Juego.y + Juego.dy < Juego.ballRadius) {
    Juego.dy = -Juego.dy;
  } else if (Juego.y > Juego.paddleY - Juego.ballRadius) {
    if (Juego.x + Juego.ballRadius > Juego.paddleX
      && Juego.x < Juego.paddleX + Juego.paddleWidth + Juego.ballRadius) {
      const hipotenusa = Math.hypot(
        (Juego.x - Juego.paddleX - Juego.paddleWidth / 2),
        Juego.y - Juego.paddleY,
      );
      Juego.dy = ((Juego.y - Juego.paddleY) / hipotenusa) * Juego.velocidad;
      Juego.dx = ((Juego.x - Juego.paddleX - Juego.paddleWidth / 2) / hipotenusa) * Juego.velocidad;
    } else {
      Juego.dead = true;
      Juego.lives--;
      Juego.x = Juego.canvas.width / 2;
      Juego.y = Juego.canvas.height - Juego.paddleHeight * 5;
      Juego.dx = 0;
      Juego.dy = 0;
      if (!Juego.lives) {
        alert('Unlucky Busta');
        document.location.reload();
      }
    }
  }


  if (Juego.rightPressed && Juego.paddleX < Juego.canvas.width - Juego.paddleWidth) {
    Juego.paddleX += 0.02 * Juego.canvas.width;
  } else if (Juego.leftPressed && Juego.paddleX > 0) {
    Juego.paddleX -= 0.02 * Juego.canvas.width;
  }

  Juego.x += Juego.dx;
  Juego.y += Juego.dy;
}
