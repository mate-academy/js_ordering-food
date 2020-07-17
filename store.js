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
  selectedIndex: 0,
}

const actions = {
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  SELECT : 'SELECT',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT':
      return {
        ...state,
        selectedIndex: action.index,
      };
    case 'MOVE_UP':
        const moveUpList = [...state.items]
        const moveUpItem = moveUpList[state.selectedIndex]
        moveUpList[state.selectedIndex] = moveUpList[state.selectedIndex + 1]
        moveUpList[state.selectedIndex + 1] = moveUpItem
      return {
        ...state,
        items: [...moveUpList]
      };
    case 'MOVE_DOWN':
      const moveDownList = [...state.items]
        const moveDownItem = moveDownList[state.selectedIndex]
        moveDownList[state.selectedIndex] = moveDownList[state.selectedIndex - 1]
        moveDownList[state.selectedIndex - 1] = moveDownItem
      return {
        ...state,
        items: [...moveDownItem]
      };
    default:
      return state;
  }
}



const store = createStore(reducer);
store.dispatch({ type: actions.SELECT, index: 0});
store.dispatch({ type: actions.MOVE_UP })

const update = store.getState();

console.log(update)

module.exports = {
  store,
  actions,
//   actionCreators,
};