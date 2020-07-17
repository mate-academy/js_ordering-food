/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const initialState = {
  fruits: [
    'Apple',
    'Bread',
    'Carrot',
    'Dumplings',
    'Eggs',
    'Fish',
    'Garlic',
    'Honey',
    'Ice cream',
    'Jam',
  ],
  selectedItem: null,
};

const ACTIONS = {
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  SELECTED_ITEM: 'SELECTED_ITEM',
  UNSELECTED_ITEM: 'UNSELECTED_ITEM',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case ACTIONS.UNSELECTED_ITEM:
      return {
        ...state,
        selectedItem: null,
      };
    case ACTIONS.MOVE_DOWN: {
      const newList = [...state.fruits];
      const index = state.selectedItem;
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];

      if (index === state.fruits.length - 1 || index === null) {
        return state;
      }
      return {
        ...state,
        fruits: newList,
        selectedItem: state.selectedItem + 1,
      };
    }
    case ACTIONS.MOVE_UP: {
      const newList = [...state.fruits];
      const index = state.selectedItem;
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];

      if (index === 0 || index === null) {
        return state;
      }
      return {
        ...state,
        fruits: newList,
        selectedItem: state.selectedItem - 1,
      };
    }
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);

function MOVE_UP() {
  return {
    type: ACTIONS.MOVE_UP,
  };
}

function MOVE_DOWN() {
  return {
    type: ACTIONS.MOVE_DOWN,
  };
}

function SELECTED_ITEM(index) {
  return {
    type: ACTIONS.SELECTED_ITEM,
    payload: index,
  };
}

function UNSELECTED_ITEM() {
  return {
    type: ACTIONS.UNSELECTED_ITEM,
  };
}

function moveUp() {
  store.dispatch(MOVE_UP());
}

function moveDown() {
  store.dispatch(MOVE_DOWN());
}

function selectItem(index) {
  store.dispatch(SELECTED_ITEM(index));
}

function unSelectItem() {
  store.dispatch(UNSELECTED_ITEM());
}

function render() {
  const state = store.getState();
  const container = document.querySelector('.container');

  container.innerHTML = `
    <ul class="list"> 
      ${state.fruits.map((item, index) => `
        <li
          onclick="selectItem(${index})"
          class="list__item ${state.selectedItem === index ? 'active' : ''}"
        >
            ${item}
        </li>`).join('')}
    </ul>
      <div class="buttons">
        <button ${state.selectedItem === null
      || state.selectedItem === 0 ? 'disabled' : ''}
          onclick="moveUp()"
          class="ui labeled icon button"
        >
          <i class="angle double up icon">
          </i>
            UP
        </button>
        <button
          ${state.selectedItem === null
      || state.selectedItem === state.fruits.length - 1 ? 'disabled' : ''}
          onclick="moveDown()"
          class="ui right labeled icon button">
          <i class="angle double down icon"></i>
            DOWN
          </button>
      </div>`;
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.buttons')
    && !event.target.closest('li')
    && !event.target.closest('button')) {
    unSelectItem();
  }
});

render();
store.subscribe(render);
