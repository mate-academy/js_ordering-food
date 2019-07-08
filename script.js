import { createStore } from '../node_modules/redux/es/redux.mjs';
import { reducer } from './redux/reducer.js';
import { selectItem, unselectItem, moveItemUp, moveItemDown } from './redux/action.js';

const root = document.querySelector('#root');
const store = createStore(reducer);

store.subscribe(render);
render();

function render() {
  console.log('render')
}