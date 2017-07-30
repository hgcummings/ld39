import {unit, drawCircle, preRender} from './common';

export const background = preRender((ctx: CanvasRenderingContext2D) => {
    const bodyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, unit /3);
    bodyGradient.addColorStop(0, '#eee');
    bodyGradient.addColorStop(0.25, '#eee');
    bodyGradient.addColorStop(0.5, '#ddd');
    bodyGradient.addColorStop(0.75, '#ccc');
    bodyGradient.addColorStop(1, '#bbb');
    ctx.fillStyle = bodyGradient;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = unit / 24;
    drawCircle(ctx, 0, 0, unit / 3);
    ctx.stroke();
    ctx.fill();
});

const drawVisor = (colour) => 
    preRender((ctx: CanvasRenderingContext2D) => {
        const visorGradient = ctx.createRadialGradient(0, -unit / 6, 0, 0, -unit / 6, unit / 3);
        visorGradient.addColorStop(0, colour);
        visorGradient.addColorStop(0.25, colour);
        visorGradient.addColorStop(1, '#000');
        ctx.beginPath();
        ctx.lineWidth = unit / 12;
        ctx.lineCap = 'round';
        ctx.strokeStyle = visorGradient;
        ctx.arc(0, 0, unit * 1/4, -Math.PI * 5/6, -Math.PI *  1/6, false);
        ctx.stroke();
    });

export const foreground = drawVisor('#4aaddc');
export const foregroundLowPower = drawVisor('#800');
