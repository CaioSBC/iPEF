import * as obj from "./objects";

export default class OperationsFixedSupport {
    constructor(p5) {
        this._objects = [];

        this._netForceX = 0;
        this._netForceY = 0;
        this._momentum = 0;

        this.p5 = p5;

        this.xOrigin = null;
        this.yOrigin = null;
        this.distFix = 40;
        this.distFixForce = 10;
        this.distFixLoad = 10;
    }

    get objects() {
        return this._objects;
    }

    get netForceX() {
        return this._netForceX;
    }

    get netForceY() {
        return this._netForceY;
    }

    customToBaseX(customX) {
        return this.xOrigin + (customX * this.distFix);
    }

    customToBaseY(customY) {
        return this.yOrigin - (customY * this.distFix);
    }

    customToBaseDistX(distanceX, context) {
        switch (context) {
            case "force":
                return (distanceX * this.distFixForce);
            case "load":
                return (distanceX * this.distFixLoad);
            default:
                throw new Error("Impossible case!");
        }
    }

    customToBaseDistY(distanceY, context) {
        switch (context) {
            case "force":
                return (-1) * (distanceY * this.distFixForce);
            case "load":
                return (-1) * (distanceY * this.distFixLoad);
            default:
                throw new Error("Impossible case!");
        }
    }

    addObject(object) {
        if (object) {
            this._objects.push(object);
        }
    }

    draw() {
        for (let object of this._objects) {
            object.draw(this.p5, this);
        }
    }

    runCalculations() {
        //essa é a função que será chamada pelo botão calcular, seria tipo a "main" dos cálculos
        this.calculateNetForces();
    }

    calculateNetForces() {
        //essa é uma função q eu fiz pra calcular as forças resultantes em X e Y
        //repare que tem uma lista de objetos com tudo o que tá sendo desenhado no programa
        //cada forca, apoio, etc, tem suas proprias propriedas (x, y, magnitude, etc)
        //para mais detalhes, olha o arquivo object.js
        this._netForceX = 0;
        this._netForceY = 0;

        for (let object of this._objects) {
           if (object instanceof obj.FixedSupport){
                xPosition = object.x;
                yPosition = object.y;
            }
        }
      
        for (let object of this._objects) {
            if (object instanceof obj.Force2D) {
                this._netForceX += object.magnitudeX;
                this._netForceY += object.magnitudeY;
                this.momentum += object.magnitudeX*(object.x-xPosition);
                this.momentum += object.magnitudeY*(object.y-yPosition);
                continue;
            }

            if (object instanceof obj.Load2D) {
                this._netForceX += object.magnitudeX * (object.endY - object.startY);
                this._netForceY += object.magnitudeY * (object.endX - object.startX);
                this.momentum += object.magnitudeX * (object.endY - object.startY)*(((object.endY + object.startY)/2)-yPosition);
                this.momentum += object.magnitudeY * (object.endX - object.startX)(((object.endX + object.startX)/2)-xPosition);
                continue;
            }
        }
      this.momentum = (-1)*this.momentum
        console.log(this._netForceX + " " + this.netForceY +  " " + this.momentum);
    }

}