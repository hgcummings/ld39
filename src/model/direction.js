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
