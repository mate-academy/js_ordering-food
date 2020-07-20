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
    'Jam',
  ],
  selected: null,
};

const actions = {
  SELECT: 'select',
  MOVE_UP: 'moveUp',
  MOVE_DOWN: 'moveDown',
};

const SELECT = (value) => ({ type: actions.SELECT, value, });
const MOVE_UP = () => ({ type: actions.MOVE_UP });
const MOVE_DOWN = () => ({ type: actions.MOVE_DOWN });

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SELECT:
      return {
        ...state,
        selected: action.value,
      };

    case actions.MOVE_UP:
      if (Object.is(null, state.selected) || state.selected === 0) {
        return {
          ...state,
        };
      }

      let upItems = [...state.items];
      upItems.splice(state.selected - 1, 2, state.items[state.selected], state.items[state.selected - 1]);

      return {
        ...state,
        items: upItems,
        selected: state.selected - 1,
      };

    case actions.MOVE_DOWN:
      if (Object.is(null, state.selected) || state.selected === state.items.length - 1) {
        return {
          ...state,
        };
      }

      let downItems = [...state.items];
      downItems.splice(state.selected, 2, state.items[state.selected + 1], state.items[state.selected]);

      return {
        ...state,
        items: downItems,
        selected: state.selected + 1,
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch(SELECT(0));
store.dispatch(MOVE_DOWN());
store.dispatch(MOVE_DOWN());

const updatedState = store.getState();

console.log('Should be true', initialState.items[0] === updatedState.items[2]);
