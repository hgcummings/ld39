import {unit, preRender} from './common';
import {drawPrinting} from './duck';

export const inactive = preRender((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(-unit / 2, 0, unit / 2, 0);
    gradient.addColorStop(0, '#333');
    gradient.addColorStop(0.3, '#666');
    gradient.addColorStop(0.7, '#666');
    gradient.addColorStop(1, '#333');
    ctx.fillStyle = gradient;

    ctx.fillRect(-unit * 3/8, -unit / 2, unit * 3/4, unit * 5/8);
});

export const activeFrames = [];

for (let i = 0; i < 8; ++i) {
    activeFrames.push(preRender((ctx: CanvasRenderingContext2D) => {
        ctx.save();
        ctx.rotate(Math.PI);
        ctx.translate(0, unit * (1 + Math.pow(1 - i/8, 2)) / 2);

        const gradient = ctx.createRadialGradient(0, -unit / 8, 0, 0, -unit/8, unit/4);
        gradient.addColorStop(0, '#e70');
        gradient.addColorStop(1, '#ded');
        ctx.fillStyle = gradient;

        ctx.fillRect(-unit / 4, -unit / 2, unit /2, unit /2);

        drawPrinting(ctx);

        ctx.beginPath();
        ctx.strokeStyle = '#666';
        ctx.lineWidth = unit / 16;
        const x = i < 4 ? unit * (i/8 - 1/4) : unit / 4;
        ctx.moveTo(x, -unit / 2);
        ctx.lineTo(x, 0);
        ctx.stroke();

        ctx.restore();

        inactive(ctx);
    }, unit, 2 * unit));
}
