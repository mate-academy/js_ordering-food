const initialState = {
  listOfFood: [
    'Apple',
    'Bread',
    'Carrot',
    'Dumplings',
    'Eggs',
    'Fish',
    'Garlic',
    'Honey',
    'Ice cream',
    'Jam'
  ],
  activeItem: null,
};

const actionHandlers = {
  [SELECT_ITEM]: (state, action) => {
    return {
      ...state,
      activeItem: action.payload
    };
  },

  [UP_ITEM]: state => {
    return {
      ...state,
      activeItem: state.activeItem - 1
    };
  },

  [DOWN_ITEM]: state => {
    return {
      ...state,
      activeItem: state.activeItem + 1
    };
  }
};

function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];

  return handler 
    ? handler(state, action) 
    : state;
}
