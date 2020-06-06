import P5 from "p5";

import sketch from "./sketch";

import "../css/style.css";

(() => {
    document.getElementById("nery").addEventListener("click", () => {
        console.log("Oi")
    })

    new P5(sketch);
})();
