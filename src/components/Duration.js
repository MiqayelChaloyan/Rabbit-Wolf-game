import { gameStatus } from './GameStatus.js';

const root = document.querySelector('#root');

const div = document.createElement('div');
div.className = 'printDuration';

const p = document.createElement('p');
p.id = 'para';

const img = document.createElement('img');
img.src = './images/hourglass_lb.gif';


let check = null, cnt;

function printDuration() {
    cnt = 60;
    p.className = '';
    p.innerHTML = `0 : ${cnt}`;
    if (check == null) {
        check = setInterval(function () {
            if (cnt <= 20) {
                p.className = 'runningDuration';
            }

            if (cnt === 0) {
                stop();
                gameStatus('Game Over');
                cnt = 60;
                return
            }

            cnt -= 1;
            p.innerHTML = `0 : ${cnt}`;
        }, 1000);
    }

    div.append(p, img);
    root.append(div);

}

function stop() {
    clearInterval(check);
    check = null;
    p.className = '';
    document.getElementById("para").innerHTML = `0 : 0`;
}

export { printDuration, cnt };