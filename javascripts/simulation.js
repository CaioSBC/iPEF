"use strict";

class Simulation {
    constructor() {
        this._objects = [];
        this._pseudoObject = null;
    }

    get pseudoObject() {
        return this._pseudoObject;
    }

    set pseudoObject(value) {
        this._pseudoObject = value;
    }

    addObject(object) {
        if (object) {
            this._objects.push(object);
        }
    }

    autoSetPseudoObject() {
        switch (UTILITY_MODE) {
            case "drawLine free":
                if (mouseData.drawingLine) {
                    let startX = mouseData.currentX;
                    let startY = mouseData.currentY;
                    this._pseudoObject = new Line2D(startX, startY, mouseX, mouseY);
                }
                break;

            case "drawLine continuous":
                let lastLine = null;

                let i = this._objects.length - 1;
                while (i >= 0) {
                    if (this._objects[i] instanceof Line2D) {
                        lastLine = this._objects[i];
                        break;
                    }

                }

                if (lastLine) {
                    let startX = lastLine.endX;
                    let startY = lastLine.endY;
                    this._pseudoObject = new Line2D(startX, startY, mouseX, mouseY);
                } else {
                    if (mouseData.currentX && mouseData.currentY) {
                        let startX = mouseData.currentX;
                        let startY = mouseData.currentY;
                        this._pseudoObject = new Line2D(startX, startY, mouseX, mouseY);
                    } else {
                        this._pseudoObject = null;
                    }
                }
                break;

            default:
                this._pseudoObject = null;
        }
    }

    draw() {
        if (this._objects.length > 0) {
            for (let object of this._objects) {
                object.draw();
            }
        }

        this.autoSetPseudoObject();
        if (this._pseudoObject) {
            this._pseudoObject.draw();
        }
    }
}