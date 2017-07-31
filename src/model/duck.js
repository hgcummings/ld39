import {type Direction, components} from './direction';
import {overlap} from './geometry';
import Conveyor from './fixtures/conveyor';
import Chute from './fixtures/chute';

export default class Duck {
    x: number;
    y: number;
    z: number;
    direction: Direction;
    level: { fixtures: { conveyors: Array<Conveyor>, chutes: Array<Chute> } };
    vx: number;
    vy: number;
    vz: number;
    lastUpdate: number;
    state: { moulded:boolean, sprayed: Array<boolean>, printed: Array<boolean> }

    constructor(level: { fixtures: { conveyors: Array<Conveyor>, chutes: Array<Chute> } },
            x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.z = 0;
        this.direction = direction;
        this.level = level;
        this.vx = this.vy = this.vz = 0;
        this.state = {
            moulded: false,
            sprayed: [false, false, false, false],
            printed: [false, false, false, false]
        }
    }

    update(gameTime: number) {
        this.lastUpdate = gameTime;

        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (this.z === 0 && this.x === Math.floor(this.x) && this.y === Math.floor(this.y)) {
            this.vx = 0;
            this.vy = 0;
        }

        for (let conveyor of this.level.fixtures.conveyors) {
            if (this.x === conveyor.x && this.y === conveyor.y) {
                const move = components(conveyor.direction);
                this.vx = move.x * conveyor.speed;
                this.vy = move.y * conveyor.speed;
                break;
            }
        }
    }

    isValid() {
        return this.state.moulded &&
            (this.state.sprayed[0] && this.state.sprayed[2]) || (this.state.sprayed[1] && this.state.sprayed[3]) &&
            this.state.printed[0] && !(this.state.printed[1] || this.state.printed[2] || this.state.printed[3]);
    }
}