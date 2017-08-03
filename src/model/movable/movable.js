import {type Sprite} from '../objects';
import {type Direction} from '../direction';

export default class Movable implements Sprite {
    x: number;
    y: number;
    direction: Direction;
    vx: number;
    vy: number;
    lastUpdate: number;
    
    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.vx = 0;
        this.vy = 0;
    }
}