const { createStore } = require('./redux.min');

const actions = {
  MOVE_UP : 'MOVE_UP',
  MOVE_DOWN : 'MOVE_DOWN',
  SELECT : 'SELECT'
}

const food = ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam']

const initialState = {
  items: [...food],
  index: null
};

const actionsCreators = {
  select: (index) => ({type: actions.SELECT, index}),
  moveUp: () => ({type: actions.MOVE_UP}),
  moveDown: () => ({type: actions.MOVE_DOWN}),
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case actions.SELECT:
      return {
        ...state,
        index: action.index
      };

    case actions.MOVE_UP: {
      const newItemsOfFood = [...state.items];
      const item = newItemsOfFood.splice(state.index, 1);
      newItemsOfFood.splice(state.index - 1, 0, item[0])

      return {
        ...state,
        items: newItemsOfFood,
        index: state.index - 1
      };
    }

    case actions.MOVE_DOWN: {
      const newItemsOfFood = [...state.items];
      const item = newItemsOfFood.splice(state.index, 1);
      newItemsOfFood.splice(state.index + 1, 0, item[0])

      return {
        ...state,
        items: newItemsOfFood,
        index: state.index + 1
      };
    }

    default:
      return state;
  }
}

const store = createStore(reducer);

console.log(store.getState());
store.dispatch(actionsCreators.select(2));
store.dispatch(actionsCreators.moveDown());
store.dispatch(actionsCreators.moveDown());
console.log(store.getState());

module.export = {
  store,
};
