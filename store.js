const { createStore } = require('./redux.min');

const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const SELECT = 'SELECT';

const moveGoodDown = (store) => {
  const {
    items,
    selectedGood,
  } = store;
  const goods = [ ...items ];

  if (selectedGood < goods.length - 1) {
    const good = goods[selectedGood];
    goods[selectedGood] = goods[selectedGood + 1];
    goods[selectedGood + 1] = good;
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
    const good = goods[selectedGood];
    goods[selectedGood] = goods[selectedGood - 1];
    goods[selectedGood - 1] = good;
  }

  return goods;
};

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
  // enabledUp: false,
  // enabledDown: false,
}

const reducer = (store = initialStore, action) => {

  switch (action.type) {
    case SELECT:
      // const isMovableUp = !!action.index;
      // const isMovableDown = action.index < store.items.length - 1;

      console.log('selected', action.index);

      return {
        ...store,
        selectedGood: action.index,
        // enabledUp: isMovableUp,
        // enabledDown: isMovableDown,
      };

    case MOVE_UP:
      console.log('moved_up',store.selectedGood);

      return {
        ...store,
        items: moveGoodUp(store),
        selectedGood: store.selectedGood
          ? ( store.selectedGood - 1 )
          : ( store.selectedGood ),
      };
    case MOVE_DOWN:
      console.log('moved_down', store.selectedGood);

      return {
        ...store,
        items: moveGoodDown(store),
        selectedGood: store.selectedGood < store.items.length - 1
          ? ( store.selectedGood + 1)
          : ( store.selectedGood ),
      };
    default:
      return store;
  }
};

const store = createStore(reducer);
const actions = {
  SELECT,
  MOVE_UP,
  MOVE_DOWN,
};

const selectAction = index => ({ type: SELECT, index: index });
const moveUpAction = () => ({ type: MOVE_UP});
const moveDownAction = () => ({ type: MOVE_DOWN});

const actionCreators = {
  select: selectAction,
  moveUp: moveUpAction,
  moveDown: moveDownAction,
};

module.exports = {
  store,
  actions,
  actionCreators,
};
