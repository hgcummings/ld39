// Adapted from https://github.com/hgcummings/runrun-rabbit/blob/master/client/graphics/common.js

export type Draw = (CanvasRenderingContext2D) => void;
export const unit = 48;

export const drawCircle = (context:CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
};

export const preRender = (detail: Draw) => {
    const cell = preRenderCell(detail);
    return (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(cell, -unit / 2, -unit / 2);
    };
}

export const preRenderCell = (detail: Draw) => {
    const cell = document.createElement('canvas');
    cell.width = unit;
    cell.height = unit;
    const ctx = cell.getContext('2d');
    ctx.translate(unit / 2, unit / 2);
    detail(ctx);
    return cell;
}
