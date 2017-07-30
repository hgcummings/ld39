import {type Direction, components} from './direction';
import {tween, overlap} from './geometry';
import Conveyor from './conveyor';

export default class Duck {
    x: number;
    y: number;
    direction: Direction;
    level: { conveyors: Array<Conveyor> };
    movingTo: ?{ x: number, y: number, speed: number };

    constructor(level: { conveyors: Array<Conveyor> }, x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.level = level;
    }

    update(dt: number) {
        const movingTo = this.movingTo;
        if (movingTo) {
            this.x = tween(this.x, movingTo.x, dt * movingTo.speed);
            this.y = tween(this.y, movingTo.y, dt * movingTo.speed);
            if (this.x === movingTo.x && this.y === movingTo.y) {
                this.movingTo = null;
            } else {
                return;
            }
        }
        for (let conveyor of this.level.conveyors) {
            if (this.x === conveyor.x && this.y === conveyor.y) {
                const move = components(conveyor.direction);
                this.movingTo = {
                    x: this.x + move.x,
                    y: this.y + move.y,
                    speed: conveyor.speed
                }
                break;
            }
        }
    }
}