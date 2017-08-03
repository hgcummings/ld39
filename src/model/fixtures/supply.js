import ActiveFixture from './activeFixture';
import {type Direction, random as randomDirection} from '../direction';
import Duck from '../movable/duck';

const defaultPeriod = 24;

export default class Supply extends ActiveFixture {
    constructor(x: number, y: number, direction: Direction, offset: number) {
        super(x, y, direction, defaultPeriod, offset);
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
        if (tickNumber % this.period === this.offset) {
            model.ducks.push(new Duck(this.x, this.y, randomDirection()));
        }
    }
};