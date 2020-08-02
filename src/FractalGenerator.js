import {
  rotate,
  translate,
  compose,
  applyToPoint,
} from "transformation-matrix";

class FractalGenerator {
  constructor(initialFigure) {
    this._figure = initialFigure;
    this._rotation = 0;
  }

  get figure() {
    return this._figure;
  }

  next() {
    this._rotation = Math.PI / 2;
    const oldPart = this.figure;

    const rotationMatrix = compose(rotate(this._rotation));
    const rotation = (point) => applyToPoint(rotationMatrix, point);
    const rotatedPart = oldPart.map(rotation);

    const distance = [
      oldPart[oldPart.length - 1].x - rotatedPart[0].x,
      oldPart[oldPart.length - 1].y - rotatedPart[0].y,
    ];
    const translationMatrix = compose(translate(distance[0], distance[1]));
    const translation = (point) => applyToPoint(translationMatrix, point);
    const newPart = rotatedPart.map(translation);

    this._figure = oldPart.concat(newPart);
  }
}

export default FractalGenerator;
