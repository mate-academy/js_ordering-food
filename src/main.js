'use strict';

const ACTION_SELECT = 'action1';
const ACTION_MOVE_UP = 'action2';
const ACTION_MOVE_DOWN = 'action3';

let initialState = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  selected: -1
};

const actions = {

  select: function (payload) {
    return {
      type: ACTION_SELECT,
      payload
    }
  },

  moveUp: function () {
    return {
      type: ACTION_MOVE_UP
    }
  },

  moveDown: function () {
    return {
      type: ACTION_MOVE_DOWN
    }
  }

}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_SELECT: {
      return {
        ...state,
        selected: action.payload.id
      }
    }

    case ACTION_MOVE_UP: {
      const temp = [...state.items];
      const index = state.selected;

      let up = temp[index - 1];
      temp[index - 1] = temp[index];
      temp[index] = up;

      return {
        ...state,
        items: temp,
        selected: state.selected - 1,
      };
    }

    case ACTION_MOVE_DOWN: {
      const temp = [...state.items];
      const index = state.selected;

      let next = temp[index + 1];
      temp[index + 1] = temp[index];
      temp[index] = next;

      return {
        ...state,
        items: temp,
        selected: state.selected + 1,
      };
    }

    default:
      return state;
  }
}

const store = Redux.createStore(reducer, initialState);

const buttonUp = document.getElementById('up');
const buttonDown = document.getElementById('down');
const list = document.getElementById('list');

buttonUp.addEventListener('click', () => {
  store.dispatch(actions.moveUp());
});

buttonDown.addEventListener('click', () => {
  store.dispatch(actions.moveDown());
});

document.body.addEventListener('click', (event) => {
  if (event.target.nodeName !== "LI" && event.target.nodeName !== "BUTTON") {
    store.dispatch(actions.select({ id: -1 }));
  }
});

function render() {

  const state = store.getState();

  if (state.selected > 0 && state.selected < state.items.length - 1) {
    buttonUp.disabled = false;
    buttonDown.disabled = false;
  } else if (state.selected === 0) {
    buttonUp.disabled = true;
    buttonDown.disabled = false;
  } else if (state.selected === state.items.length - 1) {
    buttonDown.disabled = true;
    buttonUp.disabled = false;
  } else {
    buttonDown.disabled = true;
    buttonUp.disabled = true;
  }

  list.innerHTML = '';

  for (let i = 0; i < state.items.length; i++) {
    const itemName = state.items[i];

    const listItem = document.createElement('li');
    listItem.innerText = itemName;

    listItem.addEventListener('click', (event) => {
      store.dispatch(actions.select({ id: i }));
    });

    list.append(listItem);

    if (i === state.selected) {
      listItem.classList.add('selected')
    }
  }
}

store.subscribe(() => {
  render();
});

render();