import { store } from './store.js';
import {
    moveUp,
    moveDown,
    chosenFoodRemove,
    foodChoose,
} from './actions.js';

const upMoveButton = document.getElementById('moveUp');
const moveDownButton = document.getElementById('moveDown');
const container = document.getElementById('container');

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

    const isNotSelected = currentFoodIndex === null;

    upMoveButton.disabled = currentFoodIndex === 0 || isNotSelected;
    moveDownButton.disabled = currentFoodIndex === foods.length - 1 || isNotSelected;
}

upMoveButton.addEventListener('click', (event) => {
    event.stopPropagation();
    store.dispatch(moveUp());
});
moveDownButton.addEventListener('click', (event) => {
    event.stopPropagation();
    store.dispatch(moveDown());
});
document.addEventListener('click', () => {
    store.dispatch(chosenFoodRemove());
});

window.addEventListener('load', render);
