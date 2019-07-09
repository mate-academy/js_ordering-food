'use strict'

const MOVE_UP = 'move_up';
const MOVE_DOWN = 'move_down';
const SELECT_INDEX = 'selected_index'

function moveUpAction() {
  return {
    type: MOVE_UP
  };
};

function moveDownAction() {
  return {
    type: MOVE_DOWN
  };
};

function selectedIndexAction(index) {
  return {
    type: SELECT_INDEX,
    index
  };
};

const initialState = {
  foods: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  selectedFoodIndex: null
};

function getNextState(state = initialState, action) {
  switch (action.type) {
    case MOVE_UP: 
      const newFoodItemsUp = [...state.foods];
      const indexFoodItemUp = state.selectedFoodIndex;
      const [selectedFoodItemUp] = newFoodItemsUp.splice(indexFoodItemUp, 1);
      newFoodItemsUp.splice(indexFoodItemUp - 1, 0, selectedFoodItemUp);
      return {
        foods: newFoodItemsUp,
        selectedFoodIndex: indexFoodItemUp - 1
      };
    case MOVE_DOWN:
      const newFoodItemsDown = [...state.foods];
      const indexFoodItemDown = state.selectedFoodIndex;
      const [selectedFoodItemDown] = newFoodItemsDown.splice(indexFoodItemDown, 1);
      newFoodItemsDown.splice(indexFoodItemDown + 1, 0, selectedFoodItemDown);
      return {
        foods: newFoodItemsDown,
        selectedFoodIndex: indexFoodItemDown + 1
      };
    case SELECT_INDEX:
      return {
        ...state,
        selectedFoodIndex: action.index
      };
    default:
      return state;
  };
};

const store = Redux.createStore(getNextState);

const moveDowm = document.querySelector('#moveDown');
const moveUp = document.querySelector('#moveUp');

moveDowm.addEventListener('click', () => {
  store.dispatch(moveDownAction());
})

moveUp.addEventListener('click', () => {
  store.dispatch(moveUpAction());
});

function render() {
  const listItem = document.querySelector('#listItem');
  listItem.innerHTML = '';

  const foodItems = store.getState().foods;
  const index = store.getState().selectedFoodIndex;

  if (index !== null) {
    moveDowm.disabled = index === foodItems.length - 1;
    moveUp.disabled = index === 0;
  };
  
  for (let i = 0; i < foodItems.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = foodItems[i];
    li.addEventListener('click', (e) => {
      store.dispatch(selectedIndexAction(i));
    });
    listItem.append(li);
  };
};

store.subscribe(() => {
  render();
});

render();
