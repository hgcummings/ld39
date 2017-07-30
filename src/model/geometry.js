export type Point = { x: number, y: number };

export const overlap = (a: Point, b: Point) => {
    return Math.abs(a.x - b.x) < 0.5 && Math.abs(a.y - b.y) < 0.5;
}

export const constrain = (p: Point, max: Point) => {
    p.x = Math.max(Math.min(p.x, max.x), 0);
    p.y = Math.max(Math.min(p.y, max.y), 0);
}