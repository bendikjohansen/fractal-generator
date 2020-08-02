import Screen from "./Screen";
import FractalGenerator from "./FractalGenerator";

class Animator {
  /**
   *
   * @param {Screen} screen
   */
  constructor(screen) {
    this._screen = screen;
    this._bufferCtx = document.createElement("canvas").getContext("2d");
    this._bufferCtx.canvas.width = this._screen.width;
    this._bufferCtx.canvas.height = this._screen.height;
    this._translation = [this._screen.width / 2, this._screen.height / 2];
  }

  setFractalGenerator(generator) {
    this._fractalGenerator = generator;
  }

  start() {
    if (this._fractalGenerator === undefined) {
      throw new Error("Set a fractal generator before starting the animator.");
    }

    this._updates = setInterval(() => {
      this._update();
      this._draw();
    }, 1000 / 2);
  }

  _update() {
    this._fractalGenerator.next();
    if (this._fractalGenerator.figure.length > 500000) {
      clearInterval(this._updates);
    }
  }

  _draw() {
    const ctx = this._bufferCtx;
    const figure = this._fractalGenerator.figure;

    const size = 3;
    // ctx.scale(0.9, 0.9);
    // this._translation = [
    //   this._translation[0] +
    //     this._screen.width / 2 -
    //     this._translation[0] * 0.9,
    //   this._translation[1] +
    //     this._screen.height / 2 -
    //     this._translation[1] * 0.9,
    // ];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.translate(this._translation[0], this._translation[1]);
    figure.forEach(({ x, y }) => {
      ctx.fillRect(x * size, y * size, size, size);
    });
    ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);

    this._screen.clearScreen();
    this._screen.ctx.drawImage(ctx.canvas, 0, 0);
  }
}

export default Animator;
