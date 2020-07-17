const { createStore } = require('./redux.min');

const actions = {
  MOVE_UP: 'moveUp',
  MOVE_DOWN: 'moveDown',
  SELECT: 'selectItem',
}

const moveUp = () => {
  return {
    type: actions.MOVE_UP,
  }
}

const moveDown = () => {
  return {
    type: actions.MOVE_DOWN,
  }
}

const select = (index) => {
  return {
    type: actions.SELECT,
    index: index,
  }
}

const goods = ['Apple', 'Bread', 'Cgoodsot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam']

const itnitialState = {
  items: goods,
  selectedItem: null,
}

const reducer = (state = itnitialState, action) => {
  switch(action.type) {
    case 'selectItem': {
      return {
        ...state,
        selectedItem: action.index,
      }
    }
    case 'moveUp': {
      const goods = [...state.items]
      const selected = goods[state.selectedItem]
      const movedItem = goods[state.selectedItem - 1]
      goods[state.selectedItem - 1] = selected;
      goods[state.selectedItem] = movedItem;
      return {
        ...state,
        items: goods,
        selectedItem: state.selectedItem - 1,
      }
    }
    case 'moveDown':
      const goods = [...state.items]
      const selected = goods[state.selectedItem]
      const movedItem = goods[state.selectedItem + 1]
      goods[state.selectedItem + 1] = selected;
      goods[state.selectedItem] = movedItem;
      return {
        ...state,
        items: goods,
        selectedItem: state.selectedItem + 1,
      }
    default:
      return state;
  }
}

const store = createStore(reducer)

const initialState = store.getState();
store.dispatch(select(0));
store.dispatch(moveDown());
store.dispatch(moveDown());
const updatedState = store.getState();

console.log('Should be true', initialState.items[0] === updatedState.items[2]);
