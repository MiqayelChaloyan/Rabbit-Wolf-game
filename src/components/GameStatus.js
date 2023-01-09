import { startGame } from "./GameSettings.js";
import { cnt } from "./Duration.js";

const gameStatus = (status) => {
    const myDiv = document.createElement("div");
    let text;

    if (status === 'Game Over') {
        text = `Don't give up and try again. It will be better.`;
    } else {
        text = `You are successfully completed the game.`;
    }

    const str = `
        <dialog id="modal" class="modal">
            <div class="model-inner">
                <div class="modal-header">
                    <h1 class = "status">${status}</h1>
                    ${status !== 'Game Over' ? `<p class = "score"> Your Score </p> <p class = "status-score"> ${cnt} </p>` : '' }
                    <p class= "status-txt" >${text}</p>
                </div>
                <button id = "modal-close"> 
                    <i class="fa fa-repeat" aria-hidden="true"></i>
                    PLAY AGAIN 
                </button> 
            </div>
        </dialog>
    `;

    myDiv.innerHTML += str;
    root.append(myDiv);
    return openModal();
}

function openModal() {
    const modal = document.querySelector('#modal');
    const close = document.querySelector('#modal-close');
    const container = document.querySelector('#container');
    const controls = document.querySelector('#controls');
    const start = document.querySelector('#start');
    const select = document.querySelector('#select');
    const up = document.querySelector('#up');
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');
    const down = document.querySelector('#down');
    const printDuration = document.querySelector('.printDuration');

    const disable = [start, select, up, left, right, down];
    modal.style.display = 'block';
    container.style.filter = 'blur(6px)';
    controls.style.filter = 'blur(6px)';
    printDuration.style.filter = 'blur(6px)';

    disable.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'wait';
    }); // disable Button during modal processing

    close.addEventListener('click', () => {
        container.style.filter = 'none';
        controls.style.filter = 'none';
        printDuration.style.filter = 'none';
        disable.forEach(btn => btn.disabled = false);
        startGame();
    })
}

export { gameStatus };