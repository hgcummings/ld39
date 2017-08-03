import ActiveFixture from './activeFixture';
import {type Direction, components, combine} from '../direction';
import Duck from '../movable/duck';

const defaultPeriod = 4;

export default class Turntable extends ActiveFixture {
    constructor(x: number, y: number, direction:Direction, offset: number) {
        super(x, y, direction, defaultPeriod, offset);
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
        if (tickNumber % this.period === this.offset) {
            for (let duck of model.ducks) {
                if (duck.x === this.x && duck.y === this.y) {
                    duck.direction = combine(duck.direction, this.direction);
                }
            }
        }
    }
}