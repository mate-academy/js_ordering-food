import drawSvg from './svg.js'

const initialState = {
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

// reducer
function getNextState(state = initialState, action) {
  switch (action.type) {
    case 'order':
      return {
        ...state,
        itemMove: action.itemMove,
        index: state.items.indexOf(action.itemMove)
      };
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

// store, render
const store = Redux.createStore(getNextState, initialState);

document.getElementById('up').addEventListener('click', () => {
  store.dispatch({type: 'up'});
});
document.getElementById('down').addEventListener('click', () => {
  store.dispatch({type: 'down'});
});

function render() {
  const state = store.getState();
  const list = document.getElementById('list');

  list.innerHTML = '';
  state.items.forEach( item => {
    const listItem = document.createElement('li');
    const foodName = `${item.toLowerCase().split(' ').join('-')}`;
    
    listItem.classList.add('foods__item');
    listItem.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1898 1898">
        ${drawSvg(foodName)}
      </svg>&nbsp; ${item}`;
    listItem.addEventListener('click', () => {
      store.dispatch({
        type: 'order',
        itemMove: item
      });
    });
    list.append(listItem);
    
    if(item === state.itemMove) {
      listItem.classList.add('selected')
    }
  });

  const buttonUp = document.getElementById('up');
  const buttonDown = document.getElementById('down');

  if (state.index > 0 && state.index < state.items.length - 1) {
    document.querySelectorAll('.foods__btn').forEach(item => item.disabled = false);
  } else if (state.index === 0) {
    buttonUp.disabled = true;
    buttonDown.disabled = false;
  } else if (state.index === state.items.length - 1)  {
    buttonDown.disabled = true;
    buttonUp.disabled = false;
  } else {
    buttonDown.disabled = true;
    buttonUp.disabled = true;
  }

  document.body.addEventListener('click', (event) => {
    if(!event.target.closest('.foods__item') && !event.target.closest('.foods__btn')) {
      store.dispatch({
        type: 'order',
        itemMove: ''
      });
    }
  })
}

// subscribe
store.subscribe(() => {
  render();
});

render();
