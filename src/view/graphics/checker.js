import {unit, preRender, drawGradientCircle} from './common';

const drawBase = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, unit);
    gradient.addColorStop(0, '#999');
    gradient.addColorStop(1, '#666');
    ctx.fillStyle = gradient;

    ctx.fillRect(-unit / 2, -unit / 2, unit, unit);

    ctx.fillStyle = '#333';
    ctx.fillRect(-unit / 4, unit / 4, unit / 2, unit / 12);
};

export const resting = preRender((ctx: CanvasRenderingContext2D) => {
    drawBase(ctx);
    drawGradientCircle(ctx, -unit / 4, -unit / 8, unit / 6, '#866', '#433');
    drawGradientCircle(ctx, unit / 4, -unit / 8, unit / 6, '#686', '#343');
});

export const success = preRender((ctx: CanvasRenderingContext2D) => {
    drawBase(ctx);
    drawGradientCircle(ctx, -unit / 4, -unit / 8, unit / 6, '#866', '#433');
    drawGradientCircle(ctx, unit / 4, -unit / 8, unit / 6, '#6c6', '#393');
});

export const failure = preRender((ctx: CanvasRenderingContext2D) => {
    drawBase(ctx);
    drawGradientCircle(ctx, -unit / 4, -unit / 8, unit / 6, '#f96', '#933');
    drawGradientCircle(ctx, unit / 4, -unit / 8, unit / 6, '#686', '#343');
});
