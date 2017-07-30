import {unit, preRender} from './common';

export const inActive = preRender((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#666';
    ctx.fillRect(-unit / 2, -unit / 2, unit, unit);
});

export const activeFrames = [];

for (let i = 0; i < 2; ++i) {
    activeFrames.push(preRender((ctx: CanvasRenderingContext2D) => {
        const gradient = ctx.createLinearGradient(0, -unit / 2 + i * unit / 4, 0, 0);
        gradient.addColorStop(0, '#ccc');
        gradient.addColorStop(1, '#999');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, -unit / 2 + i * unit / 4, unit * 7 / 16, 0, Math.PI);
        ctx.fill();

        ctx.fillRect(-unit/32, -unit * 1/16 + i * unit / 4, unit / 16, unit / 16);

        ctx.fillStyle = '#666';
        ctx.fillRect(-unit / 2, 0, unit, unit);
    }, unit, 2 * unit));
}


