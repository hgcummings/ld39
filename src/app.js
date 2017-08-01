import * as game from './game';
import levels from './model/levels';
import menu from './view/menu';

const container = ((document.getElementById('game'): any) : HTMLElement);

menu(container, levels.map(level => level.meta), (levelId: number) => {
    game.init(container, levelId);
});
