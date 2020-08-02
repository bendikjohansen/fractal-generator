import Screen from "./Screen";
import Animator from "./Animator";
import FractalGenerator from "./FractalGenerator";

const main = () => {
  const canvas = document.getElementById("root");
  const screen = new Screen(canvas);
  const animator = new Animator(screen);

  const initialFigure = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 0 },
  ];
  const fractalGenerator = new FractalGenerator(initialFigure);
  animator.setFractalGenerator(fractalGenerator);
  animator.start(fractalGenerator);
};

window.onload = main;
