const { createStore } = require('./redux.min');

const initialState = {
  itemList: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  selectedItem: null,
}

const actions = {
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  SELECT: 'SELECT',
}

const moveUp = (index) => {
  return {
    type: actions.MOVE_UP,
    index
  };
}

const moveDown = (index) => {
  return {
    type: actions.MOVE_DOWN,
    index
  };
}

const select = (index) => {
  return {
    type: actions.SELECT,
    index
  };
}

const reducer = (state = initialState, action) => {
  const { itemList, selectedItem } = state;
  const copyItemList = [...itemList]

  switch (action.type) {
    case actions.SELECT:
      return {
        ...state,
        selectedItem: action.index
      };

    case actions.MOVE_UP: {
      [
        copyItemList[selectedItem],
        copyItemList[selectedItem - 1]
      ] = [
        copyItemList[selectedItem - 1],
        copyItemList[selectedItem]
      ];
      return {
        ...state,
        itemList: copyItemList,
        selectedItem: selectedItem - 1,
      };
    }
    
    case actions.MOVE_DOWN: {
      [
        copyItemList[selectedItem],
        copyItemList[selectedItem + 1]
      ] = [
        copyItemList[selectedItem + 1],
        copyItemList[selectedItem]
      ];
      return {
        ...state,
        itemList: copyItemList,
        selectedItem: selectedItem + 1,
      };
    }

    default:
      return state;
  }
}

const store = createStore(reducer);

store.getState();
store.dispatch(select(0));
store.dispatch(moveDown());
store.dispatch(moveDown());

const updatedState = store.getState();
console.log('Should be true', initialState.itemList[0] === updatedState.itemList[2]);

module.exports = {
  store,
  actions,
};
