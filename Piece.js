class Piece {
  constructor(rowIndex, colIndex) {
    this.width = BASE.width / PUZZLE.columns;
    this.height = BASE.height / PUZZLE.rows;

    this.x = BASE.x + colIndex * this.width;
    this.y = BASE.y + rowIndex * this.height;

    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }

  draw(context) {
    context.beginPath();
    let cropWidth = VIDEO.videoWidth / PUZZLE.columns;
    let cropHeight = VIDEO.videoHeight / PUZZLE.rows;
    let cropX = cropWidth * this.colIndex;
    let cropY = cropHeight * this.rowIndex;
    CONTEXT.drawImage(
      VIDEO,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // contorno
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
  }
}
