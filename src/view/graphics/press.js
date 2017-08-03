import {unit, preRender} from './common';

export const inactive = preRender((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, -unit / 2, 0, unit/2);
    gradient.addColorStop(0, '#999');
    gradient.addColorStop(1, '#666')
    ctx.fillStyle = gradient;
    ctx.fillRect(-unit / 2, -unit / 2, unit, unit);
});

export const activeFrames = [];

for (let i = 0; i < 4; ++i) {
    activeFrames.push(preRender((ctx: CanvasRenderingContext2D) => {
        const gradient = ctx.createLinearGradient(0, unit * (i/8 - 1), 0, 0);
        gradient.addColorStop(0, '#ccc');
        gradient.addColorStop(1, '#999');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, unit * (i/8 - 1), unit * 7 / 16, 0, Math.PI);
        ctx.fill();

        ctx.fillRect(-unit/32, unit * (i/8 - 9/16), unit / 16, unit / 16);

        inactive(ctx);
    }, unit, 2 * unit));
}
