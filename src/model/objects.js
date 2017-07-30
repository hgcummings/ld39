import {type Direction} from './direction';

export type Sprite = {
    x: number, y: number, direction: Direction, vx: number, vy: number, lastUpdate: number
};

export type Fixture = {
    x: number, y: number, direction: Direction
}