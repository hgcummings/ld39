import Movable from './movable';
import {type Direction, components} from '../direction';
import Conveyor from '../fixtures/conveyor';
import Chute from '../fixtures/chute';

export default class Duck extends Movable {
    z: number;
    level: { fixtures: { conveyors: Array<Conveyor>, chutes: Array<Chute> } };
    vz: number;
    state: { moulded:boolean, sprayed: Array<boolean>, printed: Array<boolean> }

    // $FlowFixMe
    constructor(level: { fixtures: { conveyors: Array<Conveyor>, chutes: Array<Chute> } },
            x: number, y: number, direction: Direction) {
        super(x, y, direction);
        this.z = 0;
        this.vz = 0;
        this.level = level;
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
            ((this.state.sprayed[0] && this.state.sprayed[2]) || (this.state.sprayed[1] && this.state.sprayed[3])) &&
            this.state.printed[0] && !(this.state.printed[1] || this.state.printed[2] || this.state.printed[3]);
    }
}