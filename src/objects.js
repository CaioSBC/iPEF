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

    draw(p5, simulation) {
        let pixelStartX = simulation.customToBaseX(this._startX);
        let pixelStartY = simulation.customToBaseY(this._startY);
        let pixelEndX = simulation.customToBaseX(this._endX);
        let pixelEndY = simulation.customToBaseY(this._endY);

        p5.stroke("#c1c1c1");
        p5.strokeWeight(3);
        p5.line(pixelStartX, pixelStartY, pixelEndX, pixelEndY);
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

    draw(p5, simulation) {
        let pixelMagnitudeX = simulation.customToBaseDistX(this._magnitudeX, "load");
        let pixelMagnitudeY = simulation.customToBaseDistY(this._magnitudeY, "load");
        let pixelStartX = simulation.customToBaseX(this._startX);
        let pixelStartY = simulation.customToBaseY(this._startY);
        let pixelEndX = simulation.customToBaseX(this._endX);
        let pixelEndY = simulation.customToBaseY(this._endY);

        if (pixelMagnitudeX == 0 && pixelMagnitudeY == 0) {
            return;
        }

        let sizeX = pixelEndX - pixelStartX;
        let sizeY = pixelEndY - pixelStartY;

        let deltaX = 0;
        let deltaY = 0;

        let fixDeltaX = sizeX / 20;
        let fixDeltaY = sizeY / 20;

        let vStart = p5.createVector(pixelStartX - pixelMagnitudeX, pixelStartY - pixelMagnitudeY);
        let vEnd = p5.createVector(pixelStartX, pixelStartY);


        p5.textSize(30);
        p5.stroke('#3A57FA');
        p5.strokeWeight(4);
        let magnitude = p5.sqrt((this._magnitudeX*this._magnitudeX)+(this._magnitudeY*this._magnitudeY));
        p5.text(magnitude.toFixed(2)+ 'N/m',(pixelStartX+((pixelEndX-pixelStartX)/2))-35*this._magnitudeX-50,(pixelStartY+((pixelEndY-pixelStartY)/2)) + 20*this._magnitudeY);

        while ((pixelStartX + deltaX) != (pixelEndX + fixDeltaX) || (pixelStartY + deltaY) != (pixelEndY + fixDeltaY)) {
            let vResult = Vector.sub(vEnd, vStart);
            drawArrow(p5, vStart, vResult, "#346DC3");

            deltaX = deltaX + fixDeltaX;
            deltaY = deltaY + fixDeltaY;

            vStart = p5.createVector((pixelStartX + deltaX) - pixelMagnitudeX, (pixelStartY + deltaY) - pixelMagnitudeY);
            vEnd = p5.createVector(pixelStartX + deltaX, pixelStartY + deltaY);
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

    draw(p5, simulation) {
        let pixelX = simulation.customToBaseX(this._x);
        let pixelY = simulation.customToBaseY(this._y);

        p5.stroke("#c1c1c1");
        p5.strokeWeight(5);
        p5.point(pixelX, pixelY);
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

    draw(p5, simulation) {
        let pixelX = simulation.customToBaseX(this._x);
        let pixelY = simulation.customToBaseY(this._y);
        let pixelMagnitudeX = simulation.customToBaseDistX(this._magnitudeX, "force");
        let pixelMagnitudeY = simulation.customToBaseDistY(this._magnitudeY, "force");

        if (pixelMagnitudeX == 0 && pixelMagnitudeY == 0) {
            return;
        }
        p5.textSize(30);
        p5.stroke('#FA3D3A');
        p5.strokeWeight(4);
        let magnitude = p5.sqrt((this._magnitudeX*this._magnitudeX)+(this._magnitudeY*this._magnitudeY));
        p5.text(magnitude.toFixed(2)+ ' N',pixelX - 1.5*pixelMagnitudeX,pixelY - 1.5*pixelMagnitudeY);
        p5.stroke("#F14C42");
        p5.strokeWeight(3);
        
        let vStart = p5.createVector(pixelX - pixelMagnitudeX, pixelY - pixelMagnitudeY);
        let vEnd= p5.createVector(pixelX, pixelY);
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

    draw(p5, simulation) {
        let pixelX = simulation.customToBaseX(this._x);
        let pixelY = simulation.customToBaseY(this._y);

        p5.stroke("#309339");
        p5.strokeWeight(5);

        switch(this._direction) {
            case "esquerda":
                p5.fill("#2c2c2c");
                p5.triangle(pixelX, pixelY, pixelX + 20, pixelY + 20, pixelX + 20, pixelY - 20);
                p5.line(pixelX + 30, pixelY + 20, pixelX + 30, pixelY - 20);
                break;
            case "direita":
                p5.fill("#2c2c2c");
                p5.triangle(pixelX, pixelY, pixelX - 20, pixelY + 20, pixelX - 20, pixelY  - 20);
                p5.line(pixelX - 30, pixelY + 20, pixelX - 30, pixelY - 20);
                break;
            case "cima":
                p5.fill("#2c2c2c");
                p5.triangle(pixelX, pixelY, pixelX + 20, pixelY + 20, pixelX - 20, pixelY + 20);
                p5.line(pixelX + 20, pixelY + 30, pixelX - 20, pixelY + 30);
                break;
            case "baixo":
                p5.fill("#2c2c2c");
                p5.triangle(pixelX, pixelY, pixelX + 20, pixelY - 20, pixelX - 20, pixelY - 20);
                p5.line(pixelX + 20, pixelY - 30, pixelX - 20, pixelY - 30);
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

    draw(p5, simulation) {
        let pixelX = simulation.customToBaseX(this._x);
        let pixelY = simulation.customToBaseY(this._y);

        p5.stroke("#309339");
        p5.strokeWeight(5);

        switch(this._direction) {
            case "esquerda":
                p5.fill("#2c2c2c");
                p5.triangle(pixelX, pixelY, pixelX + 20, pixelY + 20, pixelX + 20, pixelY - 20);
                break;
            case "direita":
                p5.fill("#2c2c2c");
                p5.triangle(pixelX, pixelY, pixelX - 20, pixelY + 20, pixelX - 20, pixelY  - 20);
                break;
            case "cima":
                p5.fill("#2c2c2c");
                p5.triangle(pixelX, pixelY, pixelX + 20, pixelY + 20, pixelX - 20, pixelY + 20);
                break;
            case "baixo":
                p5.fill("#2c2c2c");
                p5.triangle(pixelX, pixelY, pixelX + 20, pixelY - 20, pixelX - 20, pixelY - 20);
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

    draw(p5, simulation) {
        let pixelX = simulation.customToBaseX(this._x);
        let pixelY = simulation.customToBaseY(this._y);

        p5.stroke("#309339");
        p5.strokeWeight(5);

        if (this._direction == "esquerda" || "direita") {
            p5.line(pixelX, pixelY + 30, pixelX, pixelY - 30);
        } else {
            p5.line(pixelX + 30, pixelY, pixelX - 30, pixelY);
        }
    }
}
