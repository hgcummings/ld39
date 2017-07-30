export type Point = { x: number, y: number };

export const overlap = (a: Point, b: Point) => {
    return Math.abs(a.x - b.x) <= 0.5 && Math.abs(a.y - b.y) <= 0.5;
}

export const constrain = (p: Point, max: Point) => {
    p.x = Math.max(Math.min(p.x, max.x), 0);
    p.y = Math.max(Math.min(p.y, max.y), 0);
}

/*
    Tweening function, assumes that a and b differ by 1
*/
export const tween = (a: number, b: number, delta: number) => {
    if (a < b) {
        return Math.min(a + delta, b);
    } else {
        return Math.max(a - delta, b);
    }
}
