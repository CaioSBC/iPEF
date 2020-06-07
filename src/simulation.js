import * as obj from "./objects";

export default class Simulation {
    constructor(p5) {
        this._objects = [];

        this._netForceX = 0;
        this._netForceY = 0;

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
            object.draw(this.p5);
        }
    }

    runCalculations() {
        this.calculateNetForces();
    }

    calculateNetForces() {
        this._netForceX = 0;
        this._netForceY = 0;

        for (let object of this._objects) {
            if (object instanceof obj.Force2D) {
                this._netForceX += object.magnitudeX;
                this._netForceY += object.magnitudeY;
                continue;
            }

            if (object instanceof obj.Load2D) {
                this._netForceX += object.magnitudeX * (object.endY - object.startY);
                this._netForceY += object.magnitudeY * (object.endX - object.startX);
                continue;
            }
        }
        console.log(this._netForceX + " " + this.netForceY);
    }

}
