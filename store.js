const Redux = require('./redux.min');


// Data
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


// Actions
const actions = {
  MOVE_UP: "MOVE_UP",
  MOVE_DOWN: "MOVE_DOWN",
  SELECT: "SELECT",
}

const initialState = {
  items: food,
  selectedId: null,
}

const moveUp = () => ({
    type: actions.MOVE_UP,
  }
);

const moveDown = () => ({
    type: actions.MOVE_DOWN,
  }
);

const select = (itemId) => ({
    type: actions.SELECT,
    id: itemId,
  }
);


// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.MOVE_UP: {
      const itemsCopy = [...state.items];
      const itemToSwap = itemsCopy.find(item => item.id === state.selectedId);
      const itemIndex = itemsCopy.findIndex(item => item.id === state.selectedId);

      if (itemIndex === 0) {
        throw new Error('The item is already the first one on the list');
      } else {
        itemsCopy[itemIndex] = itemsCopy[itemIndex - 1];
        itemsCopy[itemIndex - 1] = itemToSwap;

        return {
          ...state,
          items: itemsCopy,
        }
      }
    };
    case actions.MOVE_DOWN: {
      const itemsCopy = [...state.items];
      const itemToSwap = itemsCopy.find(item => item.id === state.selectedId);
      const itemIndex = itemsCopy.findIndex(item => item.id === state.selectedId);

      if (itemIndex === itemsCopy.length - 1) {
        throw new Error("The item is already the last one on the list");
      } else {
        itemsCopy[itemIndex] = itemsCopy[itemIndex + 1];
        itemsCopy[itemIndex + 1] = itemToSwap;

        return {
          ...state,
          items: itemsCopy,
        }
      }
    };
    case actions.SELECT:
      return {
        ...state,
        selectedId: action.id,
      };
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);

// Tests
store.dispatch(select(1));
store.dispatch(moveDown());
store.dispatch(moveDown());
store.dispatch(select(6));
store.dispatch(moveUp());
store.dispatch(moveUp());
console.log(
  'Moved the first item to the third place:', initialState.items[0] == store.getState().items[2],
  'Moved the sixth item to the fourth place:', initialState.items[5] == store.getState().items[3]
);
