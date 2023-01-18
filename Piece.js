class Piece {
  constructor(rowIndex, colIndex) {
    this.x = BASE.x + colIndex * PUZZLE.pieceWidth;
    this.y = BASE.y + rowIndex * PUZZLE.pieceHeight;
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }

  draw(context) {
    context.beginPath();
    context.rect(this.x, this.y, PUZZLE.pieceWidth, PUZZLE.pieceHeight);
    context.stroke();
  }
}
