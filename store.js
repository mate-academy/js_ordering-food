const { createStore } = require('./redux.min');

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
    'Jam'],
  selected: null,
};

const SELECT = 'SELECT';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';

const moveUp = () => ({
  type: MOVE_UP
});

const moveDown = () => ({
  type: MOVE_DOWN
});

const select = (value) => ({
  type: SELECT,
  index: value
})


// reducer
const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SELECT:
      return {
        ...state,
        selected: action.index - 1,
      };
    case MOVE_UP:
      return {
        ...state,
        items: state.items.map((item, i) => {
          const prev = state.items[state.selected - 1];

          if (i === state.selected - 1) {
            return state.items[state.selected];
          }
          if (i === state.selected) {
            return prev;
          }

          return item;
        }),
        selected: state.selected - 1,
        };
    case MOVE_DOWN:
      return {
        ...state,
        items: state.items.map((item, i) => {
          const next = state.items[state.selected + 1];

          if (i === state.selected + 1) {
            return state.items[state.selected];
          }
          if (i === state.selected) {
            return next;
          }

          return item;
        }),
        selected: state.selected + 1,
      };
    default:
      return state;
  }
}

let store = createStore(rootReducer);

store.dispatch(select(1));
store.dispatch(moveDown());
store.dispatch(moveDown());
store.dispatch(moveUp())

console.log(store.getState());


module.exports = {
  store,
};
