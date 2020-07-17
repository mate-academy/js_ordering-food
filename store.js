const { createStore } = require('./redux.min');

let initialtState = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  selectedIndex: 0,
}


const reducer = (state = initialtState, action) => {

  switch (action.type) {

    case "MOVE_UP":
      const changedItems1 = [...state.items];
      const index1 = state.selectedIndex;
      [changedItems1[index1], changedItems1[index1 - 1]] = [changedItems1[index1 - 1], changedItems1[index1]];

      return {...state, items: changedItems1, selectedIndex: index1 - 1};
      
    case "MOVE_DOWN":
      const changedItems = [...state.items];
      const index = state.selectedIndex;
      [changedItems[index], changedItems[index + 1]] = [changedItems[index + 1], changedItems[index]];

      return {
        ...state, 
        items: changedItems,
        selectedIndex: index + 1
        };
        
    case "SELECT":

      return {
        ...state,
        selectedIndex: action.currentIndex,
      }

    default:
      return state
  }
}

const moveUp = () => {
  return {
    type: "MOVE_UP"
  }
}

const moveDown = () => {
  return {
    type: "MOVE_DOWN"
  }
}

const selecItem = (index) => {
  return {
    type: "SELECT",
    currentIndex: index,
  }
}

const store = createStore(reducer);


const actions = {
  MOVE_UP: "MOVE_UP",
  MOVE_DOWN: "MOVE_DOWN",
  SELECT: "SELECT",
}


const initialState = store.getState();
console.log(initialState.items);
store.dispatch(selecItem(0));
store.dispatch(moveDown());
store.dispatch(moveDown());

const updatedState = store.getState();
console.log(updatedState.items)
console.log('Should be true', initialState.items[0] === updatedState.items[2]);