const Redux = require('./redux.min');

const food = [
  {
    id: 1,
    name: 'Apple',
  },
  {
    id: 2,
    name: 'Bread',
  },
  {
    id: 3,
    name: 'Carrot',
  },
  {
    id: 4,
    name: 'Dumplings',
  },
  {
    id: 5,
    name: 'Eggs',
  },
  {
    id: 6,
    name: 'Fish',
  },
  {
    id: 7,
    name : 'Garlic',
  },
  {
    id: 8,
    name: 'Honey',
  },
  {
    id: 9,
    name: 'Ice cream',
  },
  {
    id: 10,
    name: 'Jam',
  },
];

const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const SELECT = 'SELECT';

const initialState = {
  items: food,
  selectedId: 3,
}

const moveUp = () => {
  return {
    type: MOVE_UP,
  }
}

const moveDown = () => {
  return {
    type: MOVE_DOWN,
  }
}

const select = (itemId) => {
  return {
    type: SELECT,
    id: itemId,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_UP: {
      const itemsCopy = [...state.items];
      const itemToSwap = itemsCopy.find(item => item.id === state.selectedId);
      const itemIndex = itemsCopy.findIndex(item => item.id === state.selectedId);
      itemsCopy[itemIndex] = itemsCopy[itemIndex - 1];
      itemsCopy[itemIndex - 1] = itemToSwap;

      return {
        ...state,
        items: itemsCopy,
      }
    };
    case MOVE_DOWN: {
      const itemsCopy = [...state.items];
      const itemToSwap = itemsCopy.find(item => item.id === state.selectedId);
      const itemIndex = itemsCopy.findIndex(item => item.id === state.selectedId);
      itemsCopy[itemIndex] = itemsCopy[itemIndex + 1];
      itemsCopy[itemIndex + 1] = itemToSwap;

      return {
        ...state,
        items: itemsCopy,
      }
    };
    case SELECT:
      return {
        ...state,
        selectedId: action.id,
      };
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);
