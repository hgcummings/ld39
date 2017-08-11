import levels from './levels';
import initPlayerModel from './player';
import Duck from './movable/duck';
import {allOf} from '../util';

export const tick = 125;
export const tickFrequency = 0.008;

export default (levelId: number) => {
    const level = levels[levelId];
    let lastUpdate = 0;
    const self = {
        level: level,
        player: initPlayerModel(level.start),
        ducks: [],
        score: 0,
        over: false,
        movable: () => allOf(self.ducks, self.level.machinery.movable()),
        update: (gameTime: number) => {
            self.player.update(self, gameTime);

            if (self.player.power <= 0) {
                self.over = true;
                return;
            }

            if (Math.floor(gameTime / tick) > Math.floor(lastUpdate / tick)) {
                const nextTick = lastUpdate + tick - (lastUpdate % tick);
                for (let time = nextTick; time <= gameTime; time += tick) {
                    const tickNumber = time / tick;

                    for (let lever of level.machinery.levers) {
                        lever.update(self.player);
                    }

                    for (let i = self.ducks.length - 1; i >=0; --i) {
                        const duck = self.ducks[i];
                        duck.update(gameTime);

                        if (duck.z <= -1) {
                            self.ducks.splice(i, 1);
                        }

                        if (duck.x <= -1 || duck.y <= -1 || duck.x >= level.width || duck.y >= level.height) {
                            self.ducks.splice(i, 1);

                            if (duck.isValid()) {
                                self.score++;
                            }
                        }
                    }

                    for (let conveyor of level.machinery.conveyors) {
                        conveyor.update(self);
                    }

                    for (let outlet of level.machinery.outlets) {
                        outlet.update(self, tickNumber);
                    }

                    for (let press of level.machinery.presses) {
                        press.update(self, tickNumber);
                    }

                    for (let painter of level.machinery.painters) {
                        painter.update(self, tickNumber);
                    }

                    for (let printer of level.machinery.printers) {
                        printer.update(self, tickNumber);
                    }

                    for (let pusher of level.machinery.pushers) {
                        pusher.update(self, tickNumber);
                    }

                    for (let turntable of level.machinery.turntables) {
                        turntable.update(self, tickNumber);
                    }

                    for (let checker of level.machinery.checkers) {
                        checker.update(self, tickNumber);
                    }
                }

                lastUpdate = gameTime;
            }
        }
    }

    return self;
}
