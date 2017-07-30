import initGridView from './view/grid';
import initHudView from './view/hud';
import initModel from './model/game';
import * as sprites from './view/sprites';
import * as fixtures from './view/fixtures';

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

        gridView.renderFloor();

        for (let conveyor of model.level.fixtures.conveyors) {
            gridView.renderFixture(conveyor, fixtures.conveyor(conveyor, gameTime));
        }

        for (let lever of model.level.fixtures.levers) {
            gridView.renderFixture(lever, fixtures.lever);
        }

        for (let duck of model.ducks) {
            gridView.renderSprite(gameTime, duck, sprites.duck());
        }

        gridView.renderSprite(gameTime, model.player, sprites.player(model.player));

        if (model.level.meta.shadow) {
            gridView.renderSprite(gameTime, model.player, sprites.shadow(model.player));
        }

        gridView.renderBorder();

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}
