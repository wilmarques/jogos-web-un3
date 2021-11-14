// @ts-check

const canvas = document.getElementById('exemplo');

let x = 0;
let y = 300;

if (canvas instanceof HTMLCanvasElement) {

  const ctx = canvas.getContext('2d');

  canvas.addEventListener('click', (e) => trataClique(ctx, e));
  document.addEventListener('keydown', (e) => trataTeclas(canvas, ctx, e));

  desenha(x, y, canvas, ctx);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {MouseEvent} e
 */
function trataClique(ctx, e) {
  ctx.beginPath();
  ctx.arc(e.clientX, e.clientY, 20, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {KeyboardEvent} e
 */
function trataTeclas(canvas, ctx, e) {

  const codigoTecla = e.keyCode;
  const movimento = {
    esquerda: 37,
    cima: 38,
    direita: 39,
    baixo: 40,
  };

  switch (codigoTecla) {
    case movimento.esquerda:
      x -=10;
      break;
    case movimento.direita:
      x +=10;
      break;
    case movimento.cima:
      y -=10;
      break;
    case movimento.baixo:
      y +=10;
      break;
  }

  desenha(x, y, canvas, ctx);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 */
function desenha(x, y, canvas, ctx) {
  const { width: w, height: h } = canvas;
  ctx.clearRect(0, 0, w, h);
  ctx.fillRect(x, y, 30, 30);
}
