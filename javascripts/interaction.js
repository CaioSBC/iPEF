"use strict";

let mouseData = {
    lastX : null,
    lastY : null,
    currentX : null,
    currentY : null,
    drawingLine : false
}

class ClickManager {
    constructor() {
        throw new Error("Can't instantiate abstract class!");
    }

    static update() {
        mouseData.lastX = mouseData.currentX;
        mouseData.lastY = mouseData.currentY;
        mouseData.currentX = mouseX;
        mouseData.currentY = mouseY;
    }

    static clickCanvas() {
        ClickManager.update();

        switch (UTILITY_MODE) {
            case "drawLine free":
                if (mouseData.drawingLine) {
                    iPEF.simulation.addObject(iPEF.simulation.pseudoObject);
                    mouseData.drawingLine = false;
                } else {
                    mouseData.drawingLine = true;
                }
                break;

            case "drawLine continuous":
                iPEF.simulation.addObject(iPEF.simulation.pseudoObject);
                break;
            default:
        }
    }
}