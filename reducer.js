const initialState = {
  foodList: [...food],
  selectedIndex: null
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
