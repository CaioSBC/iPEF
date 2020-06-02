"use strict";

class Simulation {
    constructor() {
        this.objects = [];
    }

    addObject(object) {
        this.objects.push(object);
    }

    draw() {
        if (this.objects.length > 0) {
            for (let object of this.objects) {
                object.draw();
            }
        }
    }
}