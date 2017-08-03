import {Fixture} from '../objects';
import {type Direction, random as randomDirection} from '../direction';
import Duck from '../movable/duck';

const defaultPeriod = 24;

export default class Outlet extends Fixture {
    period: number;
    offset: number;

    constructor(x: number, y: number, direction: Direction, offset: number) {
        super(x, y, direction);
        this.period = defaultPeriod;
        this.offset = offset;
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
        if (tickNumber % this.period === this.offset) {
            model.ducks.push(new Duck(this.x, this.y, randomDirection()));
        }
    }
};