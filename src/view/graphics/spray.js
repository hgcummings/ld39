import {unit, preRender, drawGradientCircle} from './common';

export const inactive = preRender((ctx: CanvasRenderingContext2D) => {
    drawGradientCircle(ctx, 0, 0, unit * 3/8, '#999', '#666');
    ctx.fill();
    ctx.fillStyle = '#ccc';
    ctx.fillRect(-unit/32, -unit * 7/16, unit/16, unit/16);
});

export const active = preRender((ctx: CanvasRenderingContext2D) => {
    inactive(ctx);

    const gradient = ctx.createLinearGradient(0, -unit, 0, -unit / 2);
    gradient.addColorStop(0, 'rgba(238, 239, 104, 0)');
    gradient.addColorStop(1, 'rgba(238, 239, 104, 1)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(-unit/2, -unit);
    ctx.lineTo(0, -unit/2);
    ctx.lineTo(unit/2, -unit);
    ctx.fill();
}, unit, 2 * unit);