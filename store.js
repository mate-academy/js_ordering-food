const { createStore } = require('./redux.min');

const SELECT = 'select';
const MOVE_UP = 'move_up';
const MOVE_DOWN = 'move_down';

const select = (index) => ({ type: SELECT, index });
const up = () => ({ type: MOVE_UP });
const down = () => ({ type: MOVE_DOWN });

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
  index: null,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SELECT:
      return {
        ...state,
        index: action.index,
      };
    case MOVE_UP:
      const itemsToMoveUp = [...state.items];
      [itemsToMoveUp[state.index], itemsToMoveUp[state.index - 1]] = [itemsToMoveUp[state.index + 1], itemsToMoveUp[state.index]]
      return {
        ...state,
        items: itemsToMoveUp,
        index: state.index - 1,
      };
    case MOVE_DOWN:
      const itemsToMoveDown = [...state.items];
      [itemsToMoveDown[state.index], itemsToMoveDown[state.index + 1]] = [itemsToMoveDown[state.index + 1], itemsToMoveDown[state.index]]
      return {
        ...state,
        items: itemsToMoveDown,
        index: state.index + 1,
      };
    default: 
      return state;
  }
}

const store = createStore(reducer);

store.dispatch(select(2));
store.dispatch(down());
store.dispatch(down());
console.log(store.getState());

module.exports = {
  store,
  // actions,
  // actionCreators
}
