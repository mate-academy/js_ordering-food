'use strict';

// Reducer

let initialState = {
  selectedItem: null,
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam']
}

function changedOrder(state, action) {
  switch (action.type) {
    case MOVE_TO_UP:
      return {
        ...state,
        items: [...state, action.changeToUp]
      };
    case MOVE_TO_DOWN:
      return {
        ...state,
        items: [...state, action.changeToDown]
      };
    case ITEM_SELECTED:
      return {
        ...state,
        selectedItem: action.index
      }
    default:
      return state;
  }
}

//  ACTION

const MOVE_TO_UP = 'moveToUp';
const MOVE_TO_DOWN = 'moveToDown';
const ITEM_SELECTED = 'itemSelected';

// Component

const store = Redux.createStore(changedOrder, initialState);

function render() {
  const state = store.getState();
  const foodsList = document.getElementById('foods-list');
  foodsList.innerText = '';
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];
    const li = document.createElement('li');
    li.innerText = item;
    foodsList.append(li);
    li.addEventListener('click', () => {
      store.dispatch({
        type: ITEM_SELECTED,
        index: i
      })
    });
  }
  const moveToUp = document.getElementById('btn-up');
  const moveToDown = document.getElementById('btn-down');
  moveToUp.disabled = state.selectedItem === 0 || state.selectedItem === null;
  moveToDown.disabled = state.selectedItem === state.items.length - 1 || state.selectedItem === null;

  moveToUp.addEventListener('click', () => {
    store.dispatch({
      type: MOVE_TO_UP,
      changeToUp: state.selectedItem + 1
    });
  });

  moveToDown.addEventListener('click', () => {
    store.dispatch({
      type: MOVE_TO_DOWN,
      changeToDown: state.selectedItem - 1
    });
  });
}

store.subscribe(() => {
  render();
});

render();

// const arr = [1,2,4,3,5];
// function resorted(array, index) {
//   const tmp = array;
//   tmp[index] = array.splice(index+1, 1, array[index])[0]
//   return tmp;
// }
// console.log(resorted(arr, 4))
