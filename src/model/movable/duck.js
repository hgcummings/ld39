import Movable from './movable';
import {type Direction, components} from '../direction';
import Conveyor from '../fixtures/conveyor';
import Chute from '../fixtures/chute';

export default class Duck extends Movable {
    z: number;
    vz: number;
    state: { pressed:boolean, painted: Array<boolean>, printed: Array<boolean> }

    constructor(x: number, y: number, direction: Direction) {
        super(x, y, direction);
        this.z = 0;
        this.vz = 0;
        this.state = {
            pressed: false,
            painted: [false, false, false, false],
            printed: [false, false, false, false]
        }
    }

    update(gameTime: number) {
        super.update(gameTime);
        this.z += this.vz;
    }

    isValid() {
        return this.state.pressed &&
            ((this.state.painted[0] && this.state.painted[2]) || (this.state.painted[1] && this.state.painted[3])) &&
            this.state.printed[0] && !(this.state.printed[1] || this.state.printed[2] || this.state.printed[3]);
    }
}