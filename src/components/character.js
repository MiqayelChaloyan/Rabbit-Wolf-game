import { matrix } from './GameSettings.js';
import {
    CHARACTER_PARAMS,
    FREE_CELL, WOLF_CELL,
    HOUSE_CELL, RABBIT_CELL,
    FENCE_CELL, CARROT_CELL,
    gameSettings
} from '../constans/UIConstans.js';


/// Count Wolf and Ban, Carrot

function setCharacterCounts() {
    gameSettings.WOLFCOUNT = (matrix.length * 60) / 100;
    gameSettings.BANCOUNT = (matrix.length * 50) / 100;
    gameSettings.CARROTCOUNT = (matrix.length * 60) / 100;
}

/// Create Random images

const getRandomCoord = (count) => {
    return Math.floor(Math.random() * count);
}

function getRandomFreeCoords(board) {
    const x = getRandomCoord(matrix.length);
    const y = getRandomCoord(matrix.length);
    if (board[x][y] === FREE_CELL) {
        return [x, y];
    }
    return getRandomFreeCoords(matrix);
}

function positionPlayers() {
    positionCharacter(HOUSE_CELL, 1);
    positionCharacter(RABBIT_CELL, 1);
    positionCharacter(WOLF_CELL, gameSettings.WOLFCOUNT);
    positionCharacter(FENCE_CELL, gameSettings.BANCOUNT);
    positionCharacter(CARROT_CELL, gameSettings.CARROTCOUNT);
}

function positionCharacter(character, count) {
    for (let i = 0; i < count; i++) {
        positionSingleCharacter(character);
    }
}

const positionSingleCharacter = (character) => {
    const [x, y] = getRandomFreeCoords(matrix);
    matrix[x][y] = CHARACTER_PARAMS[character].name;

    let image = document.createElement('img');
    image.src = CHARACTER_PARAMS[character].src;

    if (CHARACTER_PARAMS[character].name === 'carrot') {
        image.className = "carrot";
    }

    document.getElementById(`${x}${y}`).appendChild(image);
}

export { setCharacterCounts, positionPlayers };