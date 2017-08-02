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
 * Approximate a circle by two AABBs appearing as illustrated    ...##...
 * to the right. Note that we use four boxes rather than two     ..#..#..
 * overlapping boxes in order to allow the closest box to be     ..#..#..
 * checked first, in case the amount of overlap matters.         ...##...
 */
export const circleBodies = (x: number, y: number, r: number) => {
    const bodies = [];
    for (let i = 0; i < 4; ++i) {
        bodies.push({
            x: x + (i % 2 === 0 ? 0 : (i - 2) * 3 / 4 * r),
            y: y + (i % 2 === 1 ? 0 : (i - 1) * -3 / 4 * r),
            height: (1 + (i % 2)) * r / 2,
            width: (1 + ((i + 1) % 2)) * r / 2
        });
    }

    return bodies;
}
