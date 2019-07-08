import { createStore } from '../node_modules/redux/es/redux.mjs';
import { reducer } from './redux/reducer.js';
import { selectItem, unselectItem, moveItemUp, moveItemDown } from './redux/action.js';

const root = document.querySelector('#root');
const store = createStore(reducer);

store.subscribe(render);
render();

function render() {
  //console.log(store.getState().selectedItem)
  const itemList = store.getState().itemList;
  const ul = document.createElement('ul');
  itemList.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerText = item;
    li.addEventListener('click', () => store.dispatch(() => selectItem(index)))
    ul.append(li);
  }); 
  root.append(ul);
}