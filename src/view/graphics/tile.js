import {unit, preRender} from './common';

export default preRender((ctx: CanvasRenderingContext2D) => {
    const distanceFromEdge = (i, j) => {
        return Math.min(i, j, unit - 1 - i, unit - 1 - j);
    }

    for (let i = 0; i < unit; ++i) {
        for (let j = 0; j < unit; ++j) {
            let value = Math.round(80 + 
                Math.round(64 * Math.pow((2 * unit - j - i) / unit, 1/3) + 
                16 * Math.random()));
            if (distanceFromEdge(i, j) <= unit / 48) {
                value -= 8;
            }
            ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
            ctx.fillRect(i - unit/2, j - unit/2, 1, 1);
        }
    }
});
