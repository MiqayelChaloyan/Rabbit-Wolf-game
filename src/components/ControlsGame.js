import { matrix } from './GameSettings.js';
import { gameStatus } from './GameStatus.js';
import {
    CHARACTER_PARAMS,
    WOLF_CELL,
    HOUSE_CELL, 
    RABBIT_CELL,
    CARROT_CELL
} from '../constans/UIConstans.js';

let positionRabbit;
let positionWolf;
let cordinate;
let GAME_STATE;

const updateDataOfState = () => {
    positionWolf = [];
    matrix.forEach((array, i) => {
        array.forEach((elem, j) => {
            if (array[j] === CHARACTER_PARAMS[RABBIT_CELL].name) {
                positionRabbit = [i, j];
            }
            if (array[j] === CHARACTER_PARAMS[WOLF_CELL].name) {
                positionWolf.push([i, j]);
            }

        })
    })
}

const render = (state) => {
    GAME_STATE = { data: [...state], positionRabbit, positionWolf, cordinate };
    return GAME_STATE;
}

const stepToTheRight = () => {
    const { data: state, positionRabbit: [x, y] } = GAME_STATE;

    if (state[x][y + 1] === 0) {
        state[x][y] = 0;
        state[x][y + 1] = 'rabbit';
        GAME_STATE.cordinate = [x, y + 1];
        update();
        return;
    }

    if (y >= state[x].length - 1) {
        GAME_STATE.cordinate = [x, y];
        return;
    }

    if (state[x][y + 1] === CHARACTER_PARAMS[CARROT_CELL].name) {
        let [wolfPositionX, wolfPositionY] = GAME_STATE.positionWolf.pop();
        GAME_STATE.data[wolfPositionX][wolfPositionY] = 0;
        document.getElementById(`${wolfPositionX}${wolfPositionY}`).innerHTML = '';

        document.getElementById(`${x}${y + 1}`).innerHTML = '';
        state[x][y] = 0;
        state[x][y + 1] = 'rabbit';
        GAME_STATE.cordinate = [x, y + 1];
        update();
        return;
    }

    GAME_STATE.cordinate = [x, y];

    return gameController(state[x][y + 1], [x, y]);
}

const stepToTheLeft = () => {
    const { data: state, positionRabbit: [x, y] } = GAME_STATE;

    if (state[x][y - 1] === 0) {
        state[x][y] = 0;
        state[x][y - 1] = 'rabbit';
        GAME_STATE.cordinate = [x, y - 1];
        update();
        return;
    }

    if (y <= 0) {
        GAME_STATE.cordinate = [x, y];
        return
    }

    if (state[x][y - 1] === CHARACTER_PARAMS[CARROT_CELL].name) {
        let [wolfPositionX, wolfPositionY] = GAME_STATE.positionWolf.pop();
        GAME_STATE.data[wolfPositionX][wolfPositionY] = 0;
        document.getElementById(`${wolfPositionX}${wolfPositionY}`).innerHTML = '';

        document.getElementById(`${x}${y - 1}`).innerHTML = '';
        state[x][y] = 0;
        state[x][y - 1] = 'rabbit';
        GAME_STATE.cordinate = [x, y - 1];
        update();
        return;
    }

    GAME_STATE.cordinate = [x, y];

    return gameController(state[x][y - 1], [x, y]);
}

const stepToTheUP = () => {
    const { data: state, positionRabbit: [x, y] } = GAME_STATE;

    if (x === 0) {
        GAME_STATE.cordinate = [x, y];
        return;
    }

    if (state[x - 1][y] === 0) {
        state[x][y] = 0;
        state[x - 1][y] = 'rabbit';
        GAME_STATE.cordinate = [x - 1, y];
        update();
        return;
    }

    if (state[x - 1][y] === CHARACTER_PARAMS[CARROT_CELL].name) {
        let [wolfPositionX, wolfPositionY] = GAME_STATE.positionWolf.pop();
        GAME_STATE.data[wolfPositionX][wolfPositionY] = 0;
        document.getElementById(`${wolfPositionX}${wolfPositionY}`).innerHTML = '';
        document.getElementById(`${x - 1}${y}`).innerHTML = '';
        state[x][y] = 0;
        state[x - 1][y] = 'rabbit';
        GAME_STATE.cordinate = [x - 1, y];
        update();
        return;
    }

    GAME_STATE.cordinate = [x, y];

    return gameController(state[x - 1][y], [x, y]);
}

const stepToTheDown = () => {
    const { data: state, positionRabbit: [x, y] } = GAME_STATE;

    if (x === state.length - 1) {
        GAME_STATE.cordinate = [x, y];
        return;
    }

    if (state[x + 1][y] === 0) {
        state[x][y] = 0;
        state[x + 1][y] = 'rabbit';
        GAME_STATE.cordinate = [x + 1, y];
        update();
        return;
    }

    if (state[x + 1][y] === CHARACTER_PARAMS[CARROT_CELL].name) {
        let [wolfPositionX, wolfPositionY] = GAME_STATE.positionWolf.pop();
        GAME_STATE.data[wolfPositionX][wolfPositionY] = 0;
        document.getElementById(`${wolfPositionX}${wolfPositionY}`).innerHTML = '';

        document.getElementById(`${x + 1}${y}`).innerHTML = '';
        state[x][y] = 0;
        state[x + 1][y] = 'rabbit';
        GAME_STATE.cordinate = [x + 1, y];
        update();
        return;
    }

    GAME_STATE.cordinate = [x, y];

    return gameController(state[x + 1][y], [x, y]);
}

function update() {
    let [rabbitX, rabbitY] = GAME_STATE.positionRabbit;
    let [newRabbitX, newRabbitY] = GAME_STATE.cordinate;
    let image = document.createElement('img');
    image.src = CHARACTER_PARAMS[RABBIT_CELL].src;
    document.getElementById(`${rabbitX}${rabbitY}`).innerHTML = '';
    document.getElementById(`${newRabbitX}${newRabbitY}`).appendChild(image);
}

/// Game Status Dialog

const gameController = (position, [x, y]) => {
    if (position === CHARACTER_PARAMS[WOLF_CELL].name) {
        GAME_STATE.cordinate = [x, y];
        document.getElementById(`${x}${y}`).innerHTML = '';
        return gameStatus('Game Over');
    }

    if (position === CHARACTER_PARAMS[HOUSE_CELL].name) {
        GAME_STATE.cordinate = [x, y];
        document.getElementById(`${x}${y}`).innerHTML = '';
        return gameStatus('Congratulations');
    }

}

export {
    updateDataOfState,
    render,
    stepToTheRight,
    stepToTheLeft,
    stepToTheUP,
    stepToTheDown,
    GAME_STATE
}