const { createStore } = require('./redux.min.js');
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const SELECT = 'SELECT';

const action = {
  MOVE_UP,
  MOVE_DOWN,
  SELECT
}

const defaultState = {
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
  'Jam'],
  index: null,
}

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

module.exports = {
  store,
  action,
};