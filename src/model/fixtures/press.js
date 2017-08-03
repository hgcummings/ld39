import {type Direction, components, increment} from '../direction';
import Duck from '../movable/duck';
import {type Body} from '../geometry';
import {Fixture} from '../objects'

const defaultPeriod = 24;

export default class Press extends Fixture {
    target: { x: number, y: number };
    body: Body;
    period: number;
    offset: number;

    constructor(x: number, y: number, direction: Direction, offset: number) {
        super(x, y, direction);
        this.period = defaultPeriod;
        this.offset = offset;
        const targetOffset = components(this.direction);
        this.target = { x: this.x + targetOffset.x, y: this.y + targetOffset.y };
        this.body = {
            x: this.x,
            y: this.y,
            width: 1,
            height: 1
        }
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
        if (tickNumber % this.period === this.offset) {
            for (let duck of model.ducks) {
                if (duck.x === this.target.x && duck.y === this.target.y) {
                    duck.state.pressed = true;
                    duck.direction = increment(this.direction);
                }
            }
        }
    }
};

export class DummyPress extends Fixture {
    body: Body;
    period: number;
    offset: number;

    constructor(x: number, y: number, direction: Direction, offset: number) {
        super(x, y, direction);
        this.period = defaultPeriod;
        this.offset = offset;
        this.body = {
            x: this.x,
            y: this.y,
            width: 1,
            height: 1
        }
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
    }
}