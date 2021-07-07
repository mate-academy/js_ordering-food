'use strict';

const food = [
  {name: 'Apple'},
  {name: 'Bread'},
  {name: 'Carrot'},
  {name: 'Dumplings'},
  {name: 'Eggs'},
  {name: 'Fish'},
  {name: 'Garlic'},
  {name: 'Honey'},
  {name: 'Ice cream'},
  {name: 'Jam'}
]


let initialState = {
  items: [...food],
  selectedItem: null
}

function changedOrder(state, action) {
  switch (action.type) {
    case MOVE_TO_UP:
      const foodItemUp = [...state.items];
      const selectedIndexUp = state.selectedItem;
      const changeIndexUp = foodItemUp[selectedIndexUp - 1];
      foodItemUp[selectedIndexUp - 1] = foodItemUp[selectedIndexUp]
      foodItemUp[selectedIndexUp] = changeIndexUp;
      return {
          ...state,
        items: foodItemUp,
        selectedItem: selectedIndexUp - 1
      };
    case MOVE_TO_DOWN:
      const foodItemDown = [...state.items];
      const selectedIndexDown = state.selectedItem;
      const changeIndexDown = foodItemDown[selectedIndexDown + 1];
      foodItemDown[selectedIndexDown + 1] = foodItemDown[selectedIndexDown]
      foodItemDown[selectedIndexDown] = changeIndexDown;
      return {
          ...state,
        items: foodItemDown,
        selectedItem: selectedIndexDown + 1
      }
    case ITEM_SELECTED:
      return {
        ...state,
        selectedItem: action.index
      }
    case CLEAR_SELECTION:
      return {
        ...state,
        selectedItem: null
      }
    default:
      return state;
  }
}

const MOVE_TO_UP = 'moveToUp';
const MOVE_TO_DOWN = 'moveToDown';
const ITEM_SELECTED = 'itemSelected';
const CLEAR_SELECTION = 'clearSelection';
const store = Redux.createStore(changedOrder, initialState);
const moveToUp = document.getElementById('btn-up');
const moveToDown = document.getElementById('btn-down');

moveToUp.addEventListener('click', () => {
  store.dispatch({
    type: MOVE_TO_UP
  });
});

moveToDown.addEventListener('click', () => {
  store.dispatch({
    type: MOVE_TO_DOWN
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('button') && !event.target.closest('li')) {
    store.dispatch({
      type: CLEAR_SELECTION
    })
  }
})

function render() {
  const state = store.getState();
  const foodsList = document.getElementById('foods-list');
  foodsList.innerText = '';
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i].name;
    const li = document.createElement('li');
    li.innerText = item;
    foodsList.append(li);
    li.addEventListener('click', () => {
      store.dispatch({
        type: ITEM_SELECTED,
        index: i,
      })
    });
  }
  moveToUp.disabled = state.selectedItem === 0 || state.selectedItem === null;
  moveToDown.disabled = state.selectedItem === state.items.length - 1 || state.selectedItem === null;
  if (state.selectedItem !== 0 || state.selectedItem !== null) {
    foodsList.childNodes[state.selectedItem].classList.add('focus-elem');
  }
}

store.subscribe(() => {
  render();
});

render();
