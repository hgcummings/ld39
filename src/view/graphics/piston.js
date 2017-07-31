import {unit, preRender} from './common';

export const inactive = preRender((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(-unit / 3, 0, unit / 3, 0);
    gradient.addColorStop(0, '#666');
    gradient.addColorStop(0.5, '#999');
    gradient.addColorStop(1, '#666');

    ctx.fillStyle = gradient;
    ctx.fillRect(-unit/3, -unit / 2, unit * 2 / 3, unit * 7/8);
});

export const activeFrames = [];

for (let i = 0; i < 4; ++i) {
    activeFrames.push(preRender((ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = '#333';
        ctx.lineCap = 'round';
        ctx.lineWidth = unit / 16;

        const extension = -unit * (6 - i) / 4;
        ctx.moveTo(0, -unit/2);
        ctx.lineTo(0, extension);
        ctx.moveTo(-unit * 3/8, extension);
        ctx.lineTo(unit * 3/8, extension);
        ctx.stroke();

        inactive(ctx);
    }, unit, unit * 3));
}
