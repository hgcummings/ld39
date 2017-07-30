import {loadLevel} from './levels';
import initPlayerModel from './player';

export default () => {
    let previousUpdate = 0;
    const level = loadLevel();
    const self = {
        level: level,
        player: initPlayerModel(level),
        update: (gameTime: number) => {
            const dt = gameTime - previousUpdate;
            self.player.update(dt);

            for (let lever of level.levers) {
                lever.update(self.player);
            }

            previousUpdate = gameTime;
        }
    }

    return self;
}
