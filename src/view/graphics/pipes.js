import {unit, drawCircle, preRender} from './common';

const createGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(-unit / 2, 0, unit / 2, 0);
    gradient.addColorStop(0, '#333');
    gradient.addColorStop(0.5, '#999');
    gradient.addColorStop(1, '#333');
    return gradient;
};

export const drawPipe = preRender((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = createGradient(ctx);
    ctx.fillRect(-unit/4, -unit/2, unit/2, unit);
});

const drawSupply = (active: boolean) => preRender((ctx:CanvasRenderingContext2D) => {
    const outerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, unit / 2);
    outerGradient.addColorStop(0, '#333');
    outerGradient.addColorStop(1, '#ccc');
    ctx.fillStyle = outerGradient;
    drawCircle(ctx, 0, 0, unit * 3 / 8);
    ctx.fill();

    const innerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, unit / 2);
    innerGradient.addColorStop(0, '#999');
    innerGradient.addColorStop(1, '#333');
    ctx.fillStyle = innerGradient;
    drawCircle(ctx, 0, 0, active ? unit * 5/16 : unit / 4);
    ctx.fill();

    ctx.fillStyle = createGradient(ctx);
    ctx.fillRect(-unit/4, 0, unit/2, unit/2);
});

export const drawSupplyActive = drawSupply(true);
export const drawSupplyInactive = drawSupply(false);
