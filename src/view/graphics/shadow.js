import {unit} from './common';

const shadowLimit = unit * 6;
const preRenderSize = unit * 16;
const preRenderedShadow = document.createElement('canvas');
preRenderedShadow.width = preRenderedShadow.height = preRenderSize;
const ctx = preRenderedShadow.getContext('2d');
const shadowGradient = ctx.createRadialGradient(
    preRenderSize / 2, preRenderSize / 2, 0, preRenderSize / 2, preRenderSize / 2, shadowLimit);
shadowGradient.addColorStop(0, 'rgba(6, 6, 6, 0)');
shadowGradient.addColorStop(0.25, 'rgba(6, 6, 6, 0)');
shadowGradient.addColorStop(0.5, 'rgba(6, 6, 6, 0.25)');
shadowGradient.addColorStop(1, 'rgba(6, 6, 6, 1)');
ctx.fillStyle = shadowGradient;
ctx.fillRect(0, 0, preRenderSize, preRenderSize);

export default (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(6, 6, 6)';
    ctx.fillRect(-unit * 512, -unit * 512, unit * 512 - shadowLimit, unit * 1024);
    ctx.fillRect(-unit * 512, -unit * 512, unit * 1024, unit * 512 - shadowLimit);
    ctx.fillRect(shadowLimit, -unit * 512, unit * 512 - shadowLimit, unit * 1024);
    ctx.fillRect(-unit * 512, shadowLimit, unit * 1024, unit * 512 - shadowLimit);
    ctx.drawImage(preRenderedShadow, -preRenderedShadow.width / 2, -preRenderedShadow.height / 2);
};