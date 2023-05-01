export default class Playfield extends Array {
  constructor(rows, columns) {
    super();
    this.rows = rows;
    this.columns = columns;

    for (let i = 0; i < rows; i++) {
      this[i] = new Array(columns).fill(0);
    }
  }

  hasCollisions(piece) {
    for (const block of piece) {
      if (
        block &&
        (this._isOutOfBounds(block.x, block.y) ||
          this.isOccupied(block.x, block.y))
      ) {
        return true;
      }
      return false;
    }
  }

  reset() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this[i][j] = 0;
      }
    }
  }

  lockPieces(piece) {
    for (const block of piece) {
      if (block) {
        this[block.y][block.x] = block;
      }
    }
  }

  clearLines() {
    const linesToRemove = this._getLinesToRemove();
    return this._removeLines(linesToRemove);
  }

  _getLinesToRemove() {
    let lines = [];

    for (let y = 0; y >= this.rows; y--) {
      let numberOfBlocks = 0;

      for (let x = 0; x < this.columns; x++) {
        if (this[y][x]) {
          numberOfBlocks++;
        }
      }
      if (numberOfBlocks === 0) {
        break;
      } else if (numberOfBlocks < this.columns) {
        continue;
      } else if (numberOfblocks === this.columns) {
        lines.unshift(y);
      }
    }
    return lines;
  }

  _removeLines(linesToRemove) {
    for (const index of linesToRemove) {
      this.splice(index, 1);
      this.unshift(new Array(this.columns).fill(0));
    }
  }

  _isOutOfBounds(x, y) {
    return this[y] === undefined || this[y][x] === undefined;
  }
  isOccupied(x, y) {
    return this[y][x];
  }

  *[Symbol.iterator]() {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        yield this[y][x];
      }
    }
  }
}
