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
    payload: { index }
  };
};
function moveUp(foods, index) {
  return {
    type: MOVE_UP,
    payload: { foods, index }
  };
}
function moveDown(foods, index) {
  return {
    type: MOVE_DOWN,
    payload: { foods, index }
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
    btnDisabled(store.getState().selectedIndex);
  } else if (event.target.tagName === 'LI') {
    const index = store.getState()['orderFoods']
      .findIndex(item => item === event.target.innerText);
    store.dispatch(selected(index));
    btnDisabled(store.getState().selectedIndex);
  }
})

function btnDisabled(selectedIndex) {
  const maxIndex = store.getState().orderFoods.length - 1
  const isUpDisabled = selectedIndex === null || selectedIndex === 0;
  const isDownDisabled = selectedIndex === null || selectedIndex === maxIndex;
  isUpDisabled
    ? upButton.setAttribute('disabled', 'disabled')
    : upButton.removeAttribute('disabled');
  isDownDisabled
    ? downButton.setAttribute('disabled', 'disabled')
    : downButton.removeAttribute('disabled');
}

function getNextState(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SELECTED:
      newState = {
        ...state,
        selectedIndex: action.payload.index
      }
      return newState;
    case MOVE_DOWN:
      newState = {
        orderFoods: action.payload.foods,
        selectedIndex: action.payload.index
      }
      return newState;
    case MOVE_UP:
      newState = {
        orderFoods: action.payload.foods,
        selectedIndex: action.payload.index
      }
      return newState;
    default:
      return state;
  }
}

showList(list, initialState.orderFoods);
addButtons();
const upButton = document.getElementById('btn-up');
const downButton = document.getElementById('btn-down');

function getMoveInfo() {
  const foods = [...store.getState()['orderFoods']];
  const index = store.getState().selectedIndex;
  const item = foods.splice(index, 1);
  return [foods, index, item];
}

function showResultMovement() {
  list.innerHTML = '';
  showList(list, store.getState().orderFoods);
  btnDisabled(store.getState().selectedIndex);
}

downButton.addEventListener('click', () => {
  const [foods, index, item] = getMoveInfo()
  foods.splice(index + 1, 0, item[0]);
  store.dispatch(moveDown(foods, index + 1));
  showResultMovement()
});

upButton.addEventListener('click', () => {
  const [foods, index, item] = getMoveInfo()
  foods.splice(index - 1, 0, item[0]);
  store.dispatch(moveUp(foods, index - 1));
  showResultMovement()
});

const store = Redux.createStore(getNextState);
