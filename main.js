const initialState = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  index: null,
};

const itemUp = (index) => {
  return {
    type: 'ITEM_UP',
    index
  }
};

const itemDown = (index) => {
  return {
    type: 'ITEM_DOWN',
    index
  }
};

const selectItem = (index) => {
  return {
    type: 'SELECT_ITEM',
    index
  }
};

const reducer = (state = initialState, action) => {
  const foodList = [...state.items];
  switch (action.type) {
    case 'ITEM_UP':
      [foodList[state.index - 1], foodList[state.index]] = [foodList[state.index], foodList[state.index - 1]];
      return {
        ...state,
        items: foodList,
        index: state.index - action.index,
      };
    case 'ITEM_DOWN':
      [foodList[state.index], foodList[state.index + 1]] = [foodList[state.index + 1], foodList[state.index]];
      return {
        ...state,
        items: foodList,
        index: state.index - action.index,
      };
    case 'SELECT_ITEM':
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

document.querySelector('.button-up').addEventListener('click', () => {
  const state = store.getState();
  if (state.index !== 0) {
    store.dispatch(itemUp(+1));
  }
});

document.querySelector('.button-down').addEventListener('click', () => {
  const state = store.getState();
  if (state.index !== state.items.length - 1 && state.index !== null) {
    store.dispatch(itemDown(-1));
  }
});

document.querySelector('.list').addEventListener('click', (event) => {
  const state = store.getState();
  store.dispatch(selectItem(state.items.indexOf(event.target.textContent)));
});

document.body.addEventListener('click', (event) => {
  if (event.target.nodeName !== 'LI' && event.target.nodeName !== 'BUTTON') {
    store.dispatch(selectItem(null));
  }
});

const buttonActive = () => {
  const buttonUp = document.querySelector('.button-up');
  const buttonDown = document.querySelector('.button-down');
  const state = store.getState();

  if (state.index > 0 && state.index < state.items.length - 1) {
    document.querySelectorAll('button').forEach(item => item.disabled = false);
  } else if (state.index === 0) {
    buttonUp.disabled = true;
    buttonDown.disabled = false;
  } else if (state.index === state.items.length - 1) {
    buttonUp.disabled = false;
    buttonDown.disabled = true;
  } else {
    buttonUp.disabled = true;
    buttonDown.disabled = true;
  }

  if (!buttonUp.disabled) {
    buttonUp.classList.add('active');
  } else {
    buttonUp.classList.remove('active');
  }

  if (!buttonDown.disabled) {
    buttonDown.classList.add('active');
  } else {
    buttonDown.classList.remove('active');
  }
};

const render = () => {
  const state = store.getState();
  const list = document.querySelector('.list');
  list.innerHTML = '';

  for (const item of state.items) {
    const listItem = document.createElement('li');
    listItem.textContent = item;

    if (state.items.indexOf(listItem.textContent) === state.index && state.index !== null) {
      listItem.className = 'active';
    }
    list.append(listItem);
  }
};

store.subscribe(() => {
  render();
  buttonActive()
});

render();
buttonActive();
