let VIDEO = null;
let CONTEXT = null;
let SCALER = 0.8; // screen space used by the image

let CANVAS = {
  element: null,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

let PUZZLE = {
  rows: 3,
  columns: 3,
  pieceWidth: null,
  pieceHeight: null,
};

let PIECES = [];

function main() {
  initCanvas();
  initCamera();
}

function updateCanvas() {
  CONTEXT.drawImage(VIDEO, CANVAS.x, CANVAS.y, CANVAS.width, CANVAS.height);
  for (let i = 0; i < PIECES.length; i++) {
    PIECES[i].draw(CONTEXT);
  }
  window.requestAnimationFrame(updateCanvas);
}
