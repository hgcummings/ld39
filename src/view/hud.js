import {duck as drawDuck} from './sprites';
import Duck from '../model/duck';
import {unit} from './graphics/common';

const completedDuck = new Duck({conveyors: [], chutes: []}, 0, 0, 0);
completedDuck.state.moulded = true;
completedDuck.state.printed = [true, false, false, false];
completedDuck.state.sprayed = [true, true, true, true];

export default () => {
    const wrapper = document.createElement('div');
    
    const powerWrapper = document.createElement('div');
    powerWrapper.classList.add('progress');
    const power = document.createElement('div');
    power.classList.add('progress-bar', 'progress-bar-striped', 'active');
    power.style.width = '100%';
    powerWrapper.appendChild(power);
    wrapper.appendChild(powerWrapper);

    const scoreWrapper = document.createElement('h4');
    const scoreIcon = document.createElement('canvas');
    scoreIcon.style.verticalAlign = 'middle';
    scoreIcon.width = unit;
    scoreIcon.height = unit * 3/4;
    const context = scoreIcon.getContext('2d');
    context.save();
    context.translate(unit / 2, unit * 3 / 8);
    context.rotate(Math.PI * 3/2);
    drawDuck(completedDuck).foreground(context);
    context.restore();

    const scoreText = document.createElement('span');
    scoreWrapper.appendChild(scoreIcon);
    scoreWrapper.appendChild(scoreText);

    wrapper.appendChild(scoreWrapper);

    return {
        element: wrapper,
        update: (model: {score:number, player: {power: number, active: boolean}}) => {
            power.style.width = model.player.power + '%';
            scoreText.innerText = `x ${model.score}`;
            if (model.player.power < 20) {
                power.classList.add('progress-bar-danger');
                power.classList.remove('progress-bar-warning');
            } else {
                if (model.player.active) {
                    power.classList.add('progress-bar-warning');
                    power.classList.remove('progress-bar-danger');
                } else {
                    power.classList.remove('progress-bar-danger');
                    power.classList.remove('progress-bar-warning');
                }
            }
        }
    }
}
