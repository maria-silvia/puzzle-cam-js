function addEventListeners() {
  CANVAS.addEventListener("mousedown", onMouseDown);
  CANVAS.addEventListener("mousemove", onMouseMove);
  CANVAS.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(event) {
  SELECTED_PIECE = getPressedPiece(event);
  if (SELECTED_PIECE != null) {
    SELECTED_PIECE.offset = {
      x: event.x - SELECTED_PIECE.x,
      y: event.y - SELECTED_PIECE.y,
    };
  }
}

function onMouseMove(event) {
  if (SELECTED_PIECE != null) {
    SELECTED_PIECE.x = event.x - SELECTED_PIECE.offset.x;
    SELECTED_PIECE.y = event.y - SELECTED_PIECE.offset.y;
  }
}

function onMouseUp() {
  if (SELECTED_PIECE && SELECTED_PIECE.isCloseToTarget()) {
    SELECTED_PIECE.snapInPlace();
  }
  SELECTED_PIECE = null;
}

function getPressedPiece(cursor) {
  for (let i = 0; i < PIECES.length; i++) {
    if (
      cursor.x > PIECES[i].x &&
      cursor.x < PIECES[i].x + PIECES[i].width &&
      cursor.y > PIECES[i].y &&
      cursor.y < PIECES[i].y + PIECES[i].height
    ) {
      return PIECES[i];
    }
  }
  return null;
}
