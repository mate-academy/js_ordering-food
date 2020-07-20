const { createStore } = require('./redux.min');

const actions = {
  SELECT: 'SELECT',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
};

const actionsCreator = {
  select: (index) => ({type: actions.SELECT, index}),
  moveUp: () => ({type: actions.MOVE_UP}),
  moveDown: () => ({type: actions.MOVE_DOWN}),
};

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
    case actions.SELECT:
      return {
        ...state,
        index: action.index,
      };
    case actions.MOVE_UP:
      const itemsToMoveUp = [...state.items];
      [
        itemsToMoveUp[state.index], itemsToMoveUp[state.index - 1]
      ] = [
        itemsToMoveUp[state.index + 1], itemsToMoveUp[state.index]
      ]
      return {
        ...state,
        items: itemsToMoveUp,
        index: state.index - 1,
      };
    case actions.MOVE_DOWN:
      const itemsToMoveDown = [...state.items];
      [
        itemsToMoveDown[state.index], itemsToMoveDown[state.index + 1]
      ] = [
        itemsToMoveDown[state.index + 1], itemsToMoveDown[state.index]
      ]
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

console.log(store.getState());
store.dispatch(actionsCreator.select(5));
store.dispatch(actionsCreator.moveDown());
store.dispatch(actionsCreator.moveDown());
console.log(store.getState());

module.exports = {
  store,
  // actions,
  // actionCreators
}
