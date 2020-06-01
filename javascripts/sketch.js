function setup() {
  var width = document.getElementById("canvas").offsetWidth;
  var height = document.getElementById("canvas").offsetHeight;
  var customCanvas = createCanvas(width, height);
  customCanvas.parent("canvas");
  windowResized();
}

function draw() {
  line(100,100, 200,200);
  stroke("#c1c1c1");
}

function windowResized() {
  var width = document.getElementById("canvas").offsetWidth;
  var height = document.getElementById("canvas").offsetHeight;
  resizeCanvas(width, height);
}