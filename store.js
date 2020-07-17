const { createStore } = require('./redux.min.js');
const { defaultState, actions } = require('./actions');

const movementReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'MOVE_UP': {
      let { items, index } = state;
      if (index === 0) {
        return state;
      }

      let copyItems = [...items];
      [copyItems[index], copyItems[index - 1]] = [copyItems[index - 1], copyItems[index]];
      index--;

      return {
        ...state,
        items: copyItems,
        index,
      }
    }
      
    case 'MOVE_DOWN': {
      let { items, index } = state;
      if(index + 1 === items.length) {
        return state;
      }

      let copyItems = [...items];
      [copyItems[index], copyItems[index + 1]] = [copyItems[index + 1], copyItems[index]];
      index++;

      return {
        ...state,
        items: copyItems,
        index,
      }
    }
  
    case 'SELECT': 
      return {
        ...state,
        index: action.index
      }
    
    default: 
      return state;
  }
}
const store = createStore(movementReducer);
const initialState = store.getState();
store.dispatch(actions.SELECT(0));
store.dispatch(actions.MOVE_DOWN());
store.dispatch(actions.MOVE_DOWN());


const updatedState = store.getState();

console.log('Should be true', initialState.items[0] === updatedState.items[2]);