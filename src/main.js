'use strict'

let initialState = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  selectedItem: '',
  index: null
};

function getNextState(state = initialState, action) {
  switch (action.type) {
    case 'move_up':
      let newItemsUp = upItem(state.items, state.selectedItem);
      return {
        ...state,
        items: newItemsUp,
        index: newItemsUp.indexOf(state.selectedItem)
      };
    case 'move_down': 
      let newItemsDown = downItem(state.items, state.selectedItem);
      return {
        ...state,
        items: newItemsDown,
        index: newItemsDown.indexOf(state.selectedItem)
      };
    
    case 'select_item':
      return {
        ...state,
        selectedItem: action.item
      };
    case 'select_index':
      return {
        ...state,
        index: action.index
      };
    default:
      return state;
  };
};

let store = Redux.createStore(getNextState);

function downItem(prevState, item) {
  let newItems = [];
  let currentIndex = prevState.indexOf(item);

  if (currentIndex !== -1) {
    prevState.splice(currentIndex, 1);
  };
  for (let i = 0; i < prevState.length; i++) {
    if (currentIndex === i) {
      newItems.push(prevState[i]);
      newItems.push(item);
    } else {
      newItems.push(prevState[i]);
    };
  };
  return newItems;
};

function upItem(prevState, item) {
  let newItems = [];
  let currentIndex = prevState.indexOf(item);
  if (currentIndex !== -1) {
    prevState.splice(currentIndex, 1);
  };

  for (let i = 0; i < prevState.length; i++) {
    if (currentIndex - 1 === i) {
      newItems.push(item);
      newItems.push(prevState[i]);
    } else {
      newItems.push(prevState[i]);
    };
  };
  return newItems;
}

const moveDowm = document.querySelector('#moveDown');

moveDowm.addEventListener('click', () => {
  store.dispatch({
    type: 'move_down'
  });
})

const moveUp = document.querySelector('#moveUp');

moveUp.addEventListener('click', () => {
  store.dispatch({
    type: 'move_up'
  });
})

function render() {
  const listItem = document.querySelector('#listItem');
  listItem.innerHTML = '';
  
  let items = store.getState().items;
  let index = store.getState().index;

  moveDowm.disabled = index === items.length - 1 ? true : false; 
  moveUp.disabled = index === 0 ? true : false;
  
  for (let i = 0; i < items.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = items[i];
    li.addEventListener('click', (e) => {
      e.target.classList.add('choose');
      store.dispatch({
        type: 'select_item',
        item: e.target.innerHTML
      });

      store.dispatch({
        type: 'select_index',
        index: i
      });
    });
    listItem.append(li);
  };
};

store.subscribe(() => {
  render();
});
render();
