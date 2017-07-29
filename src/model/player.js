import {getDirection} from '../input';
import {type Direction, components} from './direction';
import {type Point} from './geometry';

export default (start:Point) => {
    const move_speed = 0.003;
    const move_power = 0.005;
    const idle_power = 0.0005;

    const self = {
        x: start.x,
        y: start.y,
        direction: 0,
        power: 100,
        active: false,
        update: (dt: number) => {
            const direction = getDirection();
            
            if (direction !== null) {
                self.direction = direction;
                self.power -= move_power * dt;
                self.x += move_speed * components(direction).x * dt;
                self.y += move_speed * components(direction).y * dt;
                self.active = true;
            } else {
                self.power -= idle_power * dt;
                self.active = false;
            }
        }
    };

    return self;
}