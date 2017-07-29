import {type Direction, components} from './direction';
import {overlap} from './geometry';

const conveyer_speed = 0.002;

export default class Conveyer {
    x: number;
    y: number;
    velocity: {x: number, y: number};

    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        const vector = components(direction);
        this.velocity = { x: vector.x * conveyer_speed, y: vector.y * conveyer_speed };
    }

    update(model: {x: number, y: number}, dt: number) {
        if (overlap(this, model)) {
            model.x += this.velocity.x * dt;
            model.y += this.velocity.y * dt;
        }
    }
}
