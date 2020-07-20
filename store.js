const { createStore } = require('./redux.min');

const selectedItem = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  selected: null,
} ;

const actions = {
  SELECT: 'SELECT',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
}

const moveUp = () => ({ type: actions.MOVE_UP });

const moveDown = () => ({ type: actions.MOVE_DOWN });

const select = (value) => {
  return {
    type: actions.SELECT,
    value
  }
}

function moveItemUp(items, index) {
  const movedUpItems = [...items];
  lastItem = movedUpItems.length - 1;

  if (index === 0) {
    return [...movedUpItems.slice(1), lastItem];
  } else {
    [movedUpItems[index], movedUpItems[index - 1]] = [movedUpItems[index - 1], movedUpItems[index]];
    return movedUpItems;
  }
}

function moveItemDown(items, index) {
  const movedDownItems = [...items];
  lastItem = movedDownItems.length - 1;
  
  if (index === lastItem) {
    return [movedDownItems[lastItem], ...movedDownItems.slice(0, lastItem - 1)]
  }
  [movedDownItems[index], movedDownItems[index + 1]] = [movedDownItems[index + 1], movedDownItems[index]];
  return movedDownItems;
}


const reducer = (state = selectedItem, action) => {
  switch(action.type) {
    case actions.SELECT:
      return {
        ...state,
        selected: action.value,
      };
    case actions.MOVE_UP:
      const movedItemsUp = moveItemUp(state.items, state.selected);
      return {
        ...state,
        items: movedItemsUp,
        selected: state.selected - 1,
        };
    case actions.MOVE_DOWN:
      const movedItemsDown = moveItemDown(state.items, state.selected);
      return {
        ...state,
        items: movedItemsDown,
        selected: state.selected + 1,
      };
    default: 
      return state;
  }
}

let store = createStore(reducer)

store.dispatch(select(9))
store.dispatch(moveUp())
store.dispatch(moveUp())
store.dispatch(moveDown())

let i = store.getState()



console.log(i.items)


module.exports = {
  store,
};