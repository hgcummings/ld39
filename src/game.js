import initGridView from './view/grid';
import initHudView from './view/hud';
import initModel from './model/game';
import {type Sprite, type Fixture} from './model/objects';
import {type Drawable} from './view/graphics/common';
import * as sprites from './view/sprites';
import * as machinery from './view/machinery';

export const init = (container: HTMLElement, levelId: number) => {
    const model = initModel(levelId);

    const gridView = initGridView(model.level);
    container.appendChild(gridView.element);

    const hudView = initHudView();
    container.appendChild(hudView.element);

    const startTime = new Date().getTime();

    const renderSprites = function<TSprite : Sprite>(
            sprites: Array<TSprite>, buildView: (model: TSprite, gameTime: number) => Drawable, gameTime: number) {
        for (let sprite of sprites) {
            gridView.renderSprite(sprite, buildView(sprite, gameTime), gameTime);
        }
    }

    const renderFixtures = function<TFixture: Fixture>(fixtures: Array<TFixture>, buildView: (fixture: TFixture) => Drawable) {
        for (let fixture of fixtures) {
            gridView.renderFixture(fixture, buildView(fixture));
        }
    }

    const animate = () => {
        const gameTime = new Date().getTime() - startTime;

        model.update(gameTime);

        hudView.update(model);

        if (model.over) {
            container.removeChild(gridView.element);
            return;
        }

        gridView.renderFloor();

        renderFixtures(model.level.machinery.conveyors, conveyor => machinery.conveyor(conveyor, gameTime));
        renderFixtures(model.level.machinery.turntables, turntable => machinery.turntable(turntable, gameTime));
        renderFixtures(model.level.machinery.chutes, chute => machinery.chute);
        renderFixtures(model.level.machinery.levers, level => machinery.lever);
        renderSprites(model.ducks, sprites.duck, gameTime);
        renderFixtures(model.level.machinery.presses, press => machinery.press(press, gameTime));
        renderFixtures(model.level.machinery.painters, painter => machinery.painter(painter, gameTime));
        renderFixtures(model.level.machinery.pushers, pusher => machinery.pusher(pusher, gameTime));
        renderFixtures(model.level.machinery.printers, printer => machinery.printer(printer, gameTime));
        gridView.renderSprite(model.player, sprites.player(model.player), gameTime);
        renderFixtures(model.level.machinery.checkers, machinery.checker);
        renderFixtures(model.level.machinery.pipes, pipe => machinery.pipe);
        renderFixtures(model.level.machinery.outlets, outlet => machinery.outlet(outlet, gameTime));

        if (model.level.meta.shadow) {
            gridView.renderSprite(model.player, sprites.shadow(model.player), gameTime);
        }

        gridView.renderBorder();

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}
