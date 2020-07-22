const { createStore } = require('./redux.min');

let initialtState = {
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
    'Jam'
    ],
  selectedIndex: 0,
}

const actions = {
  MOVE_UP: "MOVE_UP",
  MOVE_DOWN: "MOVE_DOWN",
  SELECT: "SELECT",
}

const reducer = (state = initialtState, action) => {

  switch (action.type) {

    case actions.MOVE_UP: {
      const changedItems = [...state.items];
      const { selectedIndex } = state;
      [
        changedItems[selectedIndex], 
        changedItems[selectedIndex - 1]
      ] = [
        changedItems[selectedIndex - 1],
        changedItems[selectedIndex]
      ];

      return {
        ...state,
        items: changedItems, 
        selectedIndex: selectedIndex - 1
      }
    }
      
    case actions.MOVE_DOWN:
      const changedItems = [...state.items];
      const { selectedIndex } = state;
      [
        changedItems[selectedIndex],
         changedItems[selectedIndex + 1]
      ] = [
          changedItems[selectedIndex + 1],
          changedItems[selectedIndex]
      ];

      return {
        ...state, 
        items: changedItems,
        selectedIndex: selectedIndex + 1
        };
        
    case actions.SELECT:

      return {
        ...state,
        selectedIndex: action.currentIndex,
      }

    default:
      return state
  }
}

const moveUp = () => ({type: actions.MOVE_UP});
const moveDown = () => ({type:  actions.MOVE_DOWN});
const selecItem = (index) => ({type: actions.SELECT, currentIndex: index});

const store = createStore(reducer);
const initialState = store.getState();

console.log(initialState.items);
store.dispatch(selecItem(0));
store.dispatch(moveDown());
store.dispatch(moveUp());
store.dispatch(moveDown());

const updatedState = store.getState();
console.log(updatedState.items)
console.log('Should be true', initialState.items[0] === updatedState.items[1]);