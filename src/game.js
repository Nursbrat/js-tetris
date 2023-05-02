import Playfield from "./playfield";
import Piece from "./piece";

export default class Game {
  static points = {
    '1': 40,
    '2': 100,
    '3': 300,
    '4': 1200,
  };

  _score = 0;
  _lines = 0;
  _topOut = false;
  _activePiece = null;
  _nextPiece = null;


  constructor(rows, columns) {
    this._playfield = new Playfield(rows, columns);
    this._updatePieces();
  }


  get level() {
    return Math.floor(this._lines * 0.1);
  }


  get state() {
    return {
      score: this._score,
      level: this.level,
      lines: this._lines,
      playfield: this._playfield,
      activePiece: this._activePiece,
      nextPiece: this._nextPiece,
      isGameOver: this._topOut,
    };
  }

  reset() {
    this._score = 0;
    this._lines = 0;
    this._topOut = false;
    this._playfield.reset();
    this._updatePieces();
  }

  movePieceLeft() {
    this._activePiece.x -= 1;
    if (this._playfield.hasCollisions(this._activePiece)) {
      this._activePiece.x -= 1;
    }
  }

  movePieceRight() {
    this._activePiece.x += 1;

    if (this._playfield.hasCollisions(this._activePiece)) {
      this._activePiece.x -= 1;
    }
  }

  movePieceDown() {
    if (this._topOut) return;

    this.activePiece.y += 1;

    if (this._playfield.hasCollisions(this.activePiece)) {
      this.activePiece.y -= 1;
      this._update();
    }
  }

  _update() {
    this._updatePlayfield();
    this._updateScore();
    this._updatePieces();

    if (this._playfield.hasCollisions(this._activePiece)) {
      this._topOut = true;
    }
  }

  rotatePiece() {
    this._activePiece.rotate();

    if (this.playfield.hasCollisions(this._activePiece)) {
      this._activePiece.rotate(false);
    }
  }

  _updatePlayfield() {
    this._playfield.lockPieces(this._activePieces);
  }

  _updateScore() {
    const clearedLines = this._playfield.clearLines();

    if (clearedLines > 0) {

      this._score += Game.points[clearedLines] + [this.level + 1];
      this._lines += clearedLines;
    }
  }

  _updatePieces() {
    this._activePiece = this.nextPiece || new Piece();
    this._nextPiece = new Piece();
    this._activePiece.x = Math.floor(
      (this._playfield.columns - this._activePiece.width) / 2
    );
    this._activePiece.y = -1;

  }
}
