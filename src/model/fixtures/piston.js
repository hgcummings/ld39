import ActiveFixture from './activeFixture';
import {type Direction, components, relative} from '../direction';
import Duck from '../movable/duck';

const defaultPeriod = 24;
const speed = 0.5;

export default class Piston extends ActiveFixture {
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
                    const move = components(this.direction);
                    duck.vx = move.x * speed;
                    duck.vy = move.y * speed;
                }
            }
        }
    }
}