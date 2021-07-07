'use strict';
const store = Redux.createStore(getNextState);

const buttonUp = document.querySelector('.up');
const buttonDown =document.querySelector('.down');
const foodList = document.querySelector('#food-list');

buttonUp.addEventListener('click', () => {
  store.dispatch(getMoveUpAction())
});

buttonDown.addEventListener('click', () => {
  store.dispatch(getMoveDownAction())
});

function render() {
  const state = store.getState();
  buttonUp.disabled = state.selectedIndex === 0 || state.selectedIndex === null;
  buttonDown.disabled = state.selectedIndex === state.foodItems.length - 1 ||
    state.selectedIndex === null;

  foodList.textContent = '';
  const items = state.foodItems;
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.item;
    li.className = state.selectedIndex === index ? 'selected' : '';
    li.addEventListener('click', () => {
      const indexSelected = store.getState().selectedIndex === index;
      store.dispatch(indexSelected ? getCancelSelectAction() : getSelectAction(index));
    });
    foodList.append(li)
  })
}

render();
store.subscribe(render);
