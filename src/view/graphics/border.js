import {unit, preRender} from './common';

export default preRender((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, -unit / 2, 0, -unit/3);
    gradient.addColorStop(0, 'rgba(6, 6, 6, 1)');
    gradient.addColorStop(1, 'rgba(6, 6, 6, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(-unit / 2, -unit / 2, unit, unit / 6);
});
