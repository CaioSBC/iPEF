"use strict";

let UTILITY_MODE = null;
let actionOnClick = null;

function setDrawLine(mode) {
    switch (mode) {
        case "free":
            if (UTILITY_MODE == "drawLine free") {
                UTILITY_MODE = null;
            } else {
                UTILITY_MODE = "drawLine free";
            }

            SIMULATION.pseudoObject = null;
            break;
        case "continuous":
            if (UTILITY_MODE == "drawLine continuous") {
                UTILITY_MODE = null;
            } else {
                UTILITY_MODE = "drawLine continuous";
            }

            SIMULATION.pseudoObject = null;
            break;
        default:
            if (UTILITY_MODE == "drawLine free" || UTILITY_MODE == "drawLine continuous") {
                UTILITY_MODE = null;
                for (let button of document.getElementsByClassName("draw-modes")) {
                    button.style.visibility = "hidden";
                }
            } else {
                UTILITY_MODE = "drawLine free"
                for (let button of document.getElementsByClassName("draw-modes")) {
                    button.style.visibility = "visible";
                }
            }

            SIMULATION.pseudoObject = null;
    }
}