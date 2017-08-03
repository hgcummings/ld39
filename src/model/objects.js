import {type Direction} from './direction';

export interface Sprite {
    x: number, y: number, direction: Direction, vx: number, vy: number, lastUpdate: number
};

export class Fixture {
    x: number;
    y: number;
    direction: Direction;

    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
}