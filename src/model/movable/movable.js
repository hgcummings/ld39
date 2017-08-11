import {type Sprite} from '../objects';
import {type Direction, components} from '../direction';
import {type Point, type Body} from '../geometry';

export default class Movable implements Sprite {
    x: number;
    y: number;
    direction: Direction;
    vx: number;
    vy: number;
    lastUpdate: number;
    target: ?Point;
    
    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.vx = 0;
        this.vy = 0;
        this.target = null;
    }

    moveTo(target: Point, speed: number) {
        this.target = target;
        this.vx = Math.sign(target.x - this.x) * speed;
        this.vy = Math.sign(target.y - this.y) * speed;
    }

    update(gameTime: number) {
        this.lastUpdate = gameTime;

        this.x += this.vx;
        this.y += this.vy;

        if (this.target && this.x === this.target.x && this.y === this.target.y) {
            this.target = null;
            this.vx = 0;
            this.vy = 0;
        }
    }

    body(): ?Body {
        return null;
    }
}
