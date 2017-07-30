import {unit, drawCircle, preRender, preRenderCell} from './common';

const unpaintedPallete = ['#ddd', '#ccc', '#bbb', '#999'];
const paintedPallete = ['#ee6', '#dd5', '#cc5', '#aa4'];

const drawMoulded = (pallete: Array<string>) => preRenderCell((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createRadialGradient(0, unit / 3, 0, 0, unit / 3, unit);
    gradient.addColorStop(0, pallete[0]);
    gradient.addColorStop(1/6, pallete[2]);
    gradient.addColorStop(1, pallete[3]);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, -unit/3);
    ctx.bezierCurveTo(unit / 3, -unit / 3, unit / 3, unit / 6, 0, unit / 3);
    ctx.bezierCurveTo(-unit / 3, unit / 6, -unit / 3, -unit / 3, 0, -unit / 3);
    ctx.fill();

    const headGradient = ctx.createRadialGradient(0, -unit / 16, 0, 0, -unit / 16, unit / 6);
    headGradient.addColorStop(0, pallete[0]);
    headGradient.addColorStop(0.25, pallete[0]);
    headGradient.addColorStop(0.75, pallete[1]);
    headGradient.addColorStop(1, pallete[2]);
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    drawCircle(ctx, 0, -unit / 16, unit / 6);
    ctx.fill();
})

export const drawUnpainted = drawMoulded(unpaintedPallete);
export const drawPainted = drawMoulded(paintedPallete);

const drawGradientCircle = (ctx:CanvasRenderingContext2D, x: number, y: number, r: number, from: string, to: string) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, from);
    gradient.addColorStop(1, to);
    ctx.fillStyle = gradient;
    drawCircle(ctx, x, y, r);
    ctx.fill();
};
const drawUnmoulded = (pallete:Array<string>) => preRenderCell((ctx: CanvasRenderingContext2D) => {
    drawGradientCircle(ctx, unit / 12, unit / 12, unit / 4, pallete[2], pallete[3]);
    drawGradientCircle(ctx, -unit / 6, -unit / 6, unit / 8, pallete[2], pallete[3]);
    drawGradientCircle(ctx, unit / 6, -unit / 12, unit / 8, pallete[2], pallete[3]);
    drawGradientCircle(ctx, 0, -unit / 6, unit / 6, pallete[2], pallete[3]);
    drawGradientCircle(ctx, -unit / 6, unit / 12, unit / 8, pallete[2], pallete[3]);
    drawGradientCircle(ctx, -unit / 8, -unit / 24, unit / 6, pallete[2], pallete[3]);
});
export const drawUnmouldedUnpainted = drawUnmoulded(unpaintedPallete);
export const drawUnmouldedPainted = drawUnmoulded(paintedPallete);

export const drawStencilling = preRender((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#e70';
    ctx.beginPath();
    ctx.moveTo(-unit / 8, -unit /6);
    ctx.quadraticCurveTo(0, -unit/2, unit/8, -unit/6);
    ctx.quadraticCurveTo(0, -unit/4, -unit/8, -unit/6);
    ctx.fill();
    
    ctx.fillStyle = '#333';
    drawCircle(ctx, -unit /16, -unit /7, unit/48);
    ctx.fill();
    drawCircle(ctx, unit /16, -unit /7, unit/48);
    ctx.fill();
});