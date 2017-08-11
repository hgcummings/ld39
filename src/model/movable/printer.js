import {Fixture} from '../objects';
import {type Direction, components, relative} from '../direction';
import Duck from '../movable/duck';

const defaultPeriod = 24;

export default class Printer extends Fixture {
    target: { x: number, y: number };
    period: number;
    offset: number;

    constructor(x: number, y: number, direction: Direction, offset: number) {
        super(x, y, direction);
        this.period = defaultPeriod;
        this.offset = offset;
        const targetOffset = components(this.direction);
        this.target = { x: this.x + targetOffset.x, y: this.y + targetOffset.y };
    }

    update(model: { level: any, ducks: Array<Duck> }, tickNumber: number) {
        if (tickNumber % this.period === this.offset) {
            for (let duck of model.ducks) {
                if (duck.x === this.target.x && duck.y === this.target.y) {
                    duck.state.printed[relative(this.direction, duck.direction)] = true;
                }
            }
        }
    }

    body() {
        const bodyOffset = components(this.direction);
        return {
            x: this.x + bodyOffset.x * 3/16,
            y: this.y + bodyOffset.y * 3/16,
            width: this.direction % 2 === 0 ? 0.75 : 0.625,
            height: this.direction % 2 === 0 ? 0.625 : 0.75
        }
    }
}