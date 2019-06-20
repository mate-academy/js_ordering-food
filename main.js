// import * as Redux from './redux.min';

const foodList = [
  {item: 'Apple'},
  {item: 'Bread'},
  {item: 'Carrot'},
  {item: 'Dumplings'},
  {item: 'Eggs'},
  {item: 'Fish'},
  {item: 'Garlic'},
  {item: 'Honey'},
  {item: 'Ice cream'},
  {item: 'Jam'},
];

const SELECT_ITEM = 'SELECT_ITEM';
const MOVE_DOWN = 'MOVE_DOWN';
const MOVE_UP = 'MOVE_UP';
const CLEAR_SELECT = 'CLEAR_SELECT';

function actionUp() {
  return {
    type: MOVE_UP,
  }
}

function actionDown() {
  return {
    type: MOVE_DOWN,
  }
}

function selectItem(index) {
  return {
    type: SELECT_ITEM,
    index
  }
}

function clearSelection() {
  return {
    type: CLEAR_SELECT,
  }
}

const initialState = {
  list: [...foodList],
  selected: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_ITEM:
      return {
        ...state,
        selected: action.index
      };
    case CLEAR_SELECT:
      return {
        ...state,
        selected: null
      };
    case MOVE_UP:
      return moveUp(state);
    case MOVE_DOWN:
      return moveDown(state);
    default:
      return state;

  }
}

function moveDown(state) {
  const {list, selected} = state;
  const newFoodList = [...list];
  if (selected === newFoodList.length - 1) {
    return state;
  } else {
    const item = newFoodList.splice(selected, 1);
    newFoodList.splice(selected + 1, 0, item[0])
    return {
      list: newFoodList,
      selected: selected + 1,
    }
  }
}

function moveUp(state) {
  const {list, selected} = state;
  const newFoodList = [...state.list];
  if (selected === 0) {
    return state;
  }
  const item = newFoodList.splice(selected, 1);
  newFoodList.splice(selected - 1, 0, item[0]);
  return {
    list: newFoodList,
    selected: selected - 1,
  }
}

const {createStore, compose} = Redux;
const store = Redux.createStore(reducer);

const buttonUp = document.querySelector('.moveUp');
const buttonDown =document.querySelector('.moveDown');

buttonUp.addEventListener('click', () => {
  store.dispatch(actionUp())
});

buttonDown.addEventListener('click', () => {
  store.dispatch(actionDown())
});

function render() {
  buttonUp.disabled = store.getState().selected === 0 || store.getState().selected === null;
  buttonDown.disabled = store.getState().selected === store.getState().list.length - 1 ||
    store.getState().selected === null;

  const domList = document.querySelector('.list');
  domList.innerHTML = '';
  const item = store.getState().list;
  item.map((i, index) => {
    const li = document.createElement('li');
    li.innerHTML = i.item;
    li.addEventListener('click', () => {
      const indexSelected = store.getState().selected === index;
      store.dispatch(indexSelected ? clearSelection() : selectItem(index));
    });
    domList.append(li)
  })
}

render();
store.subscribe(() => render());
