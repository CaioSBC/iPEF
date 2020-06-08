import * as obj from "./objects";
import { outputMessage } from "./utils";

export default class Simulation {
    constructor(p5) {
        this._objects = [];
        this._calculatedForces = [];

        this._fixedSupportCount = 0;
        this._pinnedSupportCount = 0;
        this._simpleSupportCount = 0;
        this._netForceX = 0;
        this._netForceY = 0;
        this._momentum = 0;
        this._xPosition = 0;
        this._yPosition = 0;
        this._x1Force = 0;
        this._x2Force = 0;
        this._y1Force = 0;
        this._y2Force = 0;
        this._horizontalCount = 0;
        this._verticalCount = 0;
        this._support1X = 0;
        this._support2X = 0;
        this._support1Y = 0;
        this._support2Y = 0;

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

    baseToCustomX(baseX) {
        return (baseX - this.xOrigin) / this.distFix;
    }

    baseToCustomY(baseY) {
        return (this.yOrigin - baseY) / this.distFix;
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

    addCalculatedForce(object) {
        if (object instanceof obj.Force2D) {
            this._calculatedForces.push(object);
        }
    }

    draw() {
        for (let object of this._objects) {
            object.draw(this.p5, this);
        }
 
        for (let object of this._calculatedForces) {
            object.draw(this.p5, this);
        }
    }

    runCalculations() {
        for (let object of this._objects){
            if(object instanceof obj.FixedSupport){
                this._fixedSupportCount++;
                this._xPosition = object.x;
                this._yPosition = object.y;
            }
            else if (object instanceof obj.PinnedSupport){
                this._pinnedSupportCount++;
                this._xPosition = object._x;
                this._yPosition = object._y;
            }
            else if (object instanceof obj.SimpleSupport){
                this._simpleSupportCount++;
                if(object._direction == "esquerda" || object._direction == "direita"){
                    this._horizontalCount++;
                    if(this._horizontalCount == 2){
                      this._xPosition = object.x;
                      this._yPosition = object.y;
                    }
                    else if(this._horizontalCount == 1){
                      this._support1X = object.x;
                      this._support1Y = object.y;
                    }
                }
                else{
                    this._verticalCount++;
                    if(this._verticalCount == 2){
                      this._xPosition = object._x;
                      this._yPosition = object._y;
                    }
                    else if(this._verticalCount == 1){
                      this._support2X = object._x;
                      this._support2Y = object._y;
                    }
                }
            }
        }
        this.calculateNetForces();

        if (this._fixedSupportCount == 1 && this._pinnedSupportCount == 0 && this._simpleSupportCount == 0) {
            outputMessage("Vertical Reaction: "+ this._netForceY+", Horizontal Reaction: "+ this._netForceX+", Momentum: " + this._momentum);
            
        } else if (this._fixedSupportCount == 0 && this._pinnedSupportCount == 1 && this._simpleSupportCount ==0) {
            outputMessage("Vertical Reaction: "+ this._netForceY+" and Horizontal Reaction: " + this._netForceX);
            this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, this._netForceX, 0));
            this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, 0, this._netForceY));

        } else if (this._fixedSupportCount == 0 && this._pinnedSupportCount == 0 && this._simpleSupportCount == 1) {
            if(this._horizontalCount == 1) {
                outputMessage("Horizontal Reaction: "+this._netForceX);
                this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, this._netForceX, 0));

            } else if (this._verticalCount == 1) {
                outputMessage("Vertical Reaction: "+this._netForceY);
                this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, 0, this._netForceY));
            }

        } else if (this._fixedSupportCount == 0 && this._pinnedSupportCount == 1 && this._simpleSupportCount == 1) {
            if (this._horizontalCount == 1) {
                if(this._yPosition != this._support1Y) {
                    this._x2Force = this._momentum/(this._yPosition-this._support1Y);
                    this._x1Force = this._netForceX - this._x2Force;
                    this._y1Force = this._netForceY;
                    outputMessage("Simple support reaction: "+this._x2Force+",vertical pinned support reaction: "+this._y1Force+" and horizontal reaction: "+this._x1Force);
                    this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, this._x1Force, 0));
                    this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, 0, this._y1Force));
                    this.addCalculatedForce(new obj.Force2D(this._support1X, this._support1Y, this._x2Force, 0));
                }
                else{
                    outputMessage("Impossible case!");
                }
                
            } else if (this._verticalCount == 1) {
                if(this._support2X != this._xPosition){
                    this._y2Force = this._momentum/(this._support2X-this._xPosition);
                    this._y1Force = this._netForceY - this._y2Force;
                    this._x1Force = this._netForceX;
                    outputMessage("Simple support reaction: "+this._y2Force+",vertical pinned support reaction: "+this._y1Force+" and horizontal reaction: "+this._x1Force);
                    this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, this._x1Force, 0));
                    this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, 0, this._y1Force));
                    this.addCalculatedForce(new obj.Force2D(this._support2X, this._support2Y, 0, this._y2Force));
                }
                else{
                    outputMessage("Impossible case!");
                }
            }

        } else if (this._fixedSupportCount == 0 && this._pinnedSupportCount == 0 && this._simpleSupportCount ==2) {
            if (this._horizontalCount == 2){
                if (this._netForceY != 0) {
                    outputMessage("Impossible case!");

                } else {
                    this._x1Force = this._momentum/(this._yPosition-this._support1Y);
                    this._x2Force = this._netForceX - this._x1Force;
                    outputMessage("Reaction in the simple support with coordinates: x="+this._support1X+" y="+this._support1Y+": "+this._x1Force+" and reaction in the other support: "+this._x2Force);
                    this.addCalculatedForce(new obj.Force2D(this._support1X, this._support1Y, this._x1Force, 0));
                    this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, this._x2Force, 0));

                }
            } else if (this._verticalCount == 2) {
                if(this._netForceX != 0) {
                    outputMessage("Impossible case!");
                } else {
                    this._y1Force = this._momentum/(this._support2X-this._xPosition);
                    this._y2Force = this._netForceY - this._y1Force;
                    outputMessage("Reaction in the simple support with coordinates: x="+this._support2X+" y="+this._support2Y+": "+this._y1Force+" and reaction in the other support: "+this._y2Force);
                    this.addCalculatedForce(new obj.Force2D(this._support2X, this._support2Y, 0, this._y1Force));
                    this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, 0, this._y2Force));

                }

            } else {
                outputMessage("Reaction in vertical support: "+this._netForceY+" and in the horizontal support: "+this._netForceX);
                this.addCalculatedForce(new obj.Force2D(this._support1X, this._support1Y, this._netForceX, 0));
                this.addCalculatedForce(new obj.Force2D(this._xPosition, this._yPosition, 0, this._netForceY));
            }

        } else if(this._fixedSupportCount == 0 && this._pinnedSupportCount == 0 && this._simpleSupportCount ==3){
            if(this._horizontalCount == 2) {
                this._y1Force = this._netForceY;
                this._momentum -= this._y1Force*(this._support2X-this._xPosition);
                this._x1Force = this._momentum/(this._yPosition-this._support1Y);
                this._x2Force = this._netForceX - this._x1Force;
                outputMessage("Reaction in the simple support with coordinates: x="+this._support1X+" y="+this._support1Y+": "+this._x1Force+", reaction in the other horizontal support: "+this._x2Force+" and reaction in the vertical support: "+this._y1Force);
                
            } else if(this._verticalCount == 2){
                this._x1Force = this._netForceX;
                this._momentum -= this._x1Force*(this._yPosition-this._support1Y);
                this._y1Force = this._momentum/(this._support2X-this._xPosition);
                this._y2Force = this._netForceY - this._y1Force;
                outputMessage("Reaction in the simple support with coordinates: x="+this._support2X+" y="+this._support2Y+": "+this._y1Force+", reaction in the other vertical support: "+this._y2Force+" and reaction in the horizontal support: "+this._x1Force);
            } else {
                outputMessage("It's not possible to solve the system.");
            }

        } else {
            outputMessage("It's not possible to solve the system.");
        }
    }

    calculateNetForces() {
        this._netForceX = 0;
        this._netForceY = 0;
        this._momentum = 0;

        for (let object of this._objects) {
            if (object instanceof obj.Force2D) {
                this._netForceX += object.magnitudeX;
                this._netForceY += object.magnitudeY;
                this._momentum += object.magnitudeX*(this._yPosition-object.y);
                this._momentum += object.magnitudeY*(object.x-this._xPosition);
                continue;
            }

            if (object instanceof obj.Load2D) {
                this._netForceX += object.magnitudeX * Math.abs(object.endY - object.startY);
                this._netForceY += object.magnitudeY * Math.abs(object.endX - object.startX);
                this._momentum += object.magnitudeX * Math.abs(object.endY - object.startY) * (this._yPosition - ((object.endY + object.startY)/2));
                this._momentum += object.magnitudeY * Math.abs(object.endX - object.startX) * (((object.endX + object.startX)/2)-this._xPosition);
                continue;
            }
        }
        this._netForceX = (-1)*this._netForceX;
        this._momentum = (-1)*this._momentum; 
        this._netForceY = (-1)*this._netForceY;
    }

}
