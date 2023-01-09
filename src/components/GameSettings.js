import { CHARACTER_PARAMS, FREE_CELL, WOLF_CELL } from '../constans/UIConstans.js';
import { setCharacterCounts, positionPlayers } from './character.js';
import { printDuration } from './Duration.js';
import {
    updateDataOfState,
    render,
    stepToTheRight,
    stepToTheLeft,
    stepToTheUP,
    stepToTheDown,
    GAME_STATE
} from './ControlsGame.js';

const root = document.querySelector('#root');
const container = document.createElement('div');
container.id = "container";

let matrix;
let matrixLenght;

function startGame() {
    root.innerHTML = '';
    const div = document.createElement('div');
    div.id = "controls";

    const btn = createButton();
    const select = createSelect();
    div.append(select, btn);
    root.append(div);

    prepareGame(btn, select);
}

function createSelect() {
    const select = document.createElement('select');
    select.id = 'select';

    let i = 5;
    while (i < 10) {
        select.appendChild(Object.assign(
            document.createElement('option'),
            {
                innerHTML: `${i} x ${i}`,
                value: i,
                id: `query`
            }
        ));
        i += 2;
    }

    return select;
}

function createButton() {
    return Object.assign(
        document.createElement('button'),
        {
            innerHTML: 'START',
            id: `start`
        }
    );
}

function prepareGame(btn, select) {
    btn.addEventListener('click', () => {
        printDuration();
        createMatrix(select.value);
        setCharacterCounts();
        createUI();
        createButtons();
        positionPlayers(select.value);
    })
}

function createMatrix(value) {
    matrixLenght = parseInt(value)
    matrix = new Array(matrixLenght)
        .fill(FREE_CELL)
        .map(() => new Array(matrixLenght).fill(FREE_CELL));
}

function createUI() {
    container.innerHTML = "";

    matrix.map((el, i) => {
        const contain = document.createElement('div');
        contain.id = "contain";
        el.map((element, j) => {
            const div = document.createElement('div');
            div.id = `${i}${j}`;
            contain.append(div);
            div.className = "area";
        })
        container.appendChild(contain);
    })
    root.append(container);
}

function createButtons() {
    const div = document.createElement('div');
    div.id = 'btn-controls';

    const template = `
    <div>
        <button type="button" id = "up"> ↑ </button>
    </div>
    <div>
        <button type="button" id = "left"> ← </button>
        <button type="button" id = "right"> → </button>
    </div>
    <div>
        <button type="button" id = "down"> ↓ </button>
    </div>
`;
    div.innerHTML = template;

    container.append(div);
    playGame();
}

function playGame() {
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');
    const up = document.querySelector('#up');
    const down = document.querySelector('#down');

    right.addEventListener('click', () => {
        updateDataOfState();
        render(matrix);
        stepToTheRight();
        getOfWolfPosition(GAME_STATE.positionWolf);
    })

    left.addEventListener('click', () => {
        updateDataOfState();
        render(matrix);
        stepToTheLeft();
        getOfWolfPosition(GAME_STATE.positionWolf);
    })

    up.addEventListener('click', () => {
        updateDataOfState();
        render(matrix);
        stepToTheUP();
        getOfWolfPosition(GAME_STATE.positionWolf);
    })

    down.addEventListener('click', () => {
        updateDataOfState();
        render(matrix);
        stepToTheDown();
        getOfWolfPosition(GAME_STATE.positionWolf);
    })
}

/// Wolf Position

const getOfWolfPosition = (wolfs) => {
    wolfs.forEach(wolf => {
        let wolfPath = findTheShortestPath(wolf);
        getOfCheckBox(wolfPath, wolf);
    });
}

function findTheShortestPath([x, y]) {
    let nearPath, minimumCellPathResult = null;

    const cells = [
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
        [x, y - 1],
    ];

    const [rabbitX, rabbitY] = GAME_STATE.positionRabbit;

    cells.filter(([checkXcell, checkYcell]) => {
        const side1 = Math.abs(rabbitX - checkXcell);
        const side2 = Math.abs(rabbitY - checkYcell);
        const resultOfTeorem = Math.floor(Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2)));

        if (minimumCellPathResult === null || resultOfTeorem < minimumCellPathResult) {
            minimumCellPathResult = resultOfTeorem;
            nearPath = [checkXcell, checkYcell];
        }
    })

    return nearPath;
}

function getOfCheckBox([x, y], wolfPreviousStep) {
    let state = GAME_STATE.data;

    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            if (state[x][y] === 0) {
                updateWolfCordinate([x, y], wolfPreviousStep);
                return
            }
        }
    }
}

function updateWolfCordinate([newWolfX, newWolfY], [wolfPreviousStepX, wolfPreviousStepY]) {
    GAME_STATE.data[wolfPreviousStepX][wolfPreviousStepY] = 0;
    GAME_STATE.data[newWolfX][newWolfY] = 'wolf';

    return moveCurrentCharacter([newWolfX, newWolfY], [wolfPreviousStepX, wolfPreviousStepY])
}

const moveCurrentCharacter = ([newWolfX, newWolfY], [wolfPreviousStepX, wolfPreviousStepY]) => {
    let image = document.createElement('img');
    image.src = CHARACTER_PARAMS[WOLF_CELL].src;

    document.getElementById(`${wolfPreviousStepX}${wolfPreviousStepY}`).innerHTML = '';
    document.getElementById(`${newWolfX}${newWolfY}`).appendChild(image);
}

export { startGame, matrix };