// Adapted from https://github.com/hgcummings/matt/blob/master/scripts/input.js

let activeKey: ?number;

const keyMap = {
    "87": 0,
    "38": 0,
    "68": 1,
    "39": 1,
    "83": 2,
    "40": 2,
    "65": 3,
    "37": 3
};

const directionFromKey = (keyCode: ?number) => {
    if (keyCode && keyMap.hasOwnProperty(keyCode.toString())) {
        return keyMap[keyCode];
    } else {
        return null;
    }
}

const onKeyDown = (event) => {
    if (directionFromKey(event.keyCode) !== null) {
        activeKey = event.keyCode;
        event.preventDefault();
    }
};

const onKeyUp = (event) => {
    if (event.keyCode === activeKey) {
        activeKey = null;
    }
};

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

export const getDirection = () => directionFromKey(activeKey);
