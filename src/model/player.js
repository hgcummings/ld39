import {getDirection} from '../input';
import {type Direction, components} from './direction';

export default () => {
    const move_speed = 0.05;
    const move_power = 0.005;
    const idle_power = 0.0005;

    const self = {
        x: 12,
        y: 8,
        direction: 0,
        power: 100,
        active: false,
        update: (dt: number) => {
            const direction = getDirection();
            
            if (direction !== null) {
                self.direction = direction;
                self.power -= move_power * dt;
                self.x += move_speed * components(direction).x;
                self.y += move_speed * components(direction).y;
                self.active = true;
            } else {
                self.power -= idle_power * dt;
                self.active = false;
            }
        }
    };

    return self;
}