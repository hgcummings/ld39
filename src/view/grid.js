import type {Direction} from '../model/direction';
import {type Draw, unit} from './graphics/common';
import type Sprite from '../model/sprite';
import drawTile from './graphics/tile';
import drawBorder from './graphics/border';

export default (grid: {width: number, height: number}) => {
    const canvas = document.createElement('canvas');
    canvas.width = unit * grid.width;
    canvas.height = unit * grid.height;

    const context = canvas.getContext('2d');

    const renderFloor = () => {
        for (let i = 0; i < grid.width; ++i) {
            for(let j = 0; j < grid.height; ++j) {
                render(i, j, null, null, drawTile);
            }
        }
    };

    const renderBorder = () => {
        for (let i = 0; i < grid.width; ++i) {
            for(let j = 0; j < grid.height; ++j) {
                if (j === 0) { render(i, j, 0, drawBorder); }
                if (i === grid.width - 1) { render(i, j, 1, drawBorder); }
                if (j === grid.height - 1) { render(i, j, 2, drawBorder); }
                if (i === 0) { render(i, j, 3, drawBorder); }
            }
        }
    };

    const render = (x: number, y: number, direction: ?Direction,
        foreground: ?Draw, background: ?Draw, scale: ?number) => {
        context.save();
        context.translate((unit * x) + (unit / 2), (unit * y) + (unit / 2));
        if (scale) {
            context.scale(scale, scale);
        }
        if (background) {
            background(context);
        }
        if (foreground && (direction != null)) {
            context.rotate(direction * Math.PI / 2);
            foreground(context);
        }
        context.restore();
    }

    const renderSprite = (
            model:Sprite, view: { foreground?: Draw, background?: Draw, scale?: number }) => {
        render(model.x, model.y, model.direction, view.foreground, view.background, view.scale);
    }

    return {
        element: canvas,
        renderFloor: renderFloor,
        renderSprite: renderSprite,
        renderBorder: renderBorder
    };
}
