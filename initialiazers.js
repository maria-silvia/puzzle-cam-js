function initCanvas() {
  CANVAS = document.getElementById("myCanvas");
  CONTEXT = CANVAS.getContext("2d");
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
        initPieces();
        updateCanvas();
      };
    })
    .catch((err) => {
      alert("Camera error: " + err);
    });
}

function scaleCanvas() {
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
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
  randomizePieces();
}

function randomizePieces() {
  for (let i = 0; i < PIECES.length; i++) {
    // the random generates number between 0 and 1
    // so need to scale:
    let x = Math.random() * (CANVAS.width - PIECES[i].width);
    let y = Math.random() * (CANVAS.height - PIECES[i].height);
    PIECES[i].x = x;
    PIECES[i].y = y;
  }
}
