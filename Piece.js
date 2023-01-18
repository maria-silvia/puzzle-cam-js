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
