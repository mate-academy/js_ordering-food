import { store } from './store.js';
import { foodChoose } from './actions.js';

const container = document.getElementById('container');
const upMoveButton = document.getElementById('moveUp');
const moveDownButton = document.getElementById('moveDown');

export function render() {
    const { currentFoodIndex, foods } = store.getState();

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    foods.forEach((food, index) => {
        const span = document.createElement('span');
        const li = document.createElement('li');

        span.addEventListener('click', (event) => {
            event.stopPropagation();
            store.dispatch(foodChoose(index))
        });

        if (currentFoodIndex === index) {
            span.setAttribute('class', 'active');
        }

        span.textContent = food;

        li.appendChild(span);
        container.appendChild(li)
    });

    const isCurrentFoodIndex = currentFoodIndex === null;

    upMoveButton.disabled = currentFoodIndex === 0 || isCurrentFoodIndex;
    moveDownButton.disabled = currentFoodIndex === foods.length - 1 || isCurrentFoodIndex;
}
