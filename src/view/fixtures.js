import {unit} from './graphics/common';
import drawLever from './graphics/lever';
import {drawPipe, drawSupply} from './graphics/pipes';
import * as drawConveyor from './graphics/conveyor';
import Conveyor from '../model/fixtures/conveyor';
import {tick} from '../model/game';

export const conveyor = (model: Conveyor, gameTime: number) => {
    const frameDuration = tick / model.speed / drawConveyor.framesPerUnitDistance;
    const frameNumber = Math.floor(gameTime / frameDuration) % drawConveyor.frames.length;
    return {
        foreground: drawConveyor.frames[frameNumber]
    };
}

export const lever = { foreground: drawLever };

export const pipe = { foreground: drawPipe };

export const supply = { foreground: drawSupply };