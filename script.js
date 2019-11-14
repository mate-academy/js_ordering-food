const initialState = {
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
    'Jam',
  ],
  selectedItem: -1,
}

const root = document.getElementById('root')

function reducer(state, action) {

  const newItems = [...state.items];
  switch (action.type) {
    case 'SELECT': 
      return { ...state, selectedItem: action.index };
    case 'UNSELECT':
      return { ...state, selectedItem: - 1 };
    case 'MOVEUP':
      
      [newItems[state.selectedItem], newItems[state.selectedItem - 1]] = 
      [newItems[state.selectedItem - 1], newItems[state.selectedItem]]
      return { selectedItem: state.selectedItem - 1, items: newItems };
    case 'MOVEDOWN':
      [newItems[state.selectedItem], newItems[state.selectedItem + 1]] =
      [newItems[state.selectedItem + 1], newItems[state.selectedItem]]
      return { selectedItem: state.selectedItem + 1, items: newItems };
    default:
      return state;
  }
}

function render(state, dispatch) {
  const ul = document.createElement('ul');
  for (let i = 0; i < state.items.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = state.items[i];
    li.className = "items";
    li.classList.add('item-list');  
    if (i === state.selectedItem) {
      li.style.backgroundColor = '#aaaaaa';
    }
    li.addEventListener('click', () => dispatch({
      type: 'SELECT',
      index: i,
    }))

    ul.append(li);
  } 
  root.innerHTML = '';
  root.append(ul)

  const moveUp = document.createElement('button');
  moveUp.className = "moveUp";
  moveUp.innerHTML = 'Move Up';
  if (state.selectedItem > 0) { 
    moveUp.addEventListener('click', () => store.dispatch({
      type: 'MOVEUP',
    }))
  } else {
    moveUp.disabled = true;
  }
  root.append(moveUp)
  const moveDown = document.createElement('button');
  moveDown.className = "moveDown";
  moveDown.innerHTML = 'Move Down';
  if (state.selectedItem < state.items.length - 1 && state.selectedItem !== -1) {
    moveDown.addEventListener('click', () => store.dispatch({
      type: 'MOVEDOWN',
    }))
  } else {
    moveDown.disabled = true;
  }
  root.append(moveDown);
}

document.addEventListener('click', (event) => {
  if (event.target.closest('.item-list')) {
    return;
  } else if (event.target.closest('.moveUp')) {
    return;
  } else if (event.target.closest('.moveDown')) {
    return;
  }
  store.dispatch(store.dispatch({
    type: 'UNSELECT',
    index: -1,
  }))
})

const store = Redux.createStore(reducer, initialState);
render(store.getState(), store.dispatch)
store.subscribe(() => render(store.getState(), store.dispatch));