import * as drawPlayer from './graphics/player';
import drawShadow from './graphics/shadow';
import * as drawDuck from './graphics/duck';
import Duck from '../model/duck';
import {type Draw, unit} from './graphics/common';

export const player = (model: { power: number }) => {
    return {
        background: drawPlayer.background,
        foreground: model.power < 20 ? drawPlayer.foregroundLowPower : drawPlayer.foreground
    }
};

export const shadow = (model: { power: number }) => {
    let scale = 1;
    if (model.power < 20) {
        scale = Math.max(1 - Math.pow(1 - model.power / 20, 3), 1 / 16);
    }

    return {
        background: drawShadow,
        scale: scale
    }
}

const isComplete = (painted: Array<boolean>) => {
    return (painted[0] && painted[2] || painted[1] && painted[3]);
}

const drawCell = (cell:HTMLCanvasElement) => 
    (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(cell, -unit / 2, -unit / 2);
    };

export const duck = (model: Duck) => {
    let {drawUnpainted, drawPainted} = drawDuck;
    if (!model.state.moulded) {
        [drawPainted, drawUnpainted] = [drawDuck.drawUnmouldedPainted, drawDuck.drawUnmouldedUnpainted];
    }
    let body;

    if (isComplete(model.state.sprayed)) {
        body = drawCell(drawPainted);
    } else if (!model.state.sprayed.some(val => val)) {
        body = drawCell(drawUnpainted);
    } else {
        body = (ctx: CanvasRenderingContext2D) => {
            drawCell(drawUnpainted)(ctx);
            for (let d = 0; d < 4; ++d) {
                if (model.state.sprayed[d]) {
                    const x = d === 1 ? 0 : -unit / 2;
                    const y = d === 2 ? 0 : -unit / 2;
                    const w = d % 2 === 0 ? unit : unit / 2;
                    const h = d % 2 === 0 ? unit / 2 : unit;

                    ctx.drawImage(drawPainted, x + unit / 2, y + unit / 2, w, h, x, y, w, h);
                }
            }
        }
    }

    return {
        foreground: (ctx:CanvasRenderingContext2D) => {
            body(ctx);
            for (let d = 0; d < 4; ++d) {
                if (model.state.printed[d]) {
                    ctx.save();
                    ctx.rotate(d * Math.PI / 2);
                    drawDuck.drawPrinting(ctx);
                    ctx.restore();
                }
            }
        }
    }
}