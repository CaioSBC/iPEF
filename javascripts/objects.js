"use strict";

class Line2D {
    constructor(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    draw() {
        stroke("#c1c1c1");
        line(this.startX, this.startY, this.endX, this.endY);
    }
}