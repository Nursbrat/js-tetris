export default class Controller {
  constructor(game, view) {
    this._game = game;
    this._view = view;
    this._isPlaying = false;
    this._interval = null;
    this.update = this.update.bind(this);

    view.on("keypress", this._handleKeypress.bind(this));
    view.on("keydown", this._handleKeydown.bind(this));
    view.on("keyup", this._handleKeyup.bind(this));
    this.view.renderStartScreen();
  }

  play() {
    this._isPlaying = false;
    this._stopTimer();
    this._updateView();
  }

  reset() {
    this._game.reset();
    this.play();
  }
  pause() {
    this._isPlaying = false;
    this._stopTimer();
    this._updateView();
  }
  update() {
    this._game.movePieceDown();
    this._updateView();
  }

  _updateView() {
    const state = this._game.state;

    if (state.isGaveOver) {
      this._view.renderStartScreen(state);
    } else if (!this._isPlaying) {
      this._view.renderPauseScreen(state);
    } else {
      this._view.renderMainScreen(state);
    }
  }

  _startTimer() {
    const speed = 1000 - this._game.level * 100;

    if (!this._interval) {
      this._interval = setInterval(this.update(), speed > 0 ? speed : 100);
    }
  }
  _stopTimer() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  _handleKeypress(event) {
    switch (event.keyCode) {
      case 13: //Enter
        if (this._game.state.isGameOver) {
          this.reset();
        } else if (this._isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
    }
  }

  _handleKeydown(event) {
    switch (event.keyCode) {
      case 37: // LEFT ARROW
        this._game.movePieceLeft();
        this._updateView();
        break;
      case 38: // UP ARROW
        this._game.rotatePiece();
        this._updateView();
        break;
      case 39: // RIGHT ARROW
        this._game.movePieceRight();
        this._updateView();
        break;
      case 40: // DOWN ARROW
        this._stopTimer();
        this._game.movePieceDown();
        this._updateView();
        break;
    }
  }

  _handleKeyup(event) {
    switch (event.keyCode) {
      case 40: //DOWN ARROW
        this._startTimer();
        break;
    }
  }
}
