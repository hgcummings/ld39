import * as drawPlayer from './graphics/player';
import drawShadow from './graphics/shadow';
import * as drawDuck from './graphics/duck';

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

export const duck = () => {
    return {
        foreground: drawDuck.foreground
    }
}