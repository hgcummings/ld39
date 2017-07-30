import {unit, preRender} from './common';

const arrow = document.createElement('canvas');
arrow.width = unit * 3/4;
arrow.height = unit * 3/8;
const ctx = arrow.getContext('2d');
ctx.fillStyle = '#999';
ctx.beginPath();
ctx.moveTo(0, unit / 8);
ctx.lineTo(unit * 3/8, 0);
ctx.lineTo(unit * 3/4, unit * 1/8);
ctx.lineTo(unit * 3/4, unit * 3/8);
ctx.lineTo(unit * 3/8, unit * 1/4);
ctx.lineTo(0, unit * 3/8);
ctx.lineTo(0, unit / 8);
ctx.fill();

export const frames = [];
export const framesPerUnitDistance = 16;

for (let i = 0; i < 8; ++i) {
    frames.push(
        preRender((ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = '#333';
            ctx.fillRect(-unit /2, -unit/2, unit, unit);
            ctx.fillStyle = '#666';
            ctx.fillRect(-unit * 3/8, -unit/2, unit * 3/4, unit);

            for (let j = 0; j < 3; j++) {
                ctx.save();
                ctx.translate(0, unit * (j/2 - i/16 - 1/2));
                const gradient = ctx.createLinearGradient(0, 0, 0, unit / 2);
                gradient.addColorStop(0, '#980');
                gradient.addColorStop(0.5, '#ba0');
                gradient.addColorStop(1, '#980');
                ctx.fillStyle = gradient;
                ctx.fillRect(-unit * 11/24, 0, unit * 1/24, unit/2);
                ctx.fillRect(unit * 10/24, 0, unit * 1/24, unit/2);
                ctx.restore();
            }
            
            for (let j = 0; j < 4; ++j) {
                ctx.drawImage(arrow, -unit * 3/8, unit * (-3/4 + (j / 2) - (i / 16)));
            }
        })
    );
}
