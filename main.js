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
    'Jam'
  ],
  selectedItem: -1
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLICK':
      return {...state, selectedItem: action.index};
    case 'UNSELECT':
      return {...state, selectedItem: -1};
    case 'UP':
      const newList = [...state.items];
      newList[state.selectedItem] = newList[state.selectedItem - 1];
      newList[state.selectedItem - 1] = state.items[state.selectedItem];
      return {
        items: newList,
        selectedItem: state.selectedItem - 1
      };
    case 'DOWN':
      const newList1 = [...state.items];
      newList1[state.selectedItem] = newList1[state.selectedItem + 1];
      newList1[state.selectedItem + 1] = state.items[state.selectedItem];
      return {
        items: newList1,
        selectedItem: state.selectedItem + 1
      };
    default:
      return state;
  }
};

const store = Redux.createStore(reducer, initialState);

function render(state, dispatch) {
  const ul = document.createElement('ul');
  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  button1.innerText = 'up';
  button2.innerText = 'down';
  button1.className = 'button';
  button2.className = 'button';
  if (state.selectedItem > 0) {
    button1.addEventListener('click', () => {
      dispatch({
        type: 'UP'
      })
    });
  }
  if (state.selectedItem < (state.items.length - 1) && state.selectedItem !== -1) {
    button2.addEventListener('click', () => {
      dispatch({
        type: 'DOWN'
      })
    });
  }
  for (let i = 0; i < state.items.length; i++) {
    const li = document.createElement('li');
    li.innerText = state.items[i];
    li.className = 'item-list';
    li.style.width = 'max-content';
    if (i === state.selectedItem) {
      li.style.color='red';
    }

    li.addEventListener('click', () => dispatch({
      type: 'CLICK',
      index: i
      })
    );
    ul.append(li);
  }
  document.body.innerHTML = '';
  document.body.append(ul);
  document.body.append(button1);
  document.body.append(button2);
}

document.addEventListener('click', (event) => {
  if (event.target.closest('.item-list') || event.target.closest('.button')) {
    return;
  }
  store.dispatch({
    type: 'UNSELECT'
  })
});

render(store.getState(), store.dispatch);
store.subscribe(() => render(store.getState(), store.dispatch));
