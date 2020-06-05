"use strict";

class ClickManager {
    static _lastX = null;
    static _lastY = null;
    static _currentX = null;
    static _currentY = null;
    static _drawingLine = false;

    constructor() {
        throw new Error("Can't instantiate abstract class!");
    }

    get lastX() {
        return this._lastX;
    }

    set lastX(value) {
        this._lastX = value;
    }

    get lastY() {
        return this._lastY;
    }

    set lastY(value) {
        this._lastY = value;
    }

    get currentX() {
        return this._currentX;
    }

    set currentX(value) {
        this._currentX = value;
    }

    get currentY() {
        return this._currentY;
    }

    set currentY(value) {
        this._currentY = value;
    }

    get drawingLine() {
        return this._drawingLine;
    }

    set drawingLine(value) {
        this._drawingLine = value;
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
                    iPEF.simulation.addObject(iPEF.simulation.pseudoObject);
                    ClickManager.drawingLine = false;
                } else {
                    ClickManager.drawingLine = true;
                }
                break;

            case "drawLine continuous":
                iPEF.simulation.addObject(iPEF.simulation.pseudoObject);
                break;
            default:
        }
    }
}