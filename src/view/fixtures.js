import {drawCircle, preRender, unit} from './drawing';

export const tile = preRender((ctx: CanvasRenderingContext2D) => {
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

const preRenderedShadow = document.createElement('canvas');
preRenderedShadow.width = unit * 100;
preRenderedShadow.height = unit * 100;
const ctx = preRenderedShadow.getContext('2d');
const shadowGradient = ctx.createRadialGradient(preRenderedShadow.width / 2, preRenderedShadow.height / 2, 0, preRenderedShadow.width / 2, preRenderedShadow.height / 2, unit * 6);
shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
shadowGradient.addColorStop(0.25, 'rgba(0, 0, 0, 0)');
shadowGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
ctx.fillStyle = shadowGradient;
ctx.fillRect(0, 0, preRenderedShadow.width, preRenderedShadow.height);

export const shadow = (ctx: CanvasRenderingContext2D) => {
    ctx.drawImage(preRenderedShadow, -preRenderedShadow.width / 2, -preRenderedShadow.height / 2);
}
