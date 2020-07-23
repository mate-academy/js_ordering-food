const { createStore } = require('./redux.min');

const actions = {
  MOVE_UP: 'move up',
  MOVE_DOWN: 'move down',
  SELECT: 'select',
}

const initialItems = [
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

const initialStore = {
  items: initialItems,
  isSelected: null,
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case actions.SELECT:
      return {
        ...state,
        isSelected: action.index,
      };
    case actions.MOVE_UP:
      if (state.isSelected <= 0) {
        return state;
      }

      const movedItemsUp = moveItemUp(state.items, state.isSelected);

      return {
        ...state,
        items: movedItemsUp,
        isSelected: state.isSelected - 1,
      };
    case actions.MOVE_DOWN:
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
  type: actions.SELECT,
  index,
})

const moveUp = () => ({
  type: actions.MOVE_UP,
})

const moveDown = () => ({
  type: actions.MOVE_DOWN,
})

const store = createStore(reducer);

const initialState = store.getState();

store.dispatch(select(0));
store.dispatch(moveDown());
store.dispatch(moveDown());


const updatedState = store.getState();

console.log('Should be true', initialState.items[0] === updatedState.items[2]);
