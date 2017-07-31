import {unit, preRender} from './common';

const drawRamp =
    (ctx: CanvasRenderingContext2D, base: number, x1: number, x2: number) => {
        const gradient = ctx.createLinearGradient(0, -unit / 2, 0, base);
        gradient.addColorStop(0, '#666');
        gradient.addColorStop(1, '#333');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(-unit / 2, -unit / 2);
        ctx.lineTo(unit / 2, -unit / 2);
        ctx.lineTo(x1, base);
        ctx.lineTo(x2, base);
        ctx.fill();
    }

export default preRender((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#111';
    ctx.fillRect(-unit/2, -unit/2, unit, unit);
    drawRamp(ctx, unit / 6, unit / 4, -unit / 4);
    ctx.rotate(Math.PI / 2);
    drawRamp(ctx, -unit / 4, unit / 3, unit / 6);
    ctx.rotate(Math.PI / 2);
    drawRamp(ctx, -unit / 3, unit / 4, -unit / 4);
    ctx.rotate(Math.PI / 2);
    drawRamp(ctx, -unit / 4, -unit / 6, -unit / 3);
});