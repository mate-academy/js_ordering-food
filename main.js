import { render } from './render.js';
import { store } from './store.js';
import {
    upMove,
    downMove,
    chosenFoodRemove,
} from './actions.js';

const upMoveButton = document.getElementById('moveUp');
const moveDownButton = document.getElementById('moveDown');

upMoveButton.addEventListener('click', (event) => {
    event.stopPropagation();
    store.dispatch(upMove());
});
moveDownButton.addEventListener('click', (event) => {
    event.stopPropagation();
    store.dispatch(downMove());
});
document.addEventListener('click', () => {
    store.dispatch(chosenFoodRemove());
});
window.addEventListener('load', render);
