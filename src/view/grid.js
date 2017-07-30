import type {Direction} from '../model/direction';
import {type Draw, unit} from './drawing';
import type Sprite from '../model/sprite';
import {tile} from './fixtures';

export default (grid: {width: number, height: number}) => {
    const canvas = document.createElement('canvas');
    canvas.width = unit * grid.width;
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
        clear: clear,
        renderSprite: renderSprite
    };
}
