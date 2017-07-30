import {loadLevel} from './levels';
import initPlayerModel from './player';
import Duck from './duck';

export default () => {
    let previousUpdate = 0;
    const level = loadLevel();
    const self = {
        level: level,
        player: initPlayerModel(level),
        ducks: [new Duck(level, 1, 3, 1)],
        update: (gameTime: number) => {
            const dt = gameTime - previousUpdate;
            self.player.update(dt);

            for (let lever of level.levers) {
                lever.update(self.player);
            }

            for (let duck of self.ducks) {
                duck.update(dt);
            }

            previousUpdate = gameTime;
        }
    }

    return self;
}
