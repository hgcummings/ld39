import {unit} from './graphics/common';
import drawShadow from './graphics/shadow';
import drawLever from './graphics/lever';

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

export const lever = {
    foreground: drawLever
};
