import {type Direction, components, invert} from './direction';
const conveyor_speed = 0.25;

const updateDirection = (conveyor:Conveyor, direction:Direction) => {
    conveyor.direction = direction;
    const vector = components(direction);
    conveyor.velocity = { x: vector.x * conveyor_speed, y: vector.y * conveyor_speed };
}

export default class Conveyor {
    x: number;
    y: number;
    direction: Direction;
    speed: number;
    velocity: {x: number, y: number};

    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.speed = conveyor_speed;
        updateDirection(this, direction);
    }

    reverse() {
        updateDirection(this, invert(this.direction));
    }
}
