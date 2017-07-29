import initGridModel from './grid';
import initPlayerModel from './player';

export default () => {
    let previousUpdate = 0;
    const self = {
        grid: initGridModel(),
        player: initPlayerModel(),
        update: (gameTime: number) => {
            self.player.update(gameTime - previousUpdate);
            previousUpdate = gameTime;
        }
    }

    return self;
}
