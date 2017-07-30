import * as drawPlayer from './graphics/player';
import * as drawConveyor from './graphics/conveyor';
import * as drawDuck from './graphics/duck'
import Conveyor from '../model/conveyor';

export const player = (model: { power: number }) => {
    return {
        background: drawPlayer.background,
        foreground: model.power < 20 ? drawPlayer.foregroundLowPower : drawPlayer.foreground
    }
};

export const conveyor = (model: Conveyor, gameTime: number) => {
    const frameDuration = (1 / model.speed) / drawConveyor.framesPerUnitDistance;
    const frameNumber = Math.floor(gameTime / frameDuration) % drawConveyor.frames.length;
    return {
        foreground: drawConveyor.frames[frameNumber]
    };
}

export const duck = () => {
    return {
        foreground: drawDuck.foreground
    }
}