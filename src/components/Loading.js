const root = document.querySelector('#root');
const div = document.createElement('div');

const Loading = () => {
    div.innerHTML = '';
    div.className = 'lds-ellipsis';

    for (let i = 1; i <= 4; i++) {
        let element = document.createElement('div');
        div.append(element);
    }

    root.append(div);
}

export default Loading;