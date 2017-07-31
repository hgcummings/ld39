import {loadLevel} from './levels';
import initPlayerModel from './player';
import Duck from './duck';

export const tick = 125;
export const tickFrequency = 0.008;

export default () => {
    const level = loadLevel(0);
    let lastUpdate = 0;
    const self = {
        level: level,
        player: initPlayerModel(level),
        ducks: [],
        score: 0,
        update: (gameTime: number) => {
            self.player.update(gameTime);

            if (Math.floor(gameTime / tick) > Math.floor(lastUpdate / tick)) {
                const nextTick = lastUpdate + tick - (lastUpdate % tick);
                for (let time = nextTick; time <= gameTime; time += tick) {
                    const tickNumber = time / tick;

                    for (let lever of level.fixtures.levers) {
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

                    for (let supply of level.fixtures.supplies) {
                        supply.update(self, tickNumber);
                    }

                    for (let mould of level.fixtures.moulds) {
                        mould.update(self, tickNumber);
                    }

                    for (let spray of level.fixtures.sprays) {
                        spray.update(self, tickNumber);
                    }

                    for (let printer of level.fixtures.printers) {
                        printer.update(self, tickNumber);
                    }

                    for (let piston of level.fixtures.pistons) {
                        piston.update(self, tickNumber);
                    }

                    for (let checker of level.fixtures.checkers) {
                        checker.update(self, tickNumber);
                    }
                }

                lastUpdate = gameTime;
            }
        }
    }

    return self;
}
