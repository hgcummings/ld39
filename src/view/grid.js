import type {Direction} from '../model/direction';
import {type Draw, unit} from './drawing';
import {type Sprite} from './sprites';

export default (grid: {width: number, height: number}) => {
    const canvas = document.createElement('canvas');
    canvas.width = (unit * grid.width);
    canvas.height = unit * grid.height;
    canvas.style.backgroundColor = '#CCCCCC';

    const context = canvas.getContext('2d');

    const clear = () => {
        context.clearRect(0,0, canvas.width, canvas.height);
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

    const renderSprite = (model:Sprite, frames:[Draw]) => {
        render(model.x, model.y, model.direction, frames[0]);
    }

    return {
        element: canvas,
        clear: clear,
        renderSprite: renderSprite
    };
}
