'use strict';
const store = Redux.createStore(getNextState);

const buttonUp = document.querySelector('.up');
const buttonDown =document.querySelector('.down');

buttonUp.addEventListener('click', () => {
  store.dispatch(getMoveUpAction())
});

buttonDown.addEventListener('click', () => {
  store.dispatch(getMoveDownAction())
});

function render() {
  buttonUp.disabled = store.getState().selectedIndex === 0 || store.getState().selectedIndex === null;
  buttonDown.disabled = store.getState().selectedIndex === store.getState().foodItems.length - 1 ||
    store.getState().selectedIndex === null;

  const foodList = document.querySelector('#food-list');
  foodList.innerHTML = '';
  const item = store.getState().foodItems;
  item.map((i, index) => {
    const li = document.createElement('li');
    li.innerHTML = i.item;
    li.addEventListener('click', () => {
      const indexSelected = store.getState().selectedIndex === index;
      store.dispatch(indexSelected ? getCancelSelectAction() : getSelectAction(index));
    });
    foodList.append(li)
  })
}

render();
store.subscribe(() => render());
