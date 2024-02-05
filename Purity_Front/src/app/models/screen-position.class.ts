/**
 * @classdesc
 *   Class designed for better handling of ScreenDistance class creation
 * 
 * @constructor
 *   Takes start X and Y positions
 */
export class ScreenPosition {
    readonly position: {readonly x: number, readonly y: number};
    constructor(positionX: number, positionY: number) {this.position = {x: positionX, y: positionY}}
}

