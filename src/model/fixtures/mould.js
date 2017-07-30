import ActiveFixture from './activeFixture';
import {type Direction, components, random as randomDirection, increment} from '../direction';
import Duck from '../duck';

const defaultPeriod = 24;
const defaultOffset = 13;

export default class Mould extends ActiveFixture {
    target: { x: number, y: number };

    constructor(x: number, y: number, direction: Direction) {
        super(x, y, direction, defaultPeriod, defaultOffset);
        const targetOffset = components(this.direction);
        this.target = { x: this.x + targetOffset.x, y: this.y + targetOffset.y };
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
        if (tickNumber % this.period === this.offset) {
            for (let duck of model.ducks) {
                if (duck.x === this.target.x && duck.y === this.target.y) {
                    duck.state.moulded = true;
                    duck.direction = increment(this.direction);
                    break;
                }
            }
        }
    }
};

export class DummyMould extends ActiveFixture {
    constructor(x: number, y: number, direction: Direction) {
        super(x, y, direction, defaultPeriod, defaultOffset);
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
    }
}