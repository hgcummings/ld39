import ActiveFixture from './activeFixture';
import {type Direction, components, increment} from '../direction';
import Duck from '../duck';
import {type Body} from '../geometry';

const defaultPeriod = 24;

export default class Mould extends ActiveFixture {
    target: { x: number, y: number };
    body: Body;

    constructor(x: number, y: number, direction: Direction, offset: number) {
        super(x, y, direction, defaultPeriod, offset);
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
                    duck.state.moulded = true;
                    duck.direction = increment(this.direction);
                }
            }
        }
    }
};

export class DummyMould extends ActiveFixture {
    body: Body;
    
    constructor(x: number, y: number, direction: Direction, offset: number) {
        super(x, y, direction, defaultPeriod, offset);
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