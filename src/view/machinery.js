import {unit} from './graphics/common';
import drawLever from './graphics/lever';
import drawChute from './graphics/chute';
import drawTurntable from './graphics/turntable';
import {drawPipe, drawOutletActive, drawOutletInactive} from './graphics/pipes';
import * as drawConveyor from './graphics/conveyor';
import Conveyor from '../model/fixtures/conveyor';
import Checker from '../model/fixtures/checker';
import {tick} from '../model/game';
import * as drawPress from './graphics/press';
import * as drawPainter from './graphics/painter';
import * as drawPusher from './graphics/pusher';
import * as drawPrinter from './graphics/printer';
import * as drawChecker from './graphics/checker';

export const conveyor = (model: Conveyor, gameTime: number) => {
    const frameDuration = tick / model.speed / drawConveyor.framesPerUnitDistance;
    const frameNumber = Math.floor(gameTime / frameDuration) % drawConveyor.frames.length;
    return {
        foreground: drawConveyor.frames[frameNumber]
    };
}

type Periodic = { period: number, offset: number }

export const turntable = (model: Periodic, gameTime: number) => {
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

export const outlet = (model:Periodic, gameTime:number) => {
    if (distanceToActiveTick(model, gameTime, -2) <= 4) {
        return { foreground: drawOutletActive };
    } else {
        return { foreground: drawOutletInactive };
    }
};

export const press = (model:Periodic, gameTime:number) => {
    const distanceToActive = distanceToActiveTick(model, gameTime, -1);
    if (distanceToActive < drawPress.activeFrames.length) {
        return { foreground: drawPress.activeFrames[distanceToActive] };
    } else {
        return { foreground: drawPress.inactive };
    }
};

export const painter = (model:Periodic, gameTime:number) => {
    const distanceToActive = distanceToActiveTick(model, gameTime, -1);
    if (distanceToActive <= 2) {
        return { foreground: drawPainter.active };
    } else {
        return { foreground: drawPainter.inactive };
    }
};

export const pusher = (model:Periodic, gameTime:number) => {
    const distanceToActive = distanceToActiveTick(model, gameTime, 2);
    if (distanceToActive < drawPusher.activeFrames.length) {
        return { foreground: drawPusher.activeFrames[distanceToActive] };
    } else {
        return { foreground: drawPusher.inactive };
    }
};

export const printer = (model:Periodic, gameTime:number) => {
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
const distanceToActiveTick = (model:Periodic, gameTime:number, animationDelay:number) => {
    const normalisedCurrentTick = ((gameTime * 2 / tick) - animationDelay) % (model.period * 2);
    return Math.round(Math.min(
        Math.abs(normalisedCurrentTick - 2 * (model.offset)),
        Math.abs(normalisedCurrentTick + 2 * (model.period - model.offset))));
};