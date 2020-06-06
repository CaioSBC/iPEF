const outputMessage = (message) => {
    document.getElementById("output").innerHTML = message;
}

const updatePosition = (posX, posY) => {
    document.getElementById("position").innerHTML = "X: " + posX + "</br>" + "Y: " + posY;
}

const drawArrow = (p5, base, vec, myColor) => {
    p5.push();
    p5.stroke(myColor);
    p5.strokeWeight(3);
    p5.translate(base.x, base.y);
    p5.fill(myColor);
    p5.line(0, 0, vec.x, vec.y);
    p5.rotate(vec.heading());

    let arrowSize = 7;
    p5.translate(vec.mag() - arrowSize, 0);
    p5.triangle(0, arrowSize / 2, 0, - arrowSize / 2, arrowSize, 0);
    p5.pop();
  }

export {
    outputMessage,
    updatePosition,
    drawArrow,
}
