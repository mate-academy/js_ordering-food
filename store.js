const { createStore } = require('./redux.min.js');
const { initialState, actionCreators } = require('./actions');

const movementReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'MOVE_UP': {
      let { items, selectedIndex } = state;
      if (selectedIndex === 0) {
        return state;
      }

      let copyItems = [...items];
      [copyItems[selectedIndex], copyItems[selectedIndex - 1]] = [copyItems[selectedIndex - 1], copyItems[selectedIndex]];
      selectedIndex--;

      return {
        ...state,
        items: copyItems,
        selectedIndex,
      }
    }
      
    case 'MOVE_DOWN': {
      let { items, selectedIndex } = state;
      if(selectedIndex + 1 === items.length) {
        return state;
      }

      let copyItems = [...items];
      [copyItems[selectedIndex], copyItems[selectedIndex + 1]] = [copyItems[selectedIndex + 1], copyItems[selectedIndex]];
      selectedIndex++;

      return {
        ...state,
        items: copyItems,
        selectedIndex,
      }
    }
  
    case 'SELECT': 
      return {
        ...state,
        selectedIndex: action.selectedIndex
      }
    
    default: 
      return state;
  }
}
const store = createStore(movementReducer);
const defaultState = store.getState();
store.dispatch(actionCreators.select(0));
store.dispatch(actionCreators.movedown());
store.dispatch(actionCreators.movedown());
const updatedState = store.getState();
console.log(updatedState, defaultState);


console.log('Should be true', defaultState.items[0] === updatedState.items[2]);
