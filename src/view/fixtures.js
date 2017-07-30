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

const shadowLimit = unit * 6;
const preRenderSize = unit * 16;
const preRenderedShadow = document.createElement('canvas');
preRenderedShadow.width = preRenderedShadow.height = preRenderSize;
const ctx = preRenderedShadow.getContext('2d');
const shadowGradient = ctx.createRadialGradient(
    preRenderSize / 2, preRenderSize / 2, 0, preRenderSize / 2, preRenderSize / 2, shadowLimit);
shadowGradient.addColorStop(0, 'rgba(6, 6, 6, 0)');
shadowGradient.addColorStop(0.25, 'rgba(6, 6, 6, 0)');
shadowGradient.addColorStop(0.5, 'rgba(6, 6, 6, 0.25)');
shadowGradient.addColorStop(1, 'rgba(6, 6, 6, 1)');
ctx.fillStyle = shadowGradient;
ctx.fillRect(0, 0, preRenderSize, preRenderSize);

const shadowFrame = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(6, 6, 6)';
    ctx.fillRect(-unit * 512, -unit * 512, unit * 512 - shadowLimit, unit * 1024);
    ctx.fillRect(-unit * 512, -unit * 512, unit * 1024, unit * 512 - shadowLimit);
    ctx.fillRect(shadowLimit, -unit * 512, unit * 512 - shadowLimit, unit * 1024);
    ctx.fillRect(-unit * 512, shadowLimit, unit * 1024, unit * 512 - shadowLimit);
    ctx.drawImage(preRenderedShadow, -preRenderedShadow.width / 2, -preRenderedShadow.height / 2);
};

export const shadow = (model: { power: number }) => {
    return {
        background: shadowFrame,
        scale: Math.max(1 - Math.pow(1 - model.power / 100, 3), 1 / 16)
    }
}

const leverFrame = preRender((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, -unit/2, 0, unit / 2);
    gradient.addColorStop(0, '#a93');
    gradient.addColorStop(11/24, '#762');
    gradient.addColorStop(12/24, '#541');
    gradient.addColorStop(13/24, '#652');
    gradient.addColorStop(1, '#652');
    ctx.strokeStyle = '#320';
    ctx.lineWidth = unit / 24;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(-unit * 16/48, -unit * 19/48);
    ctx.lineTo(unit * 16/48, -unit * 19/48);
    ctx.lineTo(unit * 5/16, 0);
    ctx.lineTo(unit * 5/16, unit * 3/8);
    ctx.lineTo(-unit * 5/16, unit * 3/8);
    ctx.lineTo(-unit * 5/16, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
});

export const lever = {
    foreground: leverFrame
};
