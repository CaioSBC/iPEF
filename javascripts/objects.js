"use strict";

class Line2D {
    constructor(startX, startY, endX, endY) {
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
    }

    get startX() {
        return this._startX;
    }

    get startY() {
        return this._startY;
    }

    get endX() {
        return this._endX;
    }

    get endY() {
        return this._endY;
    }

    draw() {
        stroke("#c1c1c1");
        strokeWeight(3);
        line(this._startX, this._startY, this._endX, this._endY);
    }
}