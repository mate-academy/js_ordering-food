const { createStore } = require('./redux.min');

const MOVE_UP = 'move up';
const MOVE_DOWN = 'move down';
const SELECT = 'select';

const INITIAL_ITEMS = [
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
]

const INITIAL_STORE = {
  items: INITIAL_ITEMS,
  isSelected: null,
};

const reducer = (state = INITIAL_STORE, action) => {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        isSelected: action.index,
      };
    case MOVE_UP:
      if (state.isSelected <= 0) {
        return state;
      }

      const movedItemsUp = moveItemUp(state.items, state.isSelected);

      return {
        ...state,
        items: movedItemsUp,
        isSelected: state.isSelected - 1,
      };
    case MOVE_DOWN:
      if (state.isSelected >= state.items.length - 1) {
        return state;
      }

      const movedItemsDown = moveItemDown(state.items, state.isSelected);

      return {
        ...state,
        items: movedItemsDown,
        isSelected: state.isSelected + 1,
      };
    default:
      return state;
  } 
}

function moveItemUp(items, index) {
  const movedUpItems = [...items];
  [movedUpItems[index], movedUpItems[index - 1]] = [movedUpItems[index - 1], movedUpItems[index]];

  return movedUpItems;
}

function moveItemDown(items, index) {
  const movedUpItems = [...items];
  [movedUpItems[index], movedUpItems[index + 1]] = [movedUpItems[index + 1], movedUpItems[index]];

  return movedUpItems;
}

const select = (index) => ({
  type: SELECT,
  index,
})

const moveUp = () => ({
  type: MOVE_UP,
})

const moveDown = () => ({
  type: MOVE_DOWN,
})

const store = createStore(reducer);

const initialState = store.getState();

store.dispatch(select(0));
store.dispatch(moveDown());
store.dispatch(moveDown());


const updatedState = store.getState();

console.log('Should be true', initialState.items[0] === updatedState.items[2]);
