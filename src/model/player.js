import {getDirection} from '../input';
import {type Direction, components} from './direction';
import {overlap, constrain, distance, type Body, circleBodies} from './geometry';
import Conveyor from './fixtures/conveyor';
import {type Fixture} from './objects';
import {tickFrequency} from './game';

export const radius = 3/8;

export default (level: {start: Fixture, machinery: { conveyors: Array<Conveyor>, fixed: Array<{ body:Body }> }, width: number, height: number}) => {
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

            for (let conveyor of level.machinery.conveyors) {
                if (overlap(self, conveyor)) {
                    self.vx += conveyor.velocity.x * dt * tickFrequency;
                    self.vy += conveyor.velocity.y * dt * tickFrequency;
                    break;
                }
            }

            self.x += self.vx;
            self.y += self.vy;

            for (let body of circleBodies(self.x, self.y, radius)) {
                for (let fixed of level.machinery.fixed) {
                    const dist = distance(body, fixed.body);
                    if (dist.x < 0 && dist.y < 0) {
                        self.x += Math.max(dist.x, -1 * Math.abs(self.vx)) * Math.sign(self.vx);
                        self.y += Math.max(dist.y, -1 * Math.abs(self.vy)) * Math.sign(self.vy);
                        break;
                    }
                }
            }

            constrain(self, levelBoundary);
        }
    };

    return self;
}