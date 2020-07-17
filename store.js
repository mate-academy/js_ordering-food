const { createStore } = require('./redux.min');

const initialState = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  Selected: null,
} ;

const SELECT = 'SELECT';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';

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


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SELECT:
      return {
        ...state,
        Selected: action.value,
      };
    case MOVE_UP:
      const movedItemsUp = moveItemUp(state.items, state.Selected);
      return {
        ...state,
        items: movedItemsUp,
        Selected: state.Selected - 1,
        };
    case MOVE_DOWN:
      const movedItemsDown = moveItemDown(state.items, state.Selected);
      return {
        ...state,
        items: movedItemsDown,
        Selected: state.Selected + 1,
      };
    default: 
      return state;
  }
}

let store = createStore(reducer)

const moveUp = () => ({ type: MOVE_UP });

const moveDown = () => ({ type: MOVE_DOWN });

const select = (value) => {
  return {
    type: SELECT,
    value
  }
}

store.dispatch(select(2))
store.dispatch(moveDown())
store.dispatch(moveDown())

console.log(store.getState())


module.exports = {
  store,
  // actions,
  // actionCreators,
};