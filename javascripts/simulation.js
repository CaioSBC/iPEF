"use strict";

class Simulation {
    constructor() {
        this.objects = [];
        this.pseudoObject = null;
    }

    addObject(object) {
        if (object) {
            this.objects.push(object);
        }
    }

    setPseudoObject() {
        switch (UTILITY_MODE) {
            case "drawLine free":
                if (ClickManager.drawingLine) {
                    let startX = ClickManager.currentX;
                    let startY = ClickManager.currentY;
                    this.pseudoObject = new Line2D(startX, startY, mouseX, mouseY);
                }
                break;

            case "drawLine continuous":
                let lastLine = null;

                let i = this.objects.length - 1;
                while (i >= 0) {
                    if (this.objects[i] instanceof Line2D) {
                        lastLine = this.objects[i];
                        break;
                    }

                }

                if (lastLine) {
                    let startX = lastLine.endX;
                    let startY = lastLine.endY;
                    this.pseudoObject = new Line2D(startX, startY, mouseX, mouseY);
                } else {
                    if (ClickManager.currentX && ClickManager.currentY) {
                        let startX = ClickManager.currentX;
                        let startY = ClickManager.currentY;
                        this.pseudoObject = new Line2D(startX, startY, mouseX, mouseY);
                    } else {
                        this.pseudoObject = null;
                    }
                }
                break;

            default:
                this.pseudoObject = null;
        }
    }

    draw() {
        if (this.objects.length > 0) {
            for (let object of this.objects) {
                object.draw();
            }
        }

        this.setPseudoObject();
        if (this.pseudoObject) {
            this.pseudoObject.draw();
        }
    }
}