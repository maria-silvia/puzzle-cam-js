let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.8; // screen space used by the image

//  base do puzzle, onde ele deve ser montado
let BASE = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

let PUZZLE = {
  rows: 3,
  columns: 3,
};

let PIECES = [];

function main() {
  initCanvas();
  initCamera();
}

function updateCanvas() {
  CONTEXT.drawImage(VIDEO, BASE.x, BASE.y, BASE.width, BASE.height);
  for (let i = 0; i < PIECES.length; i++) {
    PIECES[i].draw(CONTEXT);
  }
  window.requestAnimationFrame(updateCanvas);
}
