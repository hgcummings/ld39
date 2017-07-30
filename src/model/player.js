import {getDirection} from '../input';
import {type Direction, components} from './direction';
import {overlap, constrain} from './geometry';
import Conveyor from './conveyor';
import {type Sprite} from './objects';
import {tickFrequency} from './game';

export default (level: {start: Sprite, conveyors: Array<Conveyor>, width: number, height: number}) => {
    const move_speed = 0.375;
    const move_power = 0.625;
    const idle_power = 0.0625;
    const levelBoundary = { x: level.width - 1, y: level.height - 1 };

    const self = {
        x: level.start.x,
        y: level.start.y,
        vx: 0,
        vy: 0,
        lastUpdate: 0,
        direction: level.start.direction,
        power: 100,
        active: false,
        update: (gameTime: number) => {
            const direction = getDirection();
            const dt = gameTime - self.lastUpdate;
            self.lastUpdate = gameTime;
            
            if (direction !== null) {
                self.direction = direction;
                self.power -= move_power * dt * tickFrequency;
                self.vx = move_speed * components(direction).x * dt * tickFrequency;
                self.vy = move_speed * components(direction).y * dt * tickFrequency;
                self.active = true;
            } else {
                self.vx = 0;
                self.vy = 0;
                self.power -= idle_power * dt * tickFrequency;
                self.active = false;
            }

            for (let conveyor of level.conveyors) {
                if (overlap(self, conveyor)) {
                    self.vx += conveyor.velocity.x * dt * tickFrequency;
                    self.vy += conveyor.velocity.y * dt * tickFrequency;
                    break;
                }
            }

            self.x += self.vx;
            self.y += self.vy;

            constrain(self, levelBoundary);
        }
    };

    return self;
}