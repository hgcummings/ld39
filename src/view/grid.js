import type {Direction} from '../model/direction';
import {type Draw, unit} from './drawing';
import {type Sprite} from './sprites';
import {tile} from './fixtures';

export default (grid: {width: number, height: number}) => {
    const canvas = document.createElement('canvas');
    canvas.width = (unit * grid.width);
    canvas.height = unit * grid.height;
    canvas.style.backgroundColor = '#CCCCCC';

    const context = canvas.getContext('2d');

    const clear = () => {
        for (let i = 0; i < grid.width; ++i) {
            for(let j = 0; j < grid.width; ++j) {
                render(i, j, null, null, tile);
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
            context.save();
            background(context);
            context.restore();
        }
        if (foreground && (direction != null)) {
            context.rotate(direction * Math.PI / 2);
            foreground(context);
        }
        context.restore();
    }

    const renderSprite = (model:Sprite, view:{ frames: Array<Draw>}, gameTime: number) => {
        let frameNumber = 0;
        if (view.frames.length > 1 && view.rate && model.speed) {
            const frameDuration = (1 / model.speed) / view.rate;
            frameNumber = Math.floor(gameTime / frameDuration) % view.frames.length;
        }
        render(model.x, model.y, model.direction, view.frames[frameNumber]);
    }

    return {
        element: canvas,
        clear: clear,
        render: render,
        renderSprite: renderSprite
    };
}
