import {unit, preRender, drawCircle} from './common';

const animationFrames = [];

export default animationFrames;

animationFrames[0] = preRender((ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = unit / 24;
    ctx.fillStyle = '#999';

    drawCircle(ctx, 0, 0, unit * 3 / 8);
    ctx.stroke();
    ctx.fill();

    ctx.lineWidth = unit / 12;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#666';

    for (let i = 0; i < 4; ++i) {
        ctx.rotate(i * Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(-unit * 3 / 16, -unit * 3 / 16);
        ctx.lineTo(-unit / 24, -unit / 24);
        ctx.stroke();
    }
});

for (let i = 1; i < 4; ++i) {
    animationFrames[i] = preRender((ctx: CanvasRenderingContext2D) => {
        ctx.rotate(i * Math.PI / 8);
        animationFrames[0](ctx);
    });
}