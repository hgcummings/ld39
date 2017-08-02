import {Fixture} from '../objects';
import {type Body} from '../geometry';
import {type Direction} from '../direction';

export default class Chute extends Fixture {
    body: Body;
    
    constructor(x: number, y: number, direction: Direction) {
        super(x, y, direction);
        this.body = {
            x: x,
            y: y,
            width: 1,
            height: 1
        }
    }
}