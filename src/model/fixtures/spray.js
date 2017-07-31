import ActiveFixture from './activeFixture';
import {type Direction, components, relative} from '../direction';
import Duck from '../duck';

const defaultPeriod = 24;

export default class Spray extends ActiveFixture {
    target: { x: number, y: number };

    constructor(x: number, y: number, direction: Direction, offset: number) {
        super(x, y, direction, defaultPeriod, offset);
        const targetOffset = components(this.direction);
        this.target = { x: this.x + targetOffset.x, y: this.y + targetOffset.y };
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
        if (tickNumber % this.period === this.offset) {
            for (let duck of model.ducks) {
                if (duck.x === this.target.x && duck.y === this.target.y) {
                    duck.state.sprayed[relative(this.direction, duck.direction)] = true;
                    break;
                }
            }
        }
    }
}