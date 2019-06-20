'use strict';

const initialState = {
  orderFoods: [
    'Apple',
    'Bread',
    'Carrot',
    'Dumplings',
    'Eggs',
    'Fish',
    'Garlic',
    'Honey',
    'Ice cream',
    'Jam'
  ],
  selectedIndex: null
}

const SELECTED = 'SELECTED';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
function selected(index) {
  return {
    type: SELECTED,
    index
  };
};
function moveUp(foods, index) {
  return {
    type: MOVE_UP,
    foods,
    index
  };
}
function moveDown(foods, index) {
  return {
    type: MOVE_DOWN,
    foods,
    index
  };
}

const orderingFood = document.getElementById('ordering-food');
const list = document.getElementById('list');

const showList = function (list, items) {
  items.map(item => list.insertAdjacentHTML('beforeend', `
    <li>${item}</li>
  `));
}
const addButtons = function () {
  orderingFood.insertAdjacentHTML('beforeend', `
    <button id="btn-up" disabled data-move="up">Up</button>
    <button id="btn-down" disabled data-move="down">Down</button>
  `);
}

document.addEventListener('click', () => {
  if (event.target.tagName !== 'LI' && event.target.tagName !== 'BUTTON') {
    store.dispatch(selected(null));
    btnDisabler(store.getState().selectedIndex);
  }
  if (event.target.tagName === 'LI') {
    const index = store.getState()['orderFoods']
      .findIndex(item => item === event.target.innerText);
    store.dispatch(selected(index));
    btnDisabler(store.getState().selectedIndex);
  }
})

function btnDisabler(selectedIndex) {
  if (selectedIndex === 0) {
    btnUp.disabled = true;
  }
  if (selectedIndex !== 0) {
    btnUp.disabled = false;
  }
  if (selectedIndex === store.getState().orderFoods.length - 1) {
    btnDown.disabled = true;
  }
  if (selectedIndex !== store.getState().orderFoods.length - 1) {
    btnDown.disabled = false;
  }
  if (selectedIndex === null) {
    btnDown.disabled = true;
    btnUp.disabled = true;
  }
}

function getNextState(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SELECTED:
      newState = {
        ...state,
        selectedIndex: action.index
      }
      return newState;
    case MOVE_DOWN:
      newState = {
        orderFoods: action.foods,
        selectedIndex: action.index
      }
      return newState;
    case MOVE_UP:
      newState = {
        orderFoods: action.foods,
        selectedIndex: action.index
      }
      return newState;
    default:
      return state;
  }
}

showList(list, initialState.orderFoods);
addButtons();
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');

btnDown.addEventListener('click', () => {
  const foods = [...store.getState()['orderFoods']];
  const index = store.getState().selectedIndex;
  const item = foods.splice(index, 1);
  foods.splice(index + 1, 0, item[0]);
  store.dispatch(moveDown(foods, index + 1));
  list.innerHTML = '';
  showList(list, store.getState().orderFoods);
  btnDisabler(store.getState().selectedIndex);
});

btnUp.addEventListener('click', () => {
  const foods = [...store.getState()['orderFoods']];
  const index = store.getState().selectedIndex;
  const item = foods.splice(index, 1);
  foods.splice(index - 1, 0, item[0]);
  store.dispatch(moveUp(foods, index - 1));
  list.innerHTML = '';
  showList(list, store.getState().orderFoods);
  btnDisabler(store.getState().selectedIndex);
});

const store = Redux.createStore(getNextState);

store.subscribe(() => {
  console.log(store.getState());
})
