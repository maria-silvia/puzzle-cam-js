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

function main() {
  initCanvas();
  initCamera();
}

function initCanvas() {
  CANVAS.element = document.getElementById("myCanvas");
  CONTEXT = CANVAS.element.getContext("2d");
}

function initCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (signal) {
      VIDEO = document.createElement("video");
      VIDEO.srcObject = signal;
      VIDEO.play();
      VIDEO.onloadeddata = function () {
        scaleCanvas();
        // window.addEventListener("resize", scaleCanvas);
        updateCanvas();
      };
    })
    .catch((err) => {
      alert("Camera error: " + err);
    });
}

function scaleCanvas() {
  CANVAS.element.width = window.innerWidth;
  CANVAS.element.height = window.innerHeight;
  let resizer =
    SCALER *
    Math.min(
      window.innerWidth / VIDEO.videoWidth,
      window.innerHeight / VIDEO.videoHeight
    );
  CANVAS.width = resizer * VIDEO.videoWidth;
  CANVAS.height = resizer * VIDEO.videoHeight;
  CANVAS.x = window.innerWidth / 2 - CANVAS.width / 2;
  CANVAS.y = window.innerHeight / 2 - CANVAS.height / 2;
}

function updateCanvas() {
  CONTEXT.drawImage(VIDEO, CANVAS.x, CANVAS.y, CANVAS.width, CANVAS.height);
  window.requestAnimationFrame(updateCanvas);
}

// Piece.js
let PUZZLE = {
  rows: 3,
  columns: 3,
};
let PIECES = [];

function initializePieces(params) {
  PIECES = [];
  for (let r = 0; r < PUZZLE.rows; r++) {
    for (let c = 0; c < PUZZLE.cols; c++) {
      PIECES.push(new Piece(i, j));
    }
  }
}
class Piece {
  constructor(rowIndex, colIndex) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    // calculate coordenates
    this.x = CANVAS.x + (CANVAS.width * this.colIndex) / PUZZLE.columns;
    this.y = CANVAS.y + (CANVAS.height * this.rowIndex) / PUZZLE.rows;
  }
  draw(context) {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
  }
}
