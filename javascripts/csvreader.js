"use strict";

class CSVReader {
    static filesWithErrors = [];
    static currentTable = null;

    constructor() {
        throw new Error("Can't instantiate abstract class!");
    }

    static updateTables() {
        CSVReader.currentTable = loadTable("csv/forcas.csv", "csv", "header");
        console.log(CSVReader.currentTable.getRowCount());
        if (CSVReader.currentTable != null) {
            CSVReader.exportFromTables("force");
        }
        
        CSVReader.currentTable = loadTable('csv/linhas.csv', 'csv', 'header');
        console.log(CSVReader.currentTable.getRowCount());
        if (CSVReader.currentTable != null) {
            CSVReader.exportFromTables("line");
        }

        CSVReader.currentTable = loadTable('csv/cargas.csv', 'csv', 'header');
        console.log(CSVReader.currentTable.getRowCount());
        if (CSVReader.currentTable != null) {
            CSVReader.exportFromTables("load");
        }

        CSVReader.currentTable = loadTable('csv/pontos.csv', 'csv', 'header');
        console.log(CSVReader.currentTable.getRowCount());
        if (CSVReader.currentTable != null) {
            CSVReader.exportFromTables("point");
        }

        CSVReader.currentTable = loadTable('csv/apoios.csv', 'csv', 'header');
        console.log(CSVReader.currentTable.getRowCount());
        if (CSVReader.currentTable != null) {
            CSVReader.exportFromTables("support");
        }

        if (CSVReader.filesWithErrors.length > 0) {
            let message = "AVISO: Não foi possível ler os arquivos:"
            for (let file of CSVReader.filesWithErrors) {
                message += " " + file;
            }

            outputMessage(message);
        }
    }

    static addFileWithError(fileName) {
        CSVReader.filesWithErrors.push(fileName);
    }

    static exportFromTables(type) {
        switch(type) {
            case "force":
                for (let r = 0; r < CSVReader.currentTable.getRowCount(); r++) {
                    let x = customToBaseX(CSVReader.currentTable.getNum(r,0));
                    let y = customToBaseY(CSVReader.currentTable.getNum(r,1));
                    let magnitudeX = customToBaseDistX(CSVReader.currentTable.getNum(r,2), "force");
                    let magnitudeY = customToBaseDistY(CSVReader.currentTable.getNum(r,3), "force");
                    iPEF.simulation.addObject(new Force(x, y, magnitudeX, magnitudeY));
                }
                break;
            case "line":
                break;
            case "load":
                break;
            case "point":
                break;
            case "support":
                break;
            default:
                
        }
    }
}