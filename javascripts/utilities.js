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

            iPEF.simulation.pseudoObject = null;
            break;
        case "continuous":
            if (UTILITY_MODE == "drawLine continuous") {
                UTILITY_MODE = null;
            } else {
                UTILITY_MODE = "drawLine continuous";
            }

            iPEF.simulation.pseudoObject = null;
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

            iPEF.simulation.pseudoObject = null;
    }
}