"use strict";

function outputMessage(message) {
    document.getElementById("output").innerHTML = message;
}

function updatePosition(posX, posY) {
    document.getElementById("position").innerHTML = "X: " + posX + "</br>" + "Y: " + posY;
}