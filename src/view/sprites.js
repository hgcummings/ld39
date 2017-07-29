import {drawCircle, preRender, unit} from './drawing';
import {type Direction} from '../model/direction';

const frames = {};

frames.player = [];

frames.player[0] = preRender((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#5bc0de';
    drawCircle(ctx, 0, 0, unit / 3);
    ctx.fill();
});

export type Sprite = { x: number, y: number, direction: Direction }

export default frames;