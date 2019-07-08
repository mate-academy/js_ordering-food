import { createStore } from '../node_modules/redux/es/redux.mjs';
import { reducer } from './redux/reducer.js';
import { selectItem, unselectItem, moveItemUp, moveItemDown } from './redux/action.js';

const root = document.querySelector('#root');
const unselect = document.querySelector('#unselect');
const up = document.querySelector('#up');
const down = document.querySelector('#down');

unselect.addEventListener('click', () => store.dispatch(unselectItem()));
up.addEventListener('click', () => store.dispatch(moveItemUp()));
down.addEventListener('click', () => store.dispatch(moveItemDown()));


const store = createStore(reducer);

store.subscribe(render);
render();

function render() {
  while(root.firstElementChild) {
    root.firstElementChild.remove();
  }
  const { itemList, selectedItem } = store.getState();

  unselect.disabled = selectedItem === null ? true : false;
  up.disabled = selectedItem ? false : true;
  down.disabled = selectedItem === itemList.length - 1 || selectedItem === null ? true : false;

  const ul = document.createElement('ul');
  itemList.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerText = item;
    li.addEventListener('click', () => store.dispatch(selectItem(index)));
    if (selectedItem === index) {
      li.classList.add('active');
      li.addEventListener('click', () => store.dispatch(unselectItem()));
    }
    ul.append(li);
  }); 
  root.append(ul);
}