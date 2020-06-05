"use strict";

let csvData = {
    filesWithErrors : [],
    currentTable : null
}

class CSVReader {
    constructor() {
        throw new Error("Can't instantiate abstract class!");
    }

    static updateTables() {
        csvData.currentTable = loadTable("csv/forcas.csv", "csv", "header");
        console.log(csvData.currentTable.getRowCount());
        if (csvData.currentTable != null) {
            CSVReader.exportFromTables("force");
        }
        
        csvData.currentTable = loadTable('csv/linhas.csv', 'csv', 'header');
        console.log(csvData.currentTable.getRowCount());
        if (csvData.currentTable != null) {
            CSVReader.exportFromTables("line");
        }

        csvData.currentTable = loadTable('csv/cargas.csv', 'csv', 'header');
        console.log(csvData.currentTable.getRowCount());
        if (csvData.currentTable != null) {
            CSVReader.exportFromTables("load");
        }

        csvData.currentTable = loadTable('csv/pontos.csv', 'csv', 'header');
        console.log(csvData.currentTable.getRowCount());
        if (csvData.currentTable != null) {
            CSVReader.exportFromTables("point");
        }

        csvData.currentTable = loadTable('csv/apoios.csv', 'csv', 'header');
        console.log(csvData.currentTable.getRowCount());
        if (csvData.currentTable != null) {
            CSVReader.exportFromTables("support");
        }

        if (csvData.filesWithErrors.length > 0) {
            let message = "AVISO: Não foi possível ler os arquivos:"
            for (let file of CSVReader.filesWithErrors) {
                message += " " + file;
            }

            outputMessage(message);
        }
    }

    static addFileWithError(fileName) {
        csvData.filesWithErrors.push(fileName);
    }

    static exportFromTables(type) {
        switch(type) {
            case "force":
                for (let r = 0; r < csvData.currentTable.getRowCount(); r++) {
                    let x = customToBaseX(csvData.currentTable.getNum(r,0));
                    let y = customToBaseY(csvData.currentTable.getNum(r,1));
                    let magnitudeX = customToBaseDistX(csvData.currentTable.getNum(r,2), "force");
                    let magnitudeY = customToBaseDistY(csvData.currentTable.getNum(r,3), "force");
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