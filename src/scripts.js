'use strict';

const ORDER = 'order';
const UP = 'up';
const DOWN = 'down';

let initialState = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  itemMove: '',
  index: null
};

Array.prototype.move = function (index, step) { 
  let next = this[index + step];
  this[index + step] = this[index];
  this[index] = next;
  return this
};

function order(item) {
  return {
    type: ORDER,
    itemMove: item,
  }
}

function moveUp(items, index) {
  const newItems = [...items];
  newItems.move(index, -1);
  return {
    type: UP,
    items: newItems,
    index: index - 1,
  }
}

function moveDown(items, index) {
  const newItems = [...items];
  newItems.move(index, 1);
  return {
    type: DOWN,
    items: newItems,
    index: index + 1,
  }
}

function getNextState(state = initialState, action) {
  switch (action.type) {
    case ORDER:
      return {
        ...state,
        itemMove: action.itemMove,
        index: state.items.indexOf(action.itemMove)
      }
    case UP:
      return {
        ...state,
        items: action.items,
        index: action.index,
      };
    case DOWN:
      return {
        ...state,
        items: action.items,
        index: action.index,  
      };
    default:
      return state;
  }
}

const store = Redux.createStore(getNextState, initialState);

function render() {

  const state = store.getState();
  const buttonUp = document.getElementById('up');
  const buttonDown = document.getElementById('down');

  if(state.index > 0 && state.index < state.items.length - 1) {
    document.querySelectorAll('button').forEach(item => item.disabled = false);
    } else if(state.index === 0) {
      buttonUp.disabled = true;
      buttonDown.disabled = false;
    } else if(state.index === state.items.length - 1)  {
      buttonDown.disabled = true;
      buttonUp.disabled = false;
    } else {
      buttonDown.disabled = true;
      buttonUp.disabled = true;
    }

  buttonUp.addEventListener('click', (event) => {
    store.dispatch(moveUp(state.items, state.index));
  });

  buttonDown.addEventListener('click', (event) => {
    store.dispatch(moveDown(state.items, state.index));
  });

  const list = document.getElementById('list');
  list.innerHTML = '';
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];
    const listItem = document.createElement('li');
    listItem.innerHTML = `<div class="${item}"></div> ${item}`;
    listItem.addEventListener('click', (event) => {
      store.dispatch(order(item));  
    })
    list.append(listItem);
    if(item === state.itemMove) {
      listItem.classList.add('selected')
    }
  }

  document.body.addEventListener('click', (event) => {
    if(event.target.nodeName!=="LI" && event.target.nodeName!=="BUTTON") {
      store.dispatch({
        type: 'order',
        itemMove: ''
      }); 
    }
  })
}

store.subscribe(() => {
  render();
});

render();
