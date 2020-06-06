export default class Simulation {
    constructor(p5) {
        this._objects = [];
        this.p5 = p5;

        this.xOrigin = null;
        this.yOrigin = null;
        this.distFix = 40;
        this.distFixForce = 10;
        this.distFixLoad = 10;
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
}
