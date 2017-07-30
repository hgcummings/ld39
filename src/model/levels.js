// $FlowFixMe
import levelData from './levels.dat';
import Conveyor from './conveyor';
import Lever from './lever';
import {type Point} from './geometry';
import {type Direction} from './direction';

const directions = ['^', '>', 'v', '<'];
const directionOf = (character: string) => ((directions.indexOf(character) : any): Direction)

export const loadLevel = () => {
    const conveyors = [];
    const levers = [];
    const numberedConveyors = [];
    let start:Sprite;
    const rows = levelData.split('\n');
    for (let j = 0; j < rows.length; ++j) {
        for (let i = 0; i < rows[j].length; ++i) {
            const [a, b] = [rows[j][i*2], rows[j][i*2 +1]];

            if (a === 'x') {
                start = { x:i, y: j, direction: directionOf(b) };
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
            }
        }
    }
    
    return {
        start: start,
        conveyors: conveyors,
        levers: levers,
        width: rows[0].length / 2,
        height: rows.length
    }
}