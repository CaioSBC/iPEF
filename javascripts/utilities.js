"use strict";

let UTILITY_MODE = null;

function setDrawLine() {
    if (UTILITY_MODE == "drawLine") {
        UTILITY_MODE = null;
    } else {
        UTILITY_MODE = "drawLine";
    }
}

function clickCanvas() {
    switch (UTILITY_MODE) {
        case "drawLine":
            SIMULATION.addObject(SIMULATION.pseudoObject);
            break;
        default:
    }
}