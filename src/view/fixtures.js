import {unit} from './graphics/common';
import drawLever from './graphics/lever';
import drawChute from './graphics/chute';
import drawTurntable from './graphics/turntable';
import {drawPipe, drawSupplyActive, drawSupplyInactive} from './graphics/pipes';
import * as drawConveyor from './graphics/conveyor';
import Conveyor from '../model/fixtures/conveyor';
import Checker from '../model/fixtures/checker';
import {tick} from '../model/game';
import ActiveFixture from '../model/fixtures/activeFixture';
import * as drawMould from './graphics/mould';
import * as drawSpray from './graphics/spray';
import * as drawPiston from './graphics/piston';
import * as drawPrinter from './graphics/printer';
import * as drawChecker from './graphics/checker';

export const conveyor = (model: Conveyor, gameTime: number) => {
    const frameDuration = tick / model.speed / drawConveyor.framesPerUnitDistance;
    const frameNumber = Math.floor(gameTime / frameDuration) % drawConveyor.frames.length;
    return {
        foreground: drawConveyor.frames[frameNumber]
    };
}

export const turntable = (model: ActiveFixture, gameTime: number) => {
    const relativeTick = Math.round((gameTime * 2 / tick) - (model.offset * 2)) % (model.period * 2);
    switch (relativeTick) {
        case ((model.period * 2) - 1):
            return { background: drawTurntable[1] }
        case 0:
            return { background: drawTurntable[2] }
        case 1:
            return { background: drawTurntable[3] }
        default:
            return { background: drawTurntable[0] }
    }
}

export const lever = { foreground: drawLever };

export const pipe = { foreground: drawPipe };

export const chute = { foreground: drawChute };

export const supply = (model:ActiveFixture, gameTime:number) => {
    if (distanceToActiveTick(model, gameTime, -2) <= 4) {
        return { foreground: drawSupplyActive };
    } else {
        return { foreground: drawSupplyInactive };
    }
};

export const mould = (model:ActiveFixture, gameTime:number) => {
    const distanceToActive = distanceToActiveTick(model, gameTime, -1);
    if (distanceToActive < drawMould.activeFrames.length) {
        return { foreground: drawMould.activeFrames[distanceToActive] };
    } else {
        return { foreground: drawMould.inactive };
    }
};

export const spray = (model:ActiveFixture, gameTime:number) => {
    const distanceToActive = distanceToActiveTick(model, gameTime, -1);
    if (distanceToActive <= 2) {
        return { foreground: drawSpray.active };
    } else {
        return { foreground: drawSpray.inactive };
    }
};

export const piston = (model:ActiveFixture, gameTime:number) => {
    const distanceToActive = distanceToActiveTick(model, gameTime, 2);
    if (distanceToActive < drawPiston.activeFrames.length) {
        return { foreground: drawPiston.activeFrames[distanceToActive] };
    } else {
        return { foreground: drawPiston.inactive };
    }
};

export const printer = (model:ActiveFixture, gameTime:number) => {
    const distanceToActive = distanceToActiveTick(model, gameTime, -1);
    if (distanceToActive < drawPrinter.activeFrames.length) {
        return { foreground: drawPrinter.activeFrames[distanceToActive] };
    } else {
        return { foreground: drawPrinter.inactive };
    }
};

export const checker = (model: Checker) => {
    if (model.lastResult === true) {
        return { background: drawChecker.success };
    } else if (model.lastResult === false) {
        return { background: drawChecker.failure };
    } else {
        return { background: drawChecker.resting };
    }
}

/*
 * Distance to active tick, in half ticks (to allow for a decent framerate)
 */
const distanceToActiveTick = (model:ActiveFixture, gameTime:number, animationDelay:number) => {
    const normalisedCurrentTick = ((gameTime * 2 / tick) - animationDelay) % (model.period * 2);
    return Math.round(Math.min(
        Math.abs(normalisedCurrentTick - 2 * (model.offset)),
        Math.abs(normalisedCurrentTick + 2 * (model.period - model.offset))));
};