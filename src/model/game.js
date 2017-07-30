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
        update: (gameTime: number) => {
            self.player.update(gameTime);

            if (Math.floor(gameTime / tick) > Math.floor(lastUpdate / tick)) {
                const nextTick = lastUpdate + tick - (lastUpdate % tick);
                for (let time = nextTick; time <= gameTime; time += tick) {
                    const tickNumber = time / tick;

                    for (let lever of level.fixtures.levers) {
                        lever.update(self.player);
                    }

                    for (let supply of level.fixtures.supplies) {
                        supply.update(self, tickNumber);
                    }

                    for (let mould of level.fixtures.moulds) {
                        mould.update(self, tickNumber);
                    }

                    for (let duck of self.ducks) {
                        duck.update(gameTime);
                    }
                }

                lastUpdate = gameTime;
            }
        }
    }

    return self;
}
