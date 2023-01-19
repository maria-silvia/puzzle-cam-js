function initCanvas() {
  CANVAS = document.getElementById("myCanvas");
  CONTEXT = CANVAS.getContext("2d");
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
}

function initCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (signal) {
      VIDEO = document.createElement("video");
      VIDEO.srcObject = signal;
      VIDEO.play();
      VIDEO.onloadeddata = function () {
        scaleBase();
        start();
        // window.addEventListener("resize", scaleBase);
      };
    })
    .catch((err) => {
      alert("Camera error: " + err);
    });
}

function scaleBase() {
  let resizer =
    SCALER *
    Math.min(
      window.innerWidth / VIDEO.videoWidth,
      window.innerHeight / VIDEO.videoHeight
    );
  BASE.width = resizer * VIDEO.videoWidth;
  BASE.height = resizer * VIDEO.videoHeight;
  BASE.x = window.innerWidth / 2 - BASE.width / 2;
  BASE.y = window.innerHeight / 2 - BASE.height / 2;
}

function initPieces() {
  PIECES = [];
  for (let r = 0; r < PUZZLE.rows; r++) {
    for (let c = 0; c < PUZZLE.columns; c++) {
      PIECES.push(new Piece(r, c));
    }
  }
}
