'use strict';

const SELECTED_ITEM = 'selected_item';
const MOVE_UP = 'move_up';
const MOVE_DOWN = 'move_down';
const CLEAR_SELECTION = 'clear_selection';
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

];

const initialState = {
  itemsOfFood: [...food],
  selectedItem: null
};

const actionSelectItem = (index) => {
  return {
    type: SELECTED_ITEM,
    payload: index
  }
};

const clearSelection = () => {
  return {
    type: CLEAR_SELECTION
  }
};

const actionMoveUp = () => {
  return {
    type: MOVE_UP
  }
};

const actionMoveDown = () => {
  return {
    type: MOVE_DOWN
  }
};

const actionHandler = {
  [SELECTED_ITEM]: (state, {payload: selectedItem}) => {
    return {
      ...state,
      selectedItem
    }
  },
  [CLEAR_SELECTION]: (state) => {
    return {
      ...state,
      selectedItem: null
    }
  },
  [MOVE_UP]: (state) => {
    const {itemsOfFood, selectedItem} = state;
    if (selectedItem === 0) {
      return state
    }
    const newItemsOfFood = [...itemsOfFood];
    const selectedFoodItem = newItemsOfFood.splice(selectedItem, 1);
    newItemsOfFood.splice(selectedItem - 1, 0, selectedFoodItem[0]);
    return {
      itemsOfFood: newItemsOfFood,
      selectedItem: selectedItem - 1
    }
  },
  [MOVE_DOWN]: (state) => {
    const {itemsOfFood, selectedItem} = state;
    if (selectedItem === itemsOfFood.length - 1) {
      return state
    }
    const newItemsOfFood = [...itemsOfFood];
    const selectedFoodItem = newItemsOfFood.splice(selectedItem, 1);
    newItemsOfFood.splice(selectedItem + 1, 0, selectedFoodItem[0]);
    return {
      itemsOfFood: newItemsOfFood,
      selectedItem: selectedItem + 1
    }
  }
};

const reducer = (state = initialState, action) => {
  const handler = actionHandler[action.type];
  return handler ? handler(state, action) : state;
};

const store = Redux.createStore(reducer);

const list = document.getElementById('list');
const upButton = document.getElementById('move-up');
const downButton = document.getElementById('move-down');

upButton.addEventListener('click' , (event) => {
  store.dispatch(actionMoveUp());
  event.stopPropagation()
});
downButton.addEventListener('click' , (event) => {
  store.dispatch(actionMoveDown());
  event.stopPropagation()
});

function render() {
  list.innerHTML = '';

  const listItem = store.getState().itemsOfFood;
  const selectedIndexItem = store.getState().selectedItem;

  upButton.disabled = selectedIndexItem  === 0 || selectedIndexItem === null;
  downButton.disabled = selectedIndexItem === listItem.length - 1 || selectedIndexItem === null;

  listItem.map((item, index) => {

    const li = document.createElement('li');
    const selected = store.getState().selectedItem;

    li.innerHTML = item.name;
    list.append(li);
    index === selected ? li.classList.add('active') : null;
    li.addEventListener('click', (event) => {
      store.dispatch(selected === index ? clearSelection() : actionSelectItem(index));
      event.stopPropagation()
    });

  })
}

document.addEventListener('click', (event) => {
  store.dispatch(clearSelection());
});

store.subscribe(() => render());

render();
