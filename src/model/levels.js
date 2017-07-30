// $FlowFixMe
import levelData from './levels.dat';
import Conveyor from './conveyor';
import {type Point} from './geometry';

export const loadLevel = () => {
    const conveyors = [];
    let start:Point;
    const rows = levelData.split('\n');
    for (let j = 0; j < rows.length; ++j) {
        for (let i = 0; i < rows[j].length; ++i) {
            switch (rows[j][i]) {
                case 'x':
                    start = { x:i, y: j };
                    break;
                case '^':
                    conveyors.push(new Conveyor(i, j, 0));
                    break;
                case '>':
                    conveyors.push(new Conveyor(i, j, 1));
                    break;
                case 'v':
                    conveyors.push(new Conveyor(i, j, 2));
                    break;
                case '<':
                    conveyors.push(new Conveyor(i, j, 3));
                    break;
                default:
                    break;
            }
        }
    }
    
    return {
        start: start,
        conveyors: conveyors,
        width: rows[0].length,
        height: rows.length
    }
}