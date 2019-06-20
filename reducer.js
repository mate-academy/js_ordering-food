const food = [
  { name: 'Apple' },
  { name: 'Bread' },
  { name: 'Carrot' },
  { name: 'Dumplings' },
  { name: 'Eggs' },
  { name: 'Fish' },
  { name: 'Garlic' },
  { name: 'Honey' },
  { name: 'Ice cream' },
  { name: 'Jam' }
];

const initialState = {
  foodList: [...food],
  selectedIndex: null
};

const SELECT_ITEM = 'SELECT_ITEM';
const CLEAR_SELECTION = 'CLEAR_SELECTION';
const MOVE_SELECTION_UP = 'MOVE_SELECTION_UP';
const MOVE_SELECTION_DOWN = 'MOVE_SELECTION_DOWN';

const selectItem = (index) => {
  return {
    type: SELECT_ITEM,
    payload: index,
  }
};

const clearSelection = () => {
  return {
    type: CLEAR_SELECTION,
  }
};

const moveSelectionUp = () => {
  return {
    type: MOVE_SELECTION_UP,
  }
};

const moveSelectionDown = () => {
  return {
    type: MOVE_SELECTION_DOWN,
  }
};

const actionHandler = {
  [SELECT_ITEM]: (state, { payload: selectedIndex }) => {
    return {
      ...state,
      selectedIndex
    }
  },

  [CLEAR_SELECTION]: (state) => {
    return {
      ...state,
      selectedIndex: null
    }
  },

  [MOVE_SELECTION_UP]: (state) => {
    const { foodList, selectedIndex } = state;
    if (selectedIndex === 0) {
      return state;
    }
    const newFoodCour = [...foodList];
    const selectedFoodCore = newFoodCour.splice(selectedIndex, 1);
    newFoodCour.splice(selectedIndex - 1, 0, selectedFoodCore[0]);
    return {
      foodList: newFoodCour,
      selectedIndex: selectedIndex - 1
    };
  },

  [MOVE_SELECTION_DOWN]: (state) => {
    const { foodList, selectedIndex } = state;
    if (selectedIndex === foodList.length - 1) {
      return state;
    }
    const newFoodCour = [...foodList];
    const selectedFoodCore = newFoodCour.splice(selectedIndex, 1);
    newFoodCour.splice(selectedIndex + 1, 0, selectedFoodCore[0]);
    return {
      foodList: newFoodCour,
      selectedIndex: selectedIndex + 1
    };
  }
};

const reducer = (state = initialState, action) => {
  const handler = actionHandler[action.type];
  return handler ? handler(state, action) : state;
};
const store = Redux.createStore(reducer);

const upButton = document.getElementById('up');
const downButton = document.getElementById('down');

upButton.addEventListener('click', (event) => {
  store.dispatch(moveSelectionUp());
  event.stopPropagation();

});

downButton.addEventListener('click', (event) => {
  store.dispatch(moveSelectionDown());
  event.stopPropagation();

});

function render() {
  const selectedIndex = store.getState().selectedIndex;
  const item = store.getState().foodList;
  upButton.disabled = selectedIndex === 0 || selectedIndex === null;
  downButton.disabled = selectedIndex === item.length - 1 || selectedIndex === null;
  const listItem = document.getElementById('list');
  listItem.innerHTML = '';
  for (let i = 0; i < item.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = item[i].name;
    li.addEventListener('click', (event) => {
      const selected = store.getState().selectedIndex === i;
      event.stopPropagation();
      store.dispatch(selected ? clearSelection() : selectItem(i));
    });
    listItem.append(li);
  }
}

document.addEventListener('click', () => {
  store.dispatch(clearSelection());
})

store.subscribe(() => render());
render();
console.log(store)
