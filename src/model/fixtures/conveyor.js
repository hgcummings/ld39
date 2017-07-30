import {type Direction, components, invert} from '../direction';
import {Fixture} from '../objects';

const conveyor_speed = 0.25;

const updateVelocity = (conveyor:Conveyor) => {
    const vector = components(conveyor.direction);
    conveyor.velocity = { x: vector.x * conveyor_speed, y: vector.y * conveyor_speed };
}

export default class Conveyor extends Fixture {
    speed: number;
    velocity: {x: number, y: number};

    constructor(x: number, y: number, direction: Direction) {
        super(x, y, direction);
        this.speed = conveyor_speed;
        updateVelocity(this);
    }

    reverse() {
        this.direction = invert(this.direction);
        updateVelocity(this);
    }
}
