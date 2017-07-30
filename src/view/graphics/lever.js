import {unit, preRender} from './common';

export default preRender((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, -unit/2, 0, unit / 2);
    gradient.addColorStop(0, '#a93');
    gradient.addColorStop(11/24, '#762');
    gradient.addColorStop(12/24, '#541');
    gradient.addColorStop(13/24, '#652');
    gradient.addColorStop(1, '#652');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(-unit * 16/48, -unit * 19/48);
    ctx.lineTo(unit * 16/48, -unit * 19/48);
    ctx.lineTo(unit * 5/16, 0);
    ctx.lineTo(unit * 5/16, unit * 3/8);
    ctx.lineTo(-unit * 5/16, unit * 3/8);
    ctx.lineTo(-unit * 5/16, 0);
    ctx.closePath();
    ctx.fill();
});