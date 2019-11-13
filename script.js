const MOVE_UP = 'moveUp';
const MOVE_DOWN = 'moweDown';
const SELECTED_INDEX = 'selectedIndex';
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');

document.querySelector('body').addEventListener('click', (event) => {
  if (event.target.tagName !== 'LI' && event.target.tagName !== 'BUTTON') {
    store.dispatch(selectIndex(-1));
  }
});

function moveUp() {
  return {
    type: MOVE_UP,
  };
};

function moveDown() {
  return {
    type: MOVE_DOWN,
  };
};

function selectIndex(index) {
  return {
    type: SELECTED_INDEX,
    index,
  };
};

const initialState = {
  foodList: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice Cream', 'Jam'],
  index: -1,
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case MOVE_UP:
      const newUpFoodList = [...state.foodList];
      const indexUpSelect = state.index;
      const movedUpItem = newUpFoodList.splice(indexUpSelect, 1);
      newUpFoodList.splice(indexUpSelect - 1, 0, ...movedUpItem);
      return {
        foodList: newUpFoodList,
        index: indexUpSelect - 1,
      }
    case MOVE_DOWN:
      const newDownFoodList = [...state.foodList];
      const indexDownSelect = state.index;
      const movedDownItem = newDownFoodList.splice(indexDownSelect, 1);
      newDownFoodList.splice(indexDownSelect + 1, 0, ...movedDownItem);
      return {
        foodList: newDownFoodList,
        index: indexDownSelect + 1,
      }
    case SELECTED_INDEX:
      return {
        ...state,
        index: action.index,
      }
    default:
      return state;
  };
};

let store = Redux.createStore(reducer);

btnUp.addEventListener('click', () => {
  store.dispatch(moveUp());
});

btnDown.addEventListener('click', () => {
  store.dispatch(moveDown());
});

function render() {
  const orderList = document.getElementById('orderingList');
  orderList.innerHTML = ``;

  const foodArr = store.getState().foodList;
  const index = store.getState().index;

  btnUp.disabled = index < 1;
  btnDown.disabled = index >= foodArr.length - 1;

  for (let i = 0; i < foodArr.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = foodArr[i];
    if (i === index) {
      li.className = 'list-group-item bg-primary text-white';
    } else {
      li.className = 'list-group-item';
    }
    li.addEventListener('click', () => {
      store.dispatch(selectIndex(i));
    });
    orderList.append(li);
  };
};

store.subscribe(() => {
  render();
})

render();