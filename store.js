const { createStore } = require('./redux.min');
const { actions, SELECT, MOVE_UP, MOVE_DOWN } = require('./actions');

// const MOVE_UP = 'move_up';
// const MOVE_DOWN = 'move_down';
// const SELECT = 'select';

// const moveUp = () => ({ type: MOVE_UP });
// const moveDown = () => ({ type: MOVE_DOWN });
// const select = (value) => ({ type: SELECT, value });
// const {
//   moveUp,
//   moveDown,
//   select,
// } = actions;

const { moveUp, moveDown, select } = actions;

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
  selected: null,
}

function reducers(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        selected: action.value,
      };
    case MOVE_UP:
    {const indexToMove = state.selected;
    const items = [ ...state.items ];

    if (indexToMove === 0) {
      return state;
    }

    [items[indexToMove], items[indexToMove - 1]] = [items[indexToMove - 1], items[indexToMove]];

      return {
        ...state, 
        items: items,
        selected: state.selected - 1,
      }};
      case MOVE_DOWN:
    {const indexToMove = state.selected;
      const items = [ ...state.items ];

      if(indexToMove === items.length) {
        return state;
      }

      [items[indexToMove], items[indexToMove + 1]] = [items[indexToMove + 1], items[indexToMove]];
      return {
        ...state, 
        items: items,
        selected: state.selected = 1,
      }};
    default:
      return state
  }
}

const store = createStore(reducers);

const prevState = store.getState();

store.dispatch(select(0));
store.dispatch(moveDown());
store.dispatch(moveDown());

console.log(prevState.items[0]);
const updatedState = store.getState();
console.log(updatedState.items[2]);

console.log('Should be true', prevState.items[0], updatedState.items[2]);