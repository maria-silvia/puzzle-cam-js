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
  rows: 5,
  columns: 4,
};

let PIECES = [];
let SELECTED_PIECE = null;
let TRANSPARENCY = 0.1;

/*------------------------------------------------*/

function main() {
  initCanvas();
  initCamera();
  addEventListeners();
}

// this method runs all the time as it makes an Animation
function updateCanvas() {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);

  // TIP translucid image for easy mode
  CONTEXT.globalAlpha = TRANSPARENCY;
  CONTEXT.drawImage(VIDEO, BASE.x, BASE.y, BASE.width, BASE.height);
  CONTEXT.globalAlpha = 1;

  for (let i = 0; i < PIECES.length; i++) {
    PIECES[i].draw(CONTEXT);
  }
  window.requestAnimationFrame(updateCanvas);
}
