import {Fixture} from '../objects';
import Duck from '../movable/duck';
import {type Direction, components} from '../direction';
import {type Body} from '../geometry';

const speed = 0.25;
const z_speed = 0.2;
const resultDuration = 4;

export default class Checker extends Fixture {
    lastResult: ?boolean;
    lastResultTick: number;

    body: Body;

    constructor(x: number, y: number, direction: Direction) {
        super(x, y, direction);
        this.body = {
            x: this.x,
            y: this.y,
            width: 1,
            height: 1
        }
    }

    update(model: { ducks: Array<Duck> }, tickNumber: number) {
        for (let duck of model.ducks) {
            if (duck.x === this.x && duck.y === this.y) {
                if (duck.isValid()) {
                    this.lastResult = true;
                } else {
                    this.reject(duck);
                    this.lastResult = false;
                }
                this.lastResultTick = tickNumber;
            }
        }

        if (this.lastResult !== null && tickNumber > this.lastResultTick + resultDuration) {
            this.lastResult = null;
        }
    }

    reject(duck: Duck) {
        const move = components(this.direction);
        duck.vx = move.x * speed;
        duck.vy = move.y * speed;
        duck.vz = -z_speed;
    }
}