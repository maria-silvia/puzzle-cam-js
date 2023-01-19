class Piece {
  constructor(rowIndex, colIndex) {
    this.width = BASE.width / PUZZLE.columns;
    this.height = BASE.height / PUZZLE.rows;

    this.target_x = BASE.x + colIndex * this.width;
    this.target_y = BASE.y + rowIndex * this.height;

    this.x = this.target_x;
    this.y = this.target_y;

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

  isCloseToTarget() {
    let threshold = Math.min(this.width / 3, this.height / 3);
    let cursor = { x: this.x, y: this.y };
    let target = { x: this.target_x, y: this.target_y };
    if (distance(cursor, target) < threshold) {
      return true;
    }
    return false;
  }

  snapInPlace() {
    this.x = this.target_x;
    this.y = this.target_y;
  }
}
