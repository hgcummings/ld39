import {type Direction, components, invert} from '../direction';
import {Fixture} from '../objects';
import Movable from '../movable/movable';

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

    update(model: { movables(): () => Iterable<Movable> }) {
        for (let movable of model.movable()) {
            if (this.x === movable.x && this.y === movable.y) {
                const move = components(this.direction);
                movable.moveTo({ x: movable.x + move.x, y: movable.y + move.y }, conveyor_speed);
            }
        }
    }

    reverse() {
        this.direction = invert(this.direction);
        updateVelocity(this);
    }
}
