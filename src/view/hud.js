import {duck as drawDuck} from './sprites';
import Duck from '../model/movable/duck';
import {unit} from './graphics/common';

const completedDuck = new Duck(0, 0, 0);
completedDuck.state.pressed = true;
completedDuck.state.painted = [true, true, true, true];
completedDuck.state.printed = [true, false, false, false];

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
    drawDuck(completedDuck, 0).foreground(context);
    context.restore();

    const scoreText = document.createElement('span');
    scoreWrapper.appendChild(scoreIcon);
    scoreWrapper.appendChild(scoreText);

    wrapper.appendChild(scoreWrapper);

    return {
        element: wrapper,
        update: (model: {over: boolean; score:number, player: {power: number, active: boolean}}) => {
            scoreText.innerText = `x ${model.score}`;

            if (model.over) {
                wrapper.removeChild(powerWrapper);
                const message = document.createElement('h3');
                message.innerText = 'You ran out of power!'

                const scoreHeader = document.createElement('h4');
                scoreHeader.innerText = 'But you built this many ducks:'
                wrapper.removeChild(scoreWrapper);
                wrapper.appendChild(message);
                wrapper.appendChild(scoreHeader);
                wrapper.appendChild(scoreWrapper);

                const restart = document.createElement('a');
                restart.href = '#';
                restart.innerText = 'Click to play again';
                restart.onclick = (e:Event) => { event.preventDefault(); window.location.reload(); }
                wrapper.appendChild(restart);
                return;
            }

            power.style.width = model.player.power + '%';
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
