import { drawArrow } from "./utils";

import { Vector } from "p5";

export class Line2D {
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

    draw(p5) {
        p5.stroke("#c1c1c1");
        p5.strokeWeight(3);
        p5.line(this._startX, this._startY, this._endX, this._endY);
    }
}

export class Load2D {
    constructor(magnitudeX, magnitudeY, startX, startY, endX, endY) {
        this._magnitudeX = magnitudeX;
        this._magnitudeY = magnitudeY;
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

    get magnitudeX() {
        return this._magnitudeX;
    }

    get magnitudeY() {
        return this._magnitudeY;
    }

    draw(p5) {
        if (this._magnitudeX == 0 && this._magnitudeY == 0) {
            return;
        }

        let sizeX = this._endX - this.startX;
        let sizeY = this._endY - this.startY;

        let deltaX = 0;
        let deltaY = 0;

        let fixDeltaX = sizeX / 20;
        let fixDeltaY = sizeY / 20;

        let vAux1 = p5.createVector(this._startX + this._magnitudeX, this._startY + this._magnitudeY);
        let vAux2 = p5.createVector(this._startX, this._startY);

        while ((this._startX + deltaX) != (this._endX + fixDeltaX) || (this._startY + deltaY) != (this._endY + fixDeltaY)) {
            let vResult = Vector.sub(vAux2, vAux1);
            drawArrow(p5, vAux1, vResult, "#346DC3");

            deltaX = deltaX + fixDeltaX;
            deltaY = deltaY + fixDeltaY;

            vAux1 = p5.createVector((this._startX + deltaX) + this.magnitudeX, (this._startY + deltaY) + this.magnitudeY);
            vAux2 = p5.createVector(this._startX + deltaX, this.startY + deltaY);
       }
    }
}

export class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    draw(p5) {
        p5.stroke("#c1c1c1");
        p5.strokeWeight(5);
        p5.point(this._x, this._y);
    }
}

export class Force2D {
    constructor(x, y, magnitudeX, magnitudeY) {
        this._x = x;
        this._y = y;
        this._magnitudeX = magnitudeX;
        this._magnitudeY = magnitudeY;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get magnitudeX() {
        return this._magnitudeX;
    }

    get magnitudeY() {
        return this._magnitudeY;
    }

    draw(p5) {
        if (this._magnitudeX == 0 && this._magnitudeY == 0) {
            return;
        }

        p5.stroke("#F14C42");
        p5.strokeWeight(3);

        let vStart= p5.createVector(this._x, this._y);
        let vEnd = p5.createVector(this._x + this._magnitudeX, this._y + this._magnitudeY);
        let vResult = Vector.sub(vEnd, vStart);

        drawArrow(p5, vStart, vResult, "#F14C42");
    }
}

export class SimpleSupport {
    constructor(x, y, direction) {
        this._x = x;
        this._y = y;
        this._direction = direction;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get direction() {
        return this._direction;
    }

    draw(p5) {
        p5.stroke("#309339");
        p5.strokeWeight(5);

        switch(this._direction) {
            case "esquerda":
                p5.fill("#2c2c2c");
                p5.triangle(this._x, this._y, this._x + 20, this._y + 20, this._x + 20, this._y - 20);
                p5.line(this._x+ 30, this._y + 20, this._x + 30, this._y - 20);
                break;
            case "direita":
                p5.fill("#2c2c2c");
                p5.triangle(this._x, this._y, this._x - 20, this._y + 20, this._x - 20, this._y  - 20);
                p5.line(this._x - 30, this._y + 20, this._x - 30, this._y - 20);
                break;
            case "cima":
                p5.fill("#2c2c2c");
                p5.triangle(this._x, this._y, this._x + 20, this._y + 20, this._x - 20, this._y + 20);
                p5.line(this._x + 20, this._y + 30, this._x - 20, this._y + 30);
                break;
            case "baixo":
                p5.fill("#2c2c2c");
                p5.triangle(this._x, this._y, this._x + 20, this._y - 20, this._x - 20, this._y - 20);
                p5.line(this._x + 20, this._y - 30, this._x - 20, this._y - 30);
                break;
            default:
                break;
        }
    }
}

export class PinnedSupport {
    constructor(x, y, direction) {
        this._x = x;
        this._y = y;
        this._direction = direction;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get direction() {
        return this._direction;
    }

    draw(p5) {
        p5.stroke("#309339");
        p5.strokeWeight(5);

        switch(this._direction) {
            case "esquerda":
                p5.fill("#2c2c2c");
                p5.triangle(this._x, this._y, this._x + 20, this._y + 20, this._x + 20, this._y - 20);
                break;
            case "direita":
                p5.fill("#2c2c2c");
                p5.triangle(this._x, this._y, this._x - 20, this._y + 20, this._x - 20, this._y  - 20);
                break;
            case "cima":
                p5.fill("#2c2c2c");
                p5.triangle(this._x, this._y, this._x + 20, this._y + 20, this._x - 20, this._y + 20);
                break;
            case "baixo":
                p5.fill("#2c2c2c");
                p5.triangle(this._x, this._y, this._x + 20, this._y - 20, this._x - 20, this._y - 20);
                break;
            default:
                break;
        }
    }
}

export class FixedSupport {
    constructor(x, y, direction) {
        this._x = x;
        this._y = y;
        this._direction = direction;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get direction() {
        return this._direction;
    }

    draw(p5) {
        p5.stroke("#309339");
        p5.strokeWeight(5);

        if (this._direction == "esquerda" || "direita") {
            p5.line(this._x, this._y + 30, this._x, this._y - 30);
        } else {
            p5.line(this._x + 30, this._y, this._x - 30, this._y);
        }
    }
}
