'use strict';

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

function getNextState(state=initialState, action) {
  switch (action.type) {
    case 'order':
      return {
        ...state,
        itemMove: action.itemMove,
        index: state.items.indexOf(action.itemMove)
      }
    case 'up':
      return {
        ...state,
        items: state.items.move(state.index, -1),
        index: state.items.indexOf(state.itemMove),
      };
    case 'down':
      return {
        ...state,
        items: state.items.move(state.index, 1),
        index: state.items.indexOf(state.itemMove),   
      };
    default:
      return state;
  }
}

const store = Redux.createStore(getNextState, initialState);

document.getElementById('up').addEventListener('click', (event) => {
  store.dispatch({type: 'up'});
});

document.getElementById('down').addEventListener('click', (event) => {
  store.dispatch({type: 'down'});
});

function render() {
  const state = store.getState();
  console.log(state)
  const list = document.getElementById('list');
  list.innerHTML = '';
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];
    const listItem = document.createElement('li');
    listItem.innerHTML = `<div class="${item}"></div> ${item}`;
    listItem.addEventListener('click', (event) => {
      console.log(event.target)
      store.dispatch({
        type: 'order',
        itemMove: item
      });  
    })
    list.append(listItem);
    if(item === state.itemMove) {
      listItem.classList.add('selected')
    }
  }
  
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
