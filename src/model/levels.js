// $FlowFixMe
import allData from './levels.dat';
import Checker from './fixtures/checker';
import Chute from './fixtures/chute';
import Conveyor from './fixtures/conveyor';
import Lever from './fixtures/lever';
import Press, {DummyPress} from './fixtures/press';
import Outlet from './fixtures/outlet';
import Pipe from './fixtures/pipe';
import Pusher from './movable/pusher';
import Printer from './movable/printer';
import Painter from './movable/painter';
import Turntable from './fixtures/turntable';
import {type Point} from './geometry';
import {type Direction, components, invert} from './direction';
import {Fixture} from './objects';
import {allOf} from '../util';

const directions = ['^', '>', 'v', '<'];
const directionOf = (character: string) => ((directions.indexOf(character) : any): Direction)

export default allData.split('META:').filter(levelData => levelData !== '').map(levelData => {
    const rows = levelData.split('\n');
    const meta = JSON.parse(rows.shift());
    
    const numberedConveyors = [];
    const conveyors = [];
    const turntables = [];
    const levers = [];
    const presses = [];
    const painters = [];
    const pushers = [];
    const printers = [];
    const checkers = [];
    const chutes = [];
    const pipes = [];
    const outlets = [];

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
                chutes.push(new Chute(i, j, direction));
                checkers.push(new Checker(i + offset.x, j + offset.y, invert(direction)));
            } else if (a === '#' || !isNaN(parseInt(a, 10))) {
                const conveyor = new Conveyor(i, j, directionOf(b));
                conveyors.push(conveyor);
                const index = parseInt(a, 10);
                if (!isNaN(index)) {
                    numberedConveyors[index] = numberedConveyors[index] || [];
                    numberedConveyors[index].push(conveyor);
                }
            } else if (a === '/' || a === '\\') {
                const index = parseInt(b, 10);
                numberedConveyors[index] = numberedConveyors[index] || [];
                levers.push(new Lever(i, j, a === '/' ? 1 : 3, numberedConveyors[index]));
            } else if (a === 'M') {
                presses.push(new Press(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 'm') {
                presses.push(new DummyPress(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 'u') {
                pipes.push(new Pipe(i, j, 2));
            } else if (a === 'T') {
                pushers.push(new Pusher(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 'S') {
                painters.push(new Painter(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 's') {
                printers.push(new Printer(i, j, directionOf(b), parseInt(c, 10)));
            } else if (a === 'U') {
                pipes.push(new Pipe(i, j, 2));
                outlets.push(new Outlet(i, j + 1, 2, parseInt(c, 10)));
            } else if (a === '@') {
                turntables.push(new Turntable(i, j, b === 'r' ? 1 : 3, parseInt(c, 10)));
            }
        }
    }


    return {
        start: start,
        meta: meta,
        machinery: {
            checkers: checkers,
            chutes: chutes,
            conveyors: conveyors,
            levers: levers,
            outlets: outlets,
            painters: painters,
            pipes: pipes,
            presses: presses,
            printers: printers,
            pushers: pushers,
            turntables: turntables,
            fixed: [].concat(chutes, presses, checkers),
            movable: () => allOf(painters, pushers, printers)
        },
        width: rows[0].split('|').length,
        height: rows.length
    }
});
