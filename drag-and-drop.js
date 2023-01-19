function addDragDropEventListeners() {
  CANVAS.addEventListener("mousedown", onMouseDown);
  CANVAS.addEventListener("mousemove", onMouseMove);
  CANVAS.addEventListener("mouseup", onMouseUp);
  // mobile support:
  CANVAS.addEventListener("touchstart", onMouseDown);
  CANVAS.addEventListener("touchmove", onMouseMove);
  CANVAS.addEventListener("touchend", onMouseUp);
}

function onMouseDown(event) {
  event = convertIfTouchEvent(event);
  SELECTED_PIECE = getPressedPiece(event);
  if (SELECTED_PIECE != null) {
    const index = PIECES.indexOf(SELECTED_PIECE);
    PIECES.splice(index, 1);
    PIECES.push(SELECTED_PIECE);
    SELECTED_PIECE.offset = {
      x: event.x - SELECTED_PIECE.x,
      y: event.y - SELECTED_PIECE.y,
    };
  }
}

function onMouseMove(event) {
  event = convertIfTouchEvent(event);
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

function getPressedPiece(player) {
  // top pieces are at end of array, bottom pieces at start
  for (let i = PIECES.length - 1; i >= 0; i--) {
    if (
      player.x > PIECES[i].x &&
      player.x < PIECES[i].x + PIECES[i].width &&
      player.y > PIECES[i].y &&
      player.y < PIECES[i].y + PIECES[i].height
    ) {
      return PIECES[i];
    }
  }
  return null;
}
