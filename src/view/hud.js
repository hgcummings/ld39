export default () => {
    const powerWrapper = document.createElement('div');
    powerWrapper.classList.add('progress');
    const power = document.createElement('div');
    power.classList.add('progress-bar', 'progress-bar-striped', 'active');
    power.style.width = '100%';
    powerWrapper.appendChild(power);
    return {
        element: powerWrapper,
        update: (model: {player: {power: number, active: boolean}}) => {
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
