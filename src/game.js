import initGridView from './view/grid';
import initSprites from './view/sprites';
import initHudView from './view/hud';
import initModel from './model/game';
import * as sprites from './view/sprites';

export const init = () => {
    const model = initModel();

    // $FlowFixMe
    const container: HTMLElement = document.getElementById('game');
    const gridView = initGridView(model.level);
    container.appendChild(gridView.element);

    const hudView = initHudView();
    container.appendChild(hudView.element);

    const startTime = new Date().getTime();

    const animate = () => {
        const gameTime = new Date().getTime() - startTime;

        model.update(gameTime);

        hudView.update(model);

        gridView.clear();
        model.level.conveyers.forEach(conveyer => {
            gridView.renderSprite(conveyer, sprites.conveyer, gameTime);
        });

        gridView.renderSprite(model.player, sprites.player, gameTime);

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}
