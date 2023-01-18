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
  rows: 5,
  columns: 5,
};

let PIECES = [];

function main() {
  initCanvas();
  initCamera();
}

// this method runs all the time as it is an Animation
function updateCanvas() {
  // this used to draw the video over the BASE
  // CONTEXT.drawImage(VIDEO, BASE.x, BASE.y, BASE.width, BASE.height);

  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  for (let i = 0; i < PIECES.length; i++) {
    PIECES[i].draw(CONTEXT);
  }
  window.requestAnimationFrame(updateCanvas);
}

function randomizePieces() {
  for (let i = 0; i < PIECES.length; i++) {
    // the random generates number between 0 and 1
    // so need to scale
    let x = Math.random() * (CANVAS.width - PIECES[i].width);
    let y = Math.random() * (CANVAS.height - PIECES[i].height);
    PIECES[i].x = x;
    PIECES[i].y = y;
  }
}
