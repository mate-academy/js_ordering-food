const { createStore } = require('./redux.min');

const initialStore = {
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
  selectedGood: undefined,
  enabledUp: false,
  enabledDown: false,
}

const actions = {
  SELECT: 'SELECT',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
};

const actionCreators = {
  select: index => ({ type: actions.SELECT, index: index }),
  moveUp: () => ({ type: actions.MOVE_UP}),
  moveDown: () => ({ type: actions.MOVE_DOWN}),
};

const moveGoodDown = (store) => {
  const {
    items,
    selectedGood,
  } = store;

  const goods = [ ...items ];

  if (selectedGood < goods.length - 1) {
    [ goods[selectedGood], goods[selectedGood + 1] ] =
      [ goods[selectedGood + 1], goods[selectedGood] ];
  }

  return goods;
};

const moveGoodUp = (store) => {
  const {
    items,
    selectedGood,
  } = store;

  const goods = [ ...items ];

  if (selectedGood > 0) {
    [ goods[selectedGood], goods[selectedGood - 1] ] =
      [ goods[selectedGood - 1], goods[selectedGood] ];
  }

  return goods;
};

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case actions.SELECT: {
      const isMovableUp = action.index > 0;
      const isMovableDown = action.index < store.items.length - 1;
    
      return {
        ...store,
        selectedGood: action.index,
        enabledUp: isMovableUp,
        enabledDown: isMovableDown,
      };
    }

    case actions.MOVE_UP: {
      const isMovableUp = store.selectedGood > 0;

      return {
        ...store,
        items: moveGoodUp(store),
        enabledUp: isMovableUp,
        selectedGood: (store.selectedGood)
          ? ( store.selectedGood - 1 )
          : ( store.selectedGood ),
      };
    }

    case actions.MOVE_DOWN: {
      const isMovableDown = store.selectedGood < store.items.length - 1;

      return {
        ...store,
        items: moveGoodDown(store),
        enabledDown: isMovableDown,
        selectedGood: (store.selectedGood < store.items.length - 1)
          ? ( store.selectedGood + 1)
          : ( store.selectedGood ),
      };
    }

    default:
      return store;
  }
};

const store = createStore(reducer);

module.exports = {
  store,
  actions,
  actionCreators,
};
