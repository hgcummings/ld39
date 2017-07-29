// $FlowFixMe
import levelData from './levels.dat';
import Conveyer from './conveyer';
import {type Point} from './geometry';

export const loadLevel = () => {
    const conveyers = [];
    let start:Point;
    const rows = levelData.split('\n');
    for (let j = 0; j < rows.length; ++j) {
        for (let i = 0; i < rows[j].length; ++i) {
            switch (rows[j][i]) {
                case 'x':
                    start = { x:i, y: j };
                    break;
                case '>':
                    conveyers.push(new Conveyer(i, j, 1));
                    break;
                case '<':
                    conveyers.push(new Conveyer(i, j, 3));
                    break;
                default:
                    break;
            }
        }
    }
    
    return {
        start: start,
        conveyers: conveyers,
        width: rows[0].length,
        height: rows.length
    }
}