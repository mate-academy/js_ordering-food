const { createStore } = require('./redux.min');

const initialState = {
  itemList: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  selectedItem: null,
}

const actions = {
  moveUp: 'moveUp',
  moveDown: 'moveDown',
  select: 'select',
}

const moveUp = (index) => {
  return {
    type: actions.moveUp,
    index
  };
}

const moveDown = (index) => {
  return {
    type: actions.moveDown,
    index
  };
}

const select = (index) => {
  return {
    type: actions.select,
    index
  };
}

const reducer = (state = initialState, action) => {
  const { itemList, selectedItem } = state;
  const copyItemList = [...itemList]
  switch (action.type) {
    case 'select':
      return {
        ...state,
        selectedItem: action.index
      };

    case 'moveUp': {
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
    
    case 'moveDown': {
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
