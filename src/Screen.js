class Screen {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this._ctx = canvas.getContext("2d");
    canvas.width = this._getComputedProperty((style) => style.width);
    canvas.height = this._getComputedProperty((style) => style.height);
  }

  get ctx() {
    return this._ctx;
  }

  get width() {
    return this._ctx.canvas.width;
  }

  get height() {
    return this._ctx.canvas.height;
  }

  clearScreen() {
    this._ctx.clearRect(0, 0, this.width, this.height);
  }

  _getComputedProperty(callback) {
    const style = getComputedStyle(this._ctx.canvas);
    return parseInt(callback(style).split("px")[0]);
  }
}

export default Screen;
