import {drawCircle, preRender, unit} from './drawing';
import {type Direction} from '../model/direction';

export type Sprite = { x: number, y: number, direction: Direction }

const playerBackground = preRender((ctx: CanvasRenderingContext2D) => {
    const bodyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, unit /3);
    bodyGradient.addColorStop(0, '#eee');
    bodyGradient.addColorStop(0.25, '#eee');
    bodyGradient.addColorStop(0.5, '#ddd');
    bodyGradient.addColorStop(0.75, '#ccc');
    bodyGradient.addColorStop(1, '#bbb');
    ctx.fillStyle = bodyGradient;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = unit / 24;
    drawCircle(ctx, 0, 0, unit / 3);
    ctx.stroke();
    ctx.fill();
});

const drawVisor = (colour) => 
    preRender((ctx: CanvasRenderingContext2D) => {
        const visorGradient = ctx.createRadialGradient(0, -unit / 6, 0, 0, -unit / 6, unit / 3);
        visorGradient.addColorStop(0, colour);
        visorGradient.addColorStop(0.25, colour);
        visorGradient.addColorStop(1, '#000');
        ctx.beginPath();
        ctx.lineWidth = unit / 12;
        ctx.lineCap = 'round';
        ctx.strokeStyle = visorGradient;
        ctx.arc(0, 0, unit * 1/4, -Math.PI * 5/6, -Math.PI *  1/6, false);
        ctx.stroke();
    });

const playerForeground = drawVisor('#4aaddc');
const playerForegroundLowPower = drawVisor('#800');

export const player = (model, gameTime) => {
    return {
        background: playerBackground,
        foreground: model.power < 20 ? playerForegroundLowPower : playerForeground
    }
};

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

const conveyorFrames = [];

for (let i = 0; i < 8; ++i) {
    conveyorFrames.push(
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

export const conveyor = (model, gameTime) => {
    const frameDuration = (1 / model.speed) / 16;
    const frameNumber = Math.floor(gameTime / frameDuration) % conveyorFrames.length;
    return {
        foreground: conveyorFrames[frameNumber]
    };
}
