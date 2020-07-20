const { createStore } = require('./redux.min');

const ACTIONS = {
  MOVE_UP : 'MOVE_UP',
  MOVE_DOWN : 'MOVE_DOWN',
  SELECT : 'SELECT'
}

const food = ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam']

const initialState = {
 items: [...food],
  index: null
};

const actionsCreator = {
  select: (index) => ({type: ACTIONS.SELECT, index}),
  moveUp: () => ({type: ACTIONS.MOVE_UP}),
  moveDown: () => ({type: ACTIONS.MOVE_DOWN}),
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.SELECT:
      return {
        ...state,
        index: action.index
      };

      case ACTIONS.MOVE_UP: {
          const newItemsOfFood = [...state.items];
          const item = newItemsOfFood.splice(state.index, 1);
          newItemsOfFood.splice(state.index - 1, 0, item[0])

          return {
            ...state,
            items: newItemsOfFood,
            index: state.index - 1
          };
      }

      case ACTIONS.MOVE_DOWN: {
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
store.dispatch(actionsCreator.select(2));
store.dispatch(actionsCreator.moveDown());
store.dispatch(actionsCreator.moveDown());
console.log(store.getState());


module.export = {
  store,

};