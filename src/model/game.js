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
            level.conveyers.forEach(conveyer => {
                conveyer.update(self.player, dt);
            });
            previousUpdate = gameTime;
        }
    }

    return self;
}
