import {type Direction, components} from './direction';
const conveyor_speed = 0.002;

export default class Conveyor {
    x: number;
    y: number;
    direction: Direction;
    speed: number;
    velocity: {x: number, y: number};

    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        const vector = components(direction);
        this.speed = conveyor_speed;
        this.velocity = { x: vector.x * conveyor_speed, y: vector.y * conveyor_speed };
    }
}
