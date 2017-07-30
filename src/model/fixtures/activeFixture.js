import {Fixture} from '../objects';
import {type Direction} from '../direction';

export default class ActiveFixture extends Fixture {
    period: number;
    offset: number;
    
    constructor(x: number, y: number, direction: Direction, period: number, offset: number) {
        super(x, y, direction);
        this.period = period;
        this.offset = offset;
    }
}