"use strict";

class ClickManager {
    static lastX = null;
    static lastY = null;
    static currentX = null;
    static currentY = null;
    static drawingLine = false;

    constructor() {
        throw new Error("Can't instantiate abstract class!");
    }

    static update() {
        ClickManager.lastX = ClickManager.currentX;
        ClickManager.lastY = ClickManager.currentY;
        ClickManager.currentX = mouseX;
        ClickManager.currentY = mouseY;
    }

    static clickCanvas() {
        ClickManager.update();

        switch (UTILITY_MODE) {
            case "drawLine free":
                if (ClickManager.drawingLine) {
                    SIMULATION.addObject(SIMULATION.pseudoObject);
                    ClickManager.drawingLine = false;
                } else {
                    ClickManager.drawingLine = true;
                }
                break;

            case "drawLine continuous":
                SIMULATION.addObject(SIMULATION.pseudoObject);
                break;
            default:
        }
    }
}