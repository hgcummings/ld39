import {type Direction, components} from './direction';
import {tween, overlap} from './geometry';
import Conveyor from './fixtures/conveyor';

export default class Duck {
    x: number;
    y: number;
    direction: Direction;
    level: { fixtures: { conveyors: Array<Conveyor> } };
    vx: number;
    vy: number;
    lastUpdate: number;
    state: { moulded:boolean, sprayed:Array<boolean>, stencilled: Array<boolean> }

    constructor(level: { fixtures: { conveyors: Array<Conveyor> } }, x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.level = level;
        this.vx = this.vy = 0;
        this.state = {
            moulded: false,
            sprayed: [false, false, false, false],
            stencilled: [false, false, false, false]
        }
    }

    update(gameTime: number) {
        this.lastUpdate = gameTime;

        this.x += this.vx;
        this.y += this.vy;
        for (let conveyor of this.level.fixtures.conveyors) {
            if (this.x === conveyor.x && this.y === conveyor.y) {
                const move = components(conveyor.direction);
                this.vx = move.x * conveyor.speed;
                this.vy = move.y * conveyor.speed;
                break;
            }
        }
    }
}