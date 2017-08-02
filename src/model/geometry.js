export type Point = { x: number, y: number };
export type Body = { x: number, y: number, width: number, height: number }

export const overlap = (a: Point, b: Point) => {
    return Math.abs(a.x - b.x) <= 0.5 && Math.abs(a.y - b.y) <= 0.5;
}

export const constrain = (p: Point, max: Point) => {
    p.x = Math.max(Math.min(p.x, max.x), 0);
    p.y = Math.max(Math.min(p.y, max.y), 0);
}

export const collide = (a: Body, b: Body) => {
    return (Math.abs(a.x - b.x) < (a.width + b.width) / 2) &&
        (Math.abs(a.y - b.y) < (a.height + b.height) / 2);
}

export const distance = (a: Body, b: Body) => {
    return {
        x: Math.abs(a.x - b.x) - (a.width + b.width) / 2,
        y: Math.abs(a.y - b.y) - (a.height + b.height) / 2
    }
}

/**
 * Approximate a circle by two AABBs appearing as illustrated below:
 * 
 * ........
 * ...11...
 * ..2½½2..
 * ..2½½2..
 * ...11...
 * ........
 */
export const circleBodies = (x: number, y: number, r: number) => {
    return [
        { x: x, y: y, width: r, height: r * 2 },
        { x: x, y: y, width: r * 2, height: r }
    ]
}
