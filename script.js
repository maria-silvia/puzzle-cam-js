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
  for (let i = 0; i < PIECES.length; i++) {
    PIECES[i].draw(CONTEXT);
  }
  window.requestAnimationFrame(updateCanvas);
}

// Piece.js
let PUZZLE = {
  rows: 3,
  columns: 3,
  pieceWidth: null,
  pieceHeight: null,
};
let PIECES = [];

function initPieces() {
  PIECES = [];
  PUZZLE.pieceWidth = CANVAS.width / PUZZLE.columns;
  PUZZLE.pieceHeight = CANVAS.height / PUZZLE.rows;
  for (let r = 0; r < PUZZLE.rows; r++) {
    for (let c = 0; c < PUZZLE.columns; c++) {
      PIECES.push(new Piece(r, c));
    }
  }
}
class Piece {
  constructor(rowIndex, colIndex) {
    this.x = CANVAS.x + colIndex * PUZZLE.pieceWidth;
    this.y = CANVAS.y + rowIndex * PUZZLE.pieceHeight;
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }
  draw(context) {
    context.beginPath();
    context.rect(this.x, this.y, PUZZLE.pieceWidth, PUZZLE.pieceHeight);
    context.stroke();
  }
}
