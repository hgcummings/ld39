// Adapted from https://github.com/hgcummings/runrun-rabbit/blob/master/client/graphics/common.js

export type Draw = (CanvasRenderingContext2D) => void;
export const unit = 48;

export const drawCircle = (context:CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
};

export const preRender = (detail: Draw, width: ?number, height: ?number) => {
    const cell = preRenderCell(detail, width, height);
    return (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(cell, -cell.width / 2, -cell.height / 2);
    };
}

export const preRenderCell = (detail: Draw, width: ?number, height: ?number) => {
    const cell = document.createElement('canvas');
    cell.width = width || unit;
    cell.height = height || unit;
    const ctx = cell.getContext('2d');
    ctx.translate(unit / 2, unit / 2);
    detail(ctx);
    return cell;
}
