"use strict";

function outputMessage(message) {
    document.getElementById("output").innerHTML = message;
}

function updatePosition(posX, posY) {
    document.getElementById("position").innerHTML = "X: " + posX + "</br>" + "Y: " + posY;
}

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    translate(base.x, base.y);
    fill(myColor);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }