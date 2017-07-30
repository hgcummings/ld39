// $FlowFixMe
import levelData from './levels.dat';
import Conveyor from './conveyor';
import {type Point} from './geometry';
import {type Direction} from './direction';

const directions = ['^', '>', 'v', '<'];
const directionOf = (character: string) => ((directions.indexOf(character) : any): Direction)

export const loadLevel = () => {
    const conveyors = [];
    let start:Point;
    const rows = levelData.split('\n');
    for (let j = 0; j < rows.length; ++j) {
        for (let i = 0; i < rows[j].length; ++i) {
            const [a, b] = [rows[j][i*2], rows[j][i*2 +1]];

            if (a === 'x') {
                start = { x:i, y: j, direction: directionOf(b) };
            } else if (!isNaN(parseInt(a, 10))) {
                conveyors.push(new Conveyor(i, j, directionOf(b)));
            }
        }
    }
    
    return {
        start: start,
        conveyors: conveyors,
        width: rows[0].length / 2,
        height: rows.length
    }
}