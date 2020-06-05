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

class Load2D {
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

    draw() {
        if (this._magnitudeX == 0 && this._magnitudeY == 0) {
            return;
        }

        let sizeX = this._endX - this.startX;
        let sizeY = this._endY - this.startY;

        let deltaX = 0;
        let deltaY = 0;

        let fixDeltaX = sizeX / 5;
        let fixDeltaY = sizeY / 5;

        let vAux1 = createVector(this._startX + this._magnitudeX, this._startY + this._magnitudeY);
        let vAux2 = createVector(this._startX, this._startY);
        
        while ((this._startX + deltaX) != this._endX || (this._startY + deltaY) != this._endY) {
            let vResult = p5.Vector.sub(vAux2, vAux1);
            drawArrow(vAux1, vResult, 'blue');

            deltaX = deltaX + fixDeltaX;
            deltaY = deltaY + fixDeltaY;

            vAux1 = createVector((this._startX + deltaX) + this.magnitudeX, (this._startY + deltaY) + this.magnitudeY);
            vAux2 = createVector(this._startX + deltaX, this.startY + deltaY);
       }
    }
}

class Point {
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

    draw() {
        stroke("#c1c1c1");
        strokeWeight(5);
        point(this._x, this._y);
    }
}

class Force2D {
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

    draw() {
        if (this._magnitudeX == 0 && this._magnitudeY == 0) {
            return;
        }

        stroke(255,0,0);
        strokeWeight(3);

        let vStart= createVector(this._x, this._y);
        let vEnd = createVector(this._x + this._magnitudeX, this._y + this._magnitudeY);
        let vResult= p5.Vector.sub(vEnd,vStart);
        drawArrow(vStart, vResult, 'red');
    }
}

class SimpleSupport {
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

    draw() {
        stroke('green');

        switch(this._direction) {
            case "esquerda":
                fill("#2c2c2c");
                triangle(this._x, this._y, this._x + 20, this._y + 20, this._x + 20, this._y - 20);
                line(this._x+ 30, this._y + 20, this._x + 30, this._y - 20);
                break;
            case "direita":
                fill("#2c2c2c");
                triangle(this._x, this._y, this._x - 20, this._y + 20, this._x - 20, this._y  - 20);
                line(this._x - 30, this._y + 20, this._x - 30, this._y - 20);
                break;
            case "cima":
                fill("#2c2c2c");
                triangle(this._x, this._y, this._x + 20, this._y + 20, this._x - 20, this._y + 20);
                line(this._x + 20, this._y + 30, this._x - 20, this._y + 30);
                break;
            case "baixo":
                fill("#2c2c2c");
                triangle(this._x, this._y, this._x + 20, this._y - 20, this._x - 20, this._y - 20);
                line(this._x + 20, this._y - 30, this._x - 20, this._y - 30);
                break;
            default:
                break;
        }
    }
}

class PinnedSupport {
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

    draw() {
        stroke('green');

        switch(this._direction) {
            case "esquerda":
                fill("#2c2c2c");
                triangle(this._x, this._y, this._x + 20, this._y + 20, this._x + 20, this._y - 20);
                break;
            case "direita":
                fill("#2c2c2c");
                triangle(this._x, this._y, this._x - 20, this._y + 20, this._x - 20, this._y  - 20);
                break;
            case "cima":
                fill("#2c2c2c");
                triangle(this._x, this._y, this._x + 20, this._y + 20, this._x - 20, this._y + 20);
                break;
            case "baixo":
                fill("#2c2c2c");
                triangle(this._x, this._y, this._x + 20, this._y - 20, this._x - 20, this._y - 20);
                break;
            default:
                break;
        }
    }
}

class FixedSupport {
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

    draw() {
        stroke('green');

        if (this._direction == "esquerda" || "direita") {
            line(this._x, this._y + 30, this._x, this._y - 30);
        } else {
            line(this._x + 30, this._y, this._x - 30, this._y);
        }
    }
}