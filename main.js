import reducer from './reducer';
import { Redux } from './redux.min';
import {
  MOVE_UP,
  MOVE_DOWN,
  SELECTED_ITEM,
  UNSELECTED_ITEM,
} from './actions';

const store = Redux.createStore(reducer);

export function moveUp() {
  store.dispatch(MOVE_UP());
}

export function moveDown() {
  store.dispatch(MOVE_DOWN());
}

export function selectItem(index) {
  store.dispatch(SELECTED_ITEM(index));
}

export function unSelectItem() {
  store.dispatch(UNSELECTED_ITEM());
}

function render() {
  const state = store.getState();
  const container = document.querySelector('.container');

  container.innerHTML = `
    <ul class="list">
      ${state.fruits.map((item, index) => `
        <li
          onclick="selectItem(${index})"
          class="list__item ${state.selectedItem === index ? 'active' : ''}"
        >
            ${item}
        </li>`).join('')}
    </ul>
      <div class="buttons">
        <button ${state.selectedItem === null
      || state.selectedItem === 0 ? 'disabled' : ''}
          onclick="moveUp()"
          class="ui labeled icon button"
        >
          <i class="angle double up icon">
          </i>
            UP
        </button>
        <button
          ${state.selectedItem === null
      || state.selectedItem === state.fruits.length - 1 ? 'disabled' : ''}
          onclick="moveDown()"
          class="ui right labeled icon button">
          <i class="angle double down icon"></i>
            DOWN
          </button>
      </div>`;
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.buttons')
    && !event.target.closest('li')
    && !event.target.closest('button')) {
    unSelectItem();
  }
});

render();
store.subscribe(render);
