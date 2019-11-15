const initialState = { 
  items: [
    { name: "Apple", },
    { name: "Bread", },
    { name: "Carrot", },
    { name: "Dumplings", },
    { name: "Eggs", },
    { name: "Fish", },
    { name: "Garlic", },
    { name: "Honey", },
    { name: "Ice cream", },
    { name: "Jam", }
  ],
  id: 1,
}

for (const item of initialState.items) {
  item.id = initialState.id++;
  item.isItemSelected = false;
}

function reducer(state, action) {
  let updatedItems = [ ...state.items ];
  const currentActiveIndex = state.items.findIndex(item => (
    item.isItemSelected === true
  ));

  switch (action.type) {
    case 'CLICK':
      updatedItems.forEach(item => {
        if (item.isItemSelected) {
          item.isItemSelected = false;
        }
        if (item.id === action.id) {
          item.isItemSelected = true;
          return;
        }
      });
      return { ...state, items: [ ...updatedItems ] };
    case 'UNSELECT':
      updatedItems.forEach(item => {
        if (item.isItemSelected) {
          item.isItemSelected = false;
        }
      })
      return { ...state, selectedItemId: 0 };
    case 'MOVE_UP': 
      updatedItems = [
        ...state.items.slice(0, currentActiveIndex - 1),
        state.items[currentActiveIndex],
        state.items[currentActiveIndex - 1],
        ...state.items.slice(currentActiveIndex + 1)
      ];
      return { ...state, items: [ ...updatedItems ] };
    case 'MOVE_DOWN':
      updatedItems = [
        ...state.items.slice(0, currentActiveIndex),
        state.items[currentActiveIndex + 1],
        state.items[currentActiveIndex],
        ...state.items.slice(currentActiveIndex + 2)
      ]
      return { ...state, items: [ ...updatedItems ] };
    default:
      return state;
  }
}

function createBtn(btnType, dispatch) {
  const button = document.createElement('button');
  button.innerText = btnType;
  button.addEventListener('click', () => dispatch({
    type: btnType === 'Move Up' ? 'MOVE_UP' : 'MOVE_DOWN',
  }));
  
  return button;
}

function render(state, dispatch) {
  const moveUpBtn = createBtn('Move Up', dispatch);
  const moveDownBtn = createBtn('Move Down', dispatch);
  if (state.items.every(item => !item.isItemSelected)) {
    moveUpBtn.disabled = true;
    moveDownBtn.disabled = true;
  }
  const ul = document.createElement('ul');
  for (let i = 0; i < state.items.length; i++) {
    const li = document.createElement('li');
    li.innerText = state.items[i].name;
    li.classList.add('list-item');
    li.style.width = 'max-content';
    if (state.items[i].isItemSelected) {
      if (i === 0) {
        moveUpBtn.disabled = true;
      } else if (i === state.items.length - 1) {
        moveDownBtn.disabled = true;
      }
      li.style.color = 'gray';
    }
    li.addEventListener('click', () => dispatch({
      type: 'CLICK',
      id: state.items[i].id,
    }));
    ul.append(li);
  }
  document.body.innerHTML = '';
  document.body.append(moveUpBtn);
  document.body.append(moveDownBtn);
  document.body.append(ul);
  
}

document.addEventListener('click', () => {
  if (event.target.closest('.list-item') || event.target.closest('button')) {
    return;
  }
  store.dispatch(store.dispatch({
    type: 'UNSELECT',
  }));
});

const store = Redux.createStore(reducer, initialState);
render(store.getState(), store.dispatch);
store.subscribe(() => render(store.getState(), store.dispatch));
