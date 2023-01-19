/*------------------------------------------------*/
/*            GLOBAL VARIABLES                    */
let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.8; // screen space used by the image

//  base do puzzle, onde ele deve ser montado
let BASE = {
  x: 0, // x e y de canto superior esquerdo
  y: 0,
  width: 0,
  height: 0,
};

let PUZZLE = {
  rows: 3,
  columns: 6,
};

let PIECES = [];
let SELECTED_PIECE = null;
let TRANSPARENCY = 0.2;

/*------------------------------------------------*/

function main() {
  initCanvas();
  initCamera();
  addDragDropEventListeners();
  setSlider();
}

// this method runs all the time as it makes an Animation
function updateCanvas() {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  drawBaseOutline();
  drawTransparentVideo();
  drawPieces();
  window.requestAnimationFrame(updateCanvas);
}

function drawBaseOutline() {
  CONTEXT.lineWidth = 0.2;
  CONTEXT.rect(BASE.x, BASE.y, BASE.width, BASE.height);
  CONTEXT.stroke();
  CONTEXT.lineWidth = 1;
}

function drawTransparentVideo() {
  CONTEXT.globalAlpha = TRANSPARENCY;
  CONTEXT.drawImage(VIDEO, BASE.x, BASE.y, BASE.width, BASE.height);
  CONTEXT.globalAlpha = 1;
}

function drawPieces() {
  for (let i = 0; i < PIECES.length; i++) {
    PIECES[i].draw(CONTEXT);
  }
}
