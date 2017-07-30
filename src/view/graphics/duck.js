import {unit, drawCircle, preRender} from './common';

const drawBody = preRender((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createRadialGradient(0, unit / 3, 0, 0, unit / 3, unit);
    gradient.addColorStop(0, '#ee6');
    gradient.addColorStop(1/6, '#cc5');
    gradient.addColorStop(1, '#aa4');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, -unit/3);
    ctx.bezierCurveTo(unit / 3, -unit / 3, unit / 3, unit / 6, 0, unit / 3);
    ctx.bezierCurveTo(-unit / 3, unit / 6, -unit / 3, -unit / 3, 0, -unit / 3);
    ctx.fill();
});

const drawHead = preRender((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createRadialGradient(0, -unit / 16, 0, 0, -unit / 16, unit / 6);
    gradient.addColorStop(0, '#ee6');
    gradient.addColorStop(0.25, '#ee6');
    gradient.addColorStop(0.75, '#dd5');
    gradient.addColorStop(1, '#cc4');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    drawCircle(ctx, 0, -unit / 16, unit / 6);
    ctx.fill();
});

const drawBeak = preRender((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#e70';
    ctx.beginPath();
    ctx.moveTo(-unit / 8, -unit /6);
    ctx.quadraticCurveTo(0, -unit/2, unit/8, -unit/6);
    ctx.quadraticCurveTo(0, -unit/4, -unit/8, -unit/6);
    ctx.fill();
});

const drawEyes = preRender((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#333';
    drawCircle(ctx, -unit /16, -unit /7, unit/48);
    ctx.fill();
    drawCircle(ctx, unit /16, -unit /7, unit/48);
    ctx.fill();
});

export const foreground = (ctx: CanvasRenderingContext2D) => {
    drawBody(ctx);
    drawHead(ctx);
    drawBeak(ctx);
    drawEyes(ctx);
}
