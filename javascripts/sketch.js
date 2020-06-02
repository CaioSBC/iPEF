"use strict";

let SIMULATION;

function setup() {
  let width = document.getElementById("canvas").offsetWidth;
  let height = document.getElementById("canvas").offsetHeight;
  let customCanvas = createCanvas(width, height);
  customCanvas.parent("canvas");
  windowResized();

  outputMessage("Bem-vindo ao iPEF, o software de análise de estruturas 2D para PEF3208");

  SIMULATION = new Simulation();
  SIMULATION.addObject(new Line2D(100, 100, 200, 200));
}

function draw() {
  SIMULATION.draw();
}

function windowResized() {
  let width = document.getElementById("canvas").offsetWidth;
  let height = document.getElementById("canvas").offsetHeight;
  resizeCanvas(width, height);
}