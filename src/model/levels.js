// $FlowFixMe
import allData from './levels.dat';
import Checker from './fixtures/checker';
import Chute from './fixtures/chute';
import Conveyor from './fixtures/conveyor';
import Lever from './fixtures/lever';
import Mould from './fixtures/mould';
import Pipe from './fixtures/pipe';
import Piston from './fixtures/piston';
import Spray from './fixtures/spray';
import Stenciller from './fixtures/stenciller';
import Supply from './fixtures/supply';
import Turntable from './fixtures/turntable';
import {type Point} from './geometry';
import {type Direction} from './direction';
import {Fixture} from './objects';

const directions = ['^', '>', 'v', '<'];
const directionOf = (character: string) => ((directions.indexOf(character) : any): Direction)


const levels = allData.split('META:').filter(levelData => levelData !== '').map(levelData => {
    const rows = levelData.split('\n');
    const meta = JSON.parse(rows.shift());
    
    const numberedConveyors = [];
    const fixtures = {
        checkers: [],
        chutes: [],
        conveyors: [],
        levers: [],
        moulds: [],
        pipes: [],
        pistons: [],
        sprays: [],
        stencillers: [],
        supplies: [],
        turntables: []
    };
    let start:Fixture;

    for (let j = 0; j < rows.length; ++j) {
        for (let i = 0; i < rows[j].length; ++i) {
            const [a, b] = [rows[j][i*2], rows[j][i*2 +1]];

            if (a === 'x') {
                start = new Fixture(i, j, directionOf(b));
            } else if (a === 'Q') {
                fixtures.checkers.push(new Checker(i, j, directionOf(b)));
            } else if (a === 'X') {
                fixtures.chutes.push(new Chute(i, j, directionOf(b)));
            } else if (a === '#' || !isNaN(parseInt(a, 10))) {
                const conveyor = new Conveyor(i, j, directionOf(b));
                fixtures.conveyors.push(conveyor);
                const index = parseInt(a, 10);
                if (!isNaN(index)) {
                    numberedConveyors[index] = numberedConveyors[index] || [];
                    numberedConveyors[index].push(conveyor);
                }
            } else if (a === '/' || a === '\\') {
                const index = parseInt(b, 10);
                numberedConveyors[index] = numberedConveyors[index] || [];
                fixtures.levers.push(new Lever(i, j, a === '/' ? 1 : 3, numberedConveyors[index]));
            } else if (a === 'M') {
                fixtures.moulds.push(new Mould(i, j, directionOf(b)));
            } else if (a === 'u') {
                fixtures.pipes.push(new Pipe(i, j, 2));
            } else if (a === 'T') {
                fixtures.pistons.push(new Piston(i, j, directionOf(b)));
            } else if (a === 'W') {
                fixtures.sprays.push(new Spray(i, j, directionOf(b)));
            } else if (a === 'w') {
                fixtures.stencillers.push(new Stenciller(i, j, directionOf(b)));
            } else if (a === 'U') {
                fixtures.pipes.push(new Pipe(i, j, 2));
                fixtures.supplies.push(new Supply(i, j + 1, 2));
            } else if (a === '@') {
                fixtures.turntables.push(new Turntable(i, j, b === 'c' ? 1 : 3));
            }
        }
    }
    
    return {
        start: start,
        meta: meta,
        fixtures: fixtures,
        width: rows[0].length / 2,
        height: rows.length
    }
});

export const loadLevel = (id: number) => {
    return levels[id];
}