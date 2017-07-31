import {unit, preRender} from './common';

const drawHousing = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(-unit / 3, 0, unit / 3, 0);
    gradient.addColorStop(0, '#666');
    gradient.addColorStop(0.5, '#999');
    gradient.addColorStop(1, '#666');

    ctx.fillStyle = gradient;
    ctx.fillRect(-unit/3, -unit * 3/8, unit * 2 / 3, unit * 7/8);
};

const drawHead = (ctx: CanvasRenderingContext2D, extension:number) => {
    const gradient = ctx.createLinearGradient(-unit / 3, 0, unit / 3, 0);
    gradient.addColorStop(0, '#999');
    gradient.addColorStop(0.5, '#ccc');
    gradient.addColorStop(1, '#999');

    ctx.fillStyle = gradient;
    ctx.fillRect(-unit/3, extension, unit * 2 / 3, unit / 8);

    if (extension < -unit/2) {
        ctx.fillRect(-unit / 16, extension, unit / 8, -unit * 3/8 - extension);
    }
}

export const inactive = preRender((ctx: CanvasRenderingContext2D) => {
    drawHousing(ctx);
    drawHead(ctx, -unit / 2);
});

export const activeFrames = [];

for (let i = 0; i < 4; ++i) {
    activeFrames.push(preRender((ctx: CanvasRenderingContext2D) => {
        drawHousing(ctx);
        drawHead(ctx, -unit * (6 - i) / 4);
    }, unit, unit * 3));
}
