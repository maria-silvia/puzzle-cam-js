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
