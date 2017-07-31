export type Direction = 0 | 1 | 2 | 3;

export const components = (direction: Direction) => {
    const ret = { x: 0, y: 0 };

    switch (direction) {
        case 0:
            ret.y = -1;
            break;
        case 1:
            ret.x = 1;
            break;
        case 2:
            ret.y = 1;
            break;
        case 3:
            ret.x = -1;
            break;
    }
    return ret;
};

export const invert = (direction: Direction) => {
    return ((((direction + 2) % 4) : any): Direction);
}

export const increment = (direction: Direction) => {
    return ((((direction + 1) % 4) : any): Direction);
}

export const combine = (a: Direction, b: Direction) => {
    return ((((a + b) % 4): any) : Direction);
}

export const relative = (source: Direction, target: Direction) => {
    return ((((2 + source - target) % 4): any): Direction);
}

export const random = () => {
    return ((Math.floor(Math.random() * 4): any): Direction);
}