const { createStore } = require('./redux.min');

// Write code here

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
    'Jam',
  ],
  selectedIndex: -1,
};

const actionType = {
  SELECT: 'SELECT',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
};

const actions = {
  select: (index) => ({
    type: actionType.SELECT,
    index: index,
  }),
  moveUp: () => ({
    type: actionType.MOVE_UP,
  }),
  moveDown: () => ({
    type: actionType.MOVE_DOWN,
  }),
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SELECT: {
      if (typeof action.index === 'number' && Number.isInteger(action.index)
        && action.index >= 0 && action.index < state.items.length) {
        return {
          ...state,
          selectedIndex: action.index,
        };

      } else {
        return state;
      }
    }

    case actionType.MOVE_UP: {
      if (state.selectedIndex > 0) {
        const updatedItems = [...state.items];
        const selectedItem = updatedItems[state.selectedIndex];
        updatedItems[state.selectedIndex] = updatedItems[state.selectedIndex - 1];
        updatedItems[state.selectedIndex - 1] = selectedItem;

        return {
          ...state,
          items: updatedItems,
          selectedIndex: state.selectedIndex - 1,
        }

      } else {
        return state;
      }
    }

    case actionType.MOVE_DOWN: {
      if (state.selectedIndex < state.items.length - 1) {
        const updatedItems = [...state.items];
        const selectedItem = updatedItems[state.selectedIndex];
        updatedItems[state.selectedIndex] = updatedItems[state.selectedIndex + 1];
        updatedItems[state.selectedIndex + 1] = selectedItem;

        return {
          ...state,
          items: updatedItems,
          selectedIndex: state.selectedIndex + 1,
        }

      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

const store = createStore(itemReducer);

store.dispatch(actions.select(0));
store.dispatch(actions.moveDown());
store.dispatch(actions.moveDown());
store.dispatch(actions.moveUp());
store.dispatch(actions.moveDown());
store.dispatch(actions.moveDown());

let updatedState = store.getState();

console.log('Should be true', initialState.items[0] === updatedState.items[3]);

module.exports = {
  store,
  actions,
//   actionCreators,
};
