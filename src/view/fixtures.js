import {unit} from './graphics/common';
import drawLever from './graphics/lever';
import {drawPipe, drawSupplyActive, drawSupplyInactive} from './graphics/pipes';
import * as drawConveyor from './graphics/conveyor';
import Conveyor from '../model/fixtures/conveyor';
import {tick} from '../model/game';
import ActiveFixture from '../model/fixtures/activeFixture';
import * as drawMould from './graphics/mould';

export const conveyor = (model: Conveyor, gameTime: number) => {
    const frameDuration = tick / model.speed / drawConveyor.framesPerUnitDistance;
    const frameNumber = Math.floor(gameTime / frameDuration) % drawConveyor.frames.length;
    return {
        foreground: drawConveyor.frames[frameNumber]
    };
}

export const lever = { foreground: drawLever };

export const pipe = { foreground: drawPipe };

export const supply = (model:ActiveFixture, gameTime:number) => {
    if (distanceToActiveTick(model, gameTime) <= 2) {
        return { foreground: drawSupplyActive };
    } else {
        return { foreground: drawSupplyInactive };
    }
};

export const mould = (model:ActiveFixture, gameTime:number) => {
    const distanceToActive = distanceToActiveTick(model, gameTime)
    if (distanceToActive < drawMould.activeFrames.length) {
        return { foreground: drawMould.activeFrames[distanceToActive] };
    } else {
        return { foreground: drawMould.inActive };
    }
};

const distanceToActiveTick = (model:ActiveFixture, gameTime:number) => {
    const normalisedCurrentTick = (gameTime / tick) % model.period;
    return Math.round(Math.min(
        Math.abs(normalisedCurrentTick - model.offset + 1),
        Math.abs(normalisedCurrentTick + model.period - model.offset + 1)));
};