const { createStore } = require('./redux.min');

const actions = {
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  SELECT: 'SELECT',
}

const moveUp = () => ({
  type: actions.MOVE_UP
});

const moveDown = () => ({
  type: actions.MOVE_DOWN
});

const select = (index) => ({
  type: actions.SELECT,
  index: index,
});

const goods = ['Apple', 'Bread', 'Cgoodsot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam']

const itnitialState = {
  items: goods,
  selectedItem: null,
}

const reducer = (state = itnitialState, action) => {
  switch(action.type) {
    case 'SELECT': {
      return {
        ...state,
        selectedItem: action.index,
      }
    }
    case 'MOVE_UP': {
      let newIndex = state.selectedItem;
      const goods = [...state.items]
      if (state.selectedItem > 0) {
        [goods[state.selectedItem], goods[state.selectedItem - 1]]
        = [goods[state.selectedItem - 1], goods[state.selectedItem]]
        newIndex--
      }
      return {
        ...state,
        items: goods,
        selectedItem: newIndex,
      }
    }
    case 'MOVE_DOWN':
      let newIndex = state.selectedItem
      const goods = [...state.items]
      if (state.selectedItem < goods.length - 1) {
        [goods[state.selectedItem], goods[state.selectedItem + 1]]
        = [goods[state.selectedItem + 1], goods[state.selectedItem]]
        newIndex++
      }
      return {
        ...state,
        items: goods,
        selectedItem: newIndex,
      }
    default:
      return state;
  }
}

const store = createStore(reducer)

const initialState = store.getState();
store.dispatch(select(0));
store.dispatch(moveUp());
store.dispatch(moveDown());
const updatedState = store.getState();
console.log(updatedState)

console.log('Should be true', initialState.items[0] === updatedState.items[1]);
