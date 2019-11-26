const MOVE_UP = 'moveUp';
const MOVE_DOWN = 'moveDown';
const SELECT = 'selectItem';
const UNSELECT = 'unselectItem';

const initialState = {
  items: [
    'Apple',
    'Bread',
    'Carrot',
    'Dumplings',
    'Eggs',
    'Fish',
    'Garlic',
    'Honey',
    'Ice cream',
    'Jam'
  ],
  selectedItem: -1
};

const moveUp = () => ({ type: MOVE_UP });
const moveDown = () => ({ type: MOVE_DOWN });
const selectItem = (index) => ({ type: SELECT, index });
const unselectItem = () => ({ type: UNSELECT });

function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_UP:
      return {
        ...state,
        items: state.items.map((item, index) => {
          const prevItem = state.items[state.selectedItem - 1];

          if (index === state.selectedItem - 1) {
            return state.items[state.selectedItem];
          }
          if (index === state.selectedItem) {
            return prevItem;
          }

          return item;
        }),
        selectedItem: state.selectedItem - 1
      };
    case MOVE_DOWN:
      return {
        ...state,
        items: state.items.map((item, index) => {
          const nextItem = state.items[state.selectedItem + 1];

          if (index === state.selectedItem + 1) {
            return state.items[state.selectedItem];
          }
          if (index === state.selectedItem) {
            return nextItem;
          }

          return item;
        }),
        selectedItem: state.selectedItem + 1
      };
    case SELECT:
      return {
        ...state,
        selectedItem: action.index,
      };
    case UNSELECT:
      return {
        ...state,
        selectedItem: -1,
      };
    default:
      return state;
  }
}

const store = Redux.createStore(reducer, initialState);

const buttonMoveUp = document.getElementById('up');
const buttonMoveDown = document.getElementById('down');

buttonMoveUp.addEventListener('click', () => {
    return store.dispatch(moveUp());
  }
);

buttonMoveDown.addEventListener('click', () => store.dispatch(moveDown()));

document.querySelector('body').addEventListener('click', (event) => {
  if (
    event.target.tagName !== 'A' &&
    event.target.tagName !== 'DIV' &&
    event.target.tagName !== 'BUTTON'
  ) {
    store.dispatch(unselectItem());
  }
});

render = (state, dispatch) => {
  const foodList = document.getElementById('foodList');
  foodList.innerHTML = ``;

  const currentList = store.getState().items;
  const index = store.getState().selectedItem;

  for (let i = 0; i < currentList.length; i++) {
    const item = document.createElement('div');
    item.innerHTML = `
      <div class="content">
        <a class="header">
        ${currentList[i]}
        </a>
      </div>
    `;

    if (i === state.selectedItem) {
      item.style.backgroundColor = 'lemonchiffon';
    } else {
      item.style.backgroundColor = 'transparent';
    }

    if (state.selectedItem < 1) {
      buttonMoveUp.className= 'ui negative button disabled'
    } else {
      buttonMoveUp.className= 'ui negative button'
    };

    if (state.selectedItem >= currentList.length - 1 || state.selectedItem < 0) {
      buttonMoveDown.className= 'ui positive button disabled'
    } else {
      buttonMoveDown.className= 'ui positive button'
    };

    item.className = "item";

    item.addEventListener('click', () => dispatch({
      type: SELECT,
      index: i
    }));

    foodList.append(item);
  }
};

render(store.getState(), store.dispatch);
store.subscribe(() => render(store.getState(), store.dispatch));
