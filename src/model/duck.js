import {type Direction, components} from './direction';
import {tween, overlap} from './geometry';
import Conveyor from './conveyor';

export default class Duck {
    x: number;
    y: number;
    direction: Direction;
    level: { conveyors: Array<Conveyor> };
    vx: number;
    vy: number;
    lastUpdate: number;

    constructor(level: { conveyors: Array<Conveyor> }, x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.level = level;
        this.vx = this.vy = 0;
    }

    update(gameTime: number) {
        this.lastUpdate = gameTime;

        this.x += this.vx;
        this.y += this.vy;
        for (let conveyor of this.level.conveyors) {
            if (this.x === conveyor.x && this.y === conveyor.y) {
                const move = components(conveyor.direction);
                this.vx = move.x * conveyor.speed;
                this.vy = move.y * conveyor.speed;
                break;
            }
        }
    }
}