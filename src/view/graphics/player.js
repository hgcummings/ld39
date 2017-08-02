import {unit, drawCircle, preRender} from './common';
import {radius} from '../../model/player';

export const background = preRender((ctx: CanvasRenderingContext2D) => {
    const bodyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, unit * 3 / 8);
    bodyGradient.addColorStop(0, '#eee');
    bodyGradient.addColorStop(0.5, '#ddd');
    bodyGradient.addColorStop(1, '#bbb');
    ctx.fillStyle = bodyGradient;
    drawCircle(ctx, 0, 0, unit * radius);
    ctx.fill();
});

const drawVisor = (colour) => 
    preRender((ctx: CanvasRenderingContext2D) => {
        const visorGradient = ctx.createRadialGradient(
            0, -unit * radius * 4/9, 0, 0, -unit * radius * 4/9, unit * radius * 8 / 9);
        visorGradient.addColorStop(0, colour);
        visorGradient.addColorStop(0.25, colour);
        visorGradient.addColorStop(1, '#000');
        ctx.beginPath();
        ctx.lineWidth = unit / 12;
        ctx.lineCap = 'round';
        ctx.strokeStyle = visorGradient;
        ctx.arc(0, 0, unit * radius * 2/3, -Math.PI * 5/6, -Math.PI *  1/6, false);
        ctx.stroke();
    });

export const foreground = drawVisor('#4aaddc');
export const foregroundLowPower = drawVisor('#800');
