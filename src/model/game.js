import {loadLevel} from './levels';
import initPlayerModel from './player';

export default () => {
    let previousUpdate = 0;
    const level = loadLevel();
    const self = {
        level: level,
        player: initPlayerModel(level.start),
        update: (gameTime: number) => {
            const dt = gameTime - previousUpdate;
            self.player.update(dt);
            for (let conveyer of level.conveyers) {
                if (conveyer.update(self.player, dt)) {
                    break;
                }
            }
            previousUpdate = gameTime;
        }
    }

    return self;
}
