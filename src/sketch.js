import Simulation from "./simulation";
import { outputMessage, updatePosition } from "./utils";
import * as obj from "./objects";

import csvForce from "../csv/forcas.csv";
import csvLine from "../csv/linhas.csv";
import csvLoad from "../csv/cargas.csv";
import csvSupport from "../csv/apoios.csv";

const sketch = (p5) => {
    const simulation = new Simulation(p5);

    document.getElementById("calculate-button").addEventListener("click", () => {
        simulation.runCalculations();
    })

    const parseData = (data, type) => {
        switch (type) {
            case "force":
                for (let r = 0; r < data.getRowCount(); r++) {
                    let x = data.getNum(r, 0);
                    let y = data.getNum(r, 1);
                    let magnitudeX = data.getNum(r, 2);
                    let magnitudeY = data.getNum(r, 3);

                    simulation.addObject(new obj.Force2D(x, y, magnitudeX, magnitudeY));
                }
                break;
            case "line":
                for (let r = 0; r < data.getRowCount(); r++) {
                    let startX = data.getNum(r,0);
                    let startY = data.getNum(r,1);
                    let endX = data.getNum(r,2);
                    let endY = data.getNum(r,3);

                    simulation.addObject(new obj.Line2D(startX, startY, endX, endY));
                }
                break;
            case "load":
                for (let r = 0; r < data.getRowCount(); r++) {
                    let magnitudeX = data.getNum(r, 0);
                    let magnitudeY = data.getNum(r, 1);
                    let startX = data.getNum(r,2);
                    let startY = data.getNum(r,3);
                    let endX = data.getNum(r,4);
                    let endY = data.getNum(r,5);

                    simulation.addObject(new obj.Load2D(magnitudeX, magnitudeY, startX, startY, endX, endY));
                }
                break;
            case "point":
                break;
            case "support":
                for (let r = 0; r < data.getRowCount(); r++) {
                    let type = data.getString(r, 0);
                    let x = data.getNum(r, 1);
                    let y = data.getNum(r, 2);
                    let direction = data.getString(r, 3);

                    switch (type) {
                        case "simples":
                            simulation.addObject(new obj.SimpleSupport(x, y, direction));
                            break;
                        case "fixo":
                            simulation.addObject(new obj.PinnedSupport(x, y, direction));
                            break;
                        case "engaste":
                            simulation.addObject(new obj.FixedSupport(x, y, direction));
                            break;
                        default:
                            break;
                    }
                }
                break;
            default:
                break;
        }
    }

    const readAndParseTable = (file, type) => {
        p5.loadTable(file, "csv", "header", (t) => {
            parseData(t, type);
        }, (err) => {
            console.error("Error reading table", err);
        });
    }

    p5.setup = () => {
        let width = document.getElementById("canvas").offsetWidth;
        let height = document.getElementById("canvas").offsetHeight;

        let customCanvas = p5.createCanvas(width, height);
        customCanvas.parent("canvas");

        outputMessage("Bem-vindo ao iPEF, o software de análise de estruturas 2D para PEF3208");

        simulation.xOrigin = Math.round(width / 4);
        simulation.yOrigin = Math.round(3 * (height / 4));

        readAndParseTable(csvLine, "line");
        readAndParseTable(csvSupport, "support");
        readAndParseTable(csvForce, "force");
        readAndParseTable(csvLoad, "load");
    };

    p5.draw = () => {
        p5.clear()
        simulation.draw();
        updatePosition(p5.mouseX, p5.mouseY);
    };

    p5.windowResized = () => {
        let width = document.getElementById("canvas").offsetWidth;
        let height = document.getElementById("canvas").offsetHeight;

        p5.resizeCanvas(width, height);
        simulation.xOrigin = Math.round(width / 4);
        simulation.yOrigin = Math.round(3 * (height / 4));
    }
}

export default sketch;
