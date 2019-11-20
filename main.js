const initialState = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  index: null,
};

const itemUp = (index) => {
  return {
    type: 'item-up',
    index
  }
};

const itemDown = (index) => {
  return {
    type: 'item-down',
    index
  }
};

const selectItem = (index) => {
  return {
    type: 'select-item',
    index
  }
};

const getNextState = (state = initialState, action) => {
  switch (action.type) {
    case 'item-up':
      const itemsArr1 = [...state.items];
      [itemsArr1[state.index - 1], itemsArr1[state.index]] = [itemsArr1[state.index], itemsArr1[state.index - 1]];
      return {
        ...state,
        items: itemsArr1,
        index: state.index - action.index,
      };
    case 'item-down':
      const itemsArr2 = [...state.items];
      [itemsArr2[state.index], itemsArr2[state.index + 1]] = [itemsArr2[state.index + 1], itemsArr2[state.index]];
      return {
        ...state,
        items: itemsArr2,
        index: state.index - action.index,
      };
    case 'select-item':
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
};

const store = Redux.createStore(getNextState);

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
    buttonUp.disabled = false;
    buttonDown.disabled = false;
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
