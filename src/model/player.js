import {getDirection} from '../input';
import {type Direction, components} from './direction';
import {overlap, constrain, distance, type Body, circleBodies} from './geometry';
import Conveyor from './fixtures/conveyor';
import {type Fixture} from './objects';
import type Movable from './movable/movable';
import {tickFrequency} from './game';

export const radius = 3/8;

export default (start: Fixture) => {
    const move_speed = 0.375;
    const move_power = 0.625;
    const idle_power = 0.0625;

    const self = {
        x: start.x,
        y: start.y,
        vx: 0,
        vy: 0,
        lastUpdate: 0,
        direction: start.direction,
        power: 100,
        active: false,
        update: (model: {
                    level: {
                        machinery: {
                            conveyors: Array<Conveyor>,
                            fixed: Array<{ body:Body }>,
                            movable: () => Iterable<Movable>
                        }, width: number, height: number
                    }
                }, gameTime: number) => {
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

            for (let conveyor of model.level.machinery.conveyors) {
                if (overlap(self, conveyor)) {
                    self.vx += conveyor.velocity.x * dt * tickFrequency;
                    self.vy += conveyor.velocity.y * dt * tickFrequency;
                    break;
                }
            }

            self.x += self.vx;
            self.y += self.vy;

            let collided = false;
            for (let body of circleBodies(self.x, self.y, radius)) {
                for (let fixed of model.level.machinery.fixed) {
                    const dist = distance(body, fixed.body);
                    if (dist.x < 0 && dist.y < 0) {
                        self.x += Math.max(dist.x, -1 * Math.abs(self.vx)) * Math.sign(self.vx);
                        self.y += Math.max(dist.y, -1 * Math.abs(self.vy)) * Math.sign(self.vy);
                        collided = true;
                        break;
                    }
                }

                if (collided) {
                    break;
                }

                for (let movable of model.level.machinery.movable()) {
                    const movableBody = movable.body();
                    if (movableBody) {
                        const dist = distance(body, movableBody);
                        if (dist.x < 0 && dist.y < 0) {
                            self.x += Math.max(dist.x, -1 * Math.abs(self.vx)) * Math.sign(self.vx);
                            self.y += Math.max(dist.y, -1 * Math.abs(self.vy)) * Math.sign(self.vy);
                            collided = true;
                            break;
                        }
                    }
                }

                if (collided) {
                    break;
                }
            }

            constrain(self, { x: model.level.width - 1, y: model.level.height - 1 });
        }
    };

    return self;
}