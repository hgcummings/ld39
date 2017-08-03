import initGridView from './view/grid';
import initHudView from './view/hud';
import initModel from './model/game';
import * as sprites from './view/sprites';
import * as machinery from './view/machinery';

export const init = (container: HTMLElement, levelId: number) => {
    const model = initModel(levelId);

    const gridView = initGridView(model.level);
    container.appendChild(gridView.element);

    const hudView = initHudView();
    container.appendChild(hudView.element);

    const startTime = new Date().getTime();

    const animate = () => {
        const gameTime = new Date().getTime() - startTime;

        model.update(gameTime);

        hudView.update(model);

        if (model.over) {
            container.removeChild(gridView.element);
            return;
        }

        gridView.renderFloor();

        for (let conveyor of model.level.fixtures.conveyors) {
            gridView.renderFixture(conveyor, machinery.conveyor(conveyor, gameTime));
        }

        for (let turntable of model.level.fixtures.turntables) {
            gridView.renderFixture(turntable, machinery.turntable(turntable, gameTime));
        }

        for (let chute of model.level.fixtures.chutes) {
            gridView.renderFixture(chute, machinery.chute);
        }

        for (let lever of model.level.fixtures.levers) {
            gridView.renderFixture(lever, machinery.lever);
        }

        for (let duck of model.ducks) {
            gridView.renderSprite(gameTime, duck, sprites.duck(duck, gameTime));
        }

        for (let press of model.level.fixtures.presses) {
            gridView.renderFixture(press, machinery.press(press, gameTime));
        }

        for (let painter of model.level.fixtures.painters) {
            gridView.renderFixture(painter, machinery.painter(painter, gameTime));
        }

        for (let pusher of model.level.fixtures.pushers) {
            gridView.renderFixture(pusher, machinery.pusher(pusher, gameTime));
        }

        for (let printer of model.level.fixtures.printers) {
            gridView.renderFixture(printer, machinery.printer(printer, gameTime));
        }

        gridView.renderSprite(gameTime, model.player, sprites.player(model.player));

        for (let checker of model.level.fixtures.checkers) {
            gridView.renderFixture(checker, machinery.checker(checker));
        }

        for (let pipe of model.level.fixtures.pipes) {
            gridView.renderFixture(pipe, machinery.pipe);
        }

        for (let outlet of model.level.fixtures.outlets) {
            gridView.renderFixture(outlet, machinery.outlet(outlet, gameTime));
        }

        if (model.level.meta.shadow) {
            gridView.renderSprite(gameTime, model.player, sprites.shadow(model.player));
        }

        gridView.renderBorder();

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}
