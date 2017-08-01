// $FlowFixMe
import allData from './levels.dat';
import Checker from './fixtures/checker';
import Chute from './fixtures/chute';
import Conveyor from './fixtures/conveyor';
import Lever from './fixtures/lever';
import Mould, {DummyMould} from './fixtures/mould';
import Pipe from './fixtures/pipe';
import Piston from './fixtures/piston';
import Printer from './fixtures/printer';
import Spray from './fixtures/spray';
import Supply from './fixtures/supply';
import Turntable from './fixtures/turntable';
import {type Point} from './geometry';
import {type Direction, components, invert} from './direction';
import {Fixture} from './objects';

const directions = ['^', '>', 'v', '<'];
const directionOf = (character: string) => ((directions.indexOf(character) : any): Direction)

export default allData.split('META:').filter(levelData => levelData !== '').map(levelData => {
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
        printers: [],
        supplies: [],
        turntables: []
    };
    let start:Fixture;

    for (let j = 0; j < rows.length; ++j) {
        const cells = rows[j].split('|').map(text => text.trim());
        for (let i = 0; i < cells.length; ++i) {
            const [[a, b], c] = cells[i].split(',');

            if (a === 'x') {
                start = new Fixture(i, j, directionOf(b));
            } else if (a === 'C') {
                const direction = directionOf(b);
                const offset = components(direction);
                fixtures.chutes.push(new Chute(i, j, direction));
                fixtures.checkers.push(new Checker(i + offset.x, j + offset.y, invert(direction)));
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
                fixtures.moulds.push(new Mould(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 'm') {
                fixtures.moulds.push(new DummyMould(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 'u') {
                fixtures.pipes.push(new Pipe(i, j, 2));
            } else if (a === 'T') {
                fixtures.pistons.push(new Piston(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 'S') {
                fixtures.sprays.push(new Spray(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 's') {
                fixtures.printers.push(new Printer(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 'U') {
                fixtures.pipes.push(new Pipe(i, j, 2));
                fixtures.supplies.push(new Supply(i, j + 1, 2, parseInt(c, 10)));
            } else if (a === '@') {
                fixtures.turntables.push(new Turntable(i, j, b === 'r' ? 1 : 3, parseInt(c, 10)));
            }
        }
    }
    
    return {
        start: start,
        meta: meta,
        fixtures: fixtures,
        width: rows[0].split('|').length,
        height: rows.length
    }
});
